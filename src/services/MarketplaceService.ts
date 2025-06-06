import { supabase } from '@/integrations/supabase/client';
import type { CoinListing, CartItem, MarketplaceFilters } from '@/types/marketplace';

// Add new types for orders, shipping addresses, and reviews
interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address_id: string;
  created_at: string;
}

interface OrderItem {
  id: string;
  order_id: string;
  coin_id: string;
  quantity: number;
  price: number;
  created_at: string;
}

interface ShippingAddress {
  id: string;
  user_id: string;
  address_data: {
    full_name: string;
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone: string;
  };
  created_at: string;
}

interface Review {
  id: string;
  user_id: string;
  coin_id: string;
  rating: number;
  comment: string;
  created_at: string;
  user?: {
    full_name: string;
    avatar_url: string;
  };
}

export class MarketplaceService {
  // Fetch coin listings with filters and pagination
  static async getCoinListings(
    filters: MarketplaceFilters = {},
    page: number = 1,
    limit: number = 12
  ) {
    try {
      let query = supabase
        .from('coin_listings')
        .select(`
          *,
          seller:profiles!seller_id(
            full_name,
            avatar_url
          )
        `)
        .gt('stock_quantity', 0) // Only show items in stock
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,region.ilike.%${filters.search}%`);
      }
      
      if (filters.region) {
        query = query.eq('region', filters.region);
      }
      
      if (filters.rarity) {
        query = query.eq('rarity', filters.rarity);
      }
      
      if (filters.minValue !== undefined) {
        query = query.gte('value', filters.minValue);
      }
      
      if (filters.maxValue !== undefined) {
        query = query.lte('value', filters.maxValue);
      }
      
      if (filters.verified !== undefined) {
        query = query.eq('verified', filters.verified);
      }

      // Apply pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;
      
      if (error) throw error;

      // Transform data to match our interface
      const coinListings: CoinListing[] = (data || []).map(item => ({
        ...item,
        seller_name: item.seller?.full_name || 'Unknown Seller',
        seller_rating: 4.8, // Default rating - could be calculated from reviews
        seller_avatar: item.seller?.avatar_url,
      }));

      return {
        data: coinListings,
        count: count || 0,
        hasMore: (count || 0) > page * limit
      };
    } catch (error) {
      console.error('Error fetching coin listings:', error);
      throw error;
    }
  }

  // Get single coin listing by ID
  static async getCoinListing(id: string): Promise<CoinListing | null> {
    try {
      const { data, error } = await supabase
        .from('coin_listings')
        .select(`
          *,
          seller:profiles!seller_id(
            full_name,
            avatar_url
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) return null;

      return {
        ...data,
        seller_name: data.seller?.full_name || 'Unknown Seller',
        seller_rating: 4.8,
        seller_avatar: data.seller?.avatar_url,
      };
    } catch (error) {
      console.error('Error fetching coin listing:', error);
      return null;
    }
  }

  // Cart operations
  static async getCartItems(userId: string): Promise<CartItem[]> {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          coin_listing:coin_listings(*)
        `)
        .eq('user_id', userId);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return [];
    }
  }

  static async addToCart(userId: string, coinId: string, quantity: number = 1) {
    try {
      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)
        .eq('coin_id', coinId)
        .single();

      if (existingItem) {
        // Update quantity
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('id', existingItem.id);
        
        if (error) throw error;
      } else {
        // Insert new item
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: userId,
            coin_id: coinId,
            quantity
          });
        
        if (error) throw error;
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  static async updateCartItemQuantity(itemId: string, quantity: number) {
    try {
      if (quantity <= 0) {
        return this.removeFromCart(itemId);
      }

      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  }

  static async removeFromCart(itemId: string) {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  }

  static async clearCart(userId: string) {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }

  // Order APIs
  static async placeOrder(userId: string, shippingAddressId: string): Promise<Order | null> {
    try {
      // Start a transaction
      const { data: cartItems, error: cartError } = await supabase
        .from('cart_items')
        .select(`
          *,
          coin_listing:coin_listings(*)
        `)
        .eq('user_id', userId);

      if (cartError) throw cartError;
      if (!cartItems?.length) throw new Error('Cart is empty');

      // Calculate total amount
      const totalAmount = cartItems.reduce((sum, item) => {
        return sum + (item.coin_listing.price * item.quantity);
      }, 0);

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userId,
          total_amount: totalAmount,
          status: 'pending',
          shipping_address_id: shippingAddressId
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        coin_id: item.coin_id,
        quantity: item.quantity,
        price: item.coin_listing.price
      }));

      const { error: orderItemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (orderItemsError) throw orderItemsError;

      // Clear cart
      await this.clearCart(userId);

      return order;
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  }

  static async getUserOrders(userId: string): Promise<(Order & { items: OrderItem[] })[]> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          items:order_items(
            *,
            coin:coin_listings(*)
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  }

  // Shipping Address APIs
  static async saveShippingAddress(userId: string, addressData: ShippingAddress['address_data']): Promise<ShippingAddress> {
    try {
      const { data, error } = await supabase
        .from('shipping_addresses')
        .insert({
          user_id: userId,
          address_data: addressData
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving shipping address:', error);
      throw error;
    }
  }

  static async getShippingAddresses(userId: string): Promise<ShippingAddress[]> {
    try {
      const { data, error } = await supabase
        .from('shipping_addresses')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching shipping addresses:', error);
      throw error;
    }
  }

  // Review APIs
  static async submitReview(userId: string, coinId: string, rating: number, comment: string): Promise<Review> {
    try {
      // Check if user has purchased the coin
      const { data: hasPurchased, error: purchaseError } = await supabase
        .from('order_items')
        .select('id')
        .eq('coin_id', coinId)
        .eq('order_id', supabase
          .from('orders')
          .select('id')
          .eq('user_id', userId)
          .eq('status', 'delivered')
        )
        .limit(1);

      if (purchaseError) throw purchaseError;
      if (!hasPurchased?.length) {
        throw new Error('You must purchase and receive the coin before reviewing');
      }

      // Check if user has already reviewed
      const { data: existingReview, error: reviewError } = await supabase
        .from('reviews')
        .select('id')
        .eq('user_id', userId)
        .eq('coin_id', coinId)
        .single();

      if (reviewError && reviewError.code !== 'PGRST116') throw reviewError;
      if (existingReview) {
        throw new Error('You have already reviewed this coin');
      }

      // Submit review
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          user_id: userId,
          coin_id: coinId,
          rating,
          comment
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    }
  }

  static async getCoinReviews(coinId: string): Promise<Review[]> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          user:profiles!user_id(
            full_name,
            avatar_url
          )
        `)
        .eq('coin_id', coinId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching coin reviews:', error);
      throw error;
    }
  }
}

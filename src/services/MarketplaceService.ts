import { supabase } from '@/integrations/supabase/client';
import type { CoinListing, CartItem, MarketplaceFilters } from '@/types/marketplace';

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
}

import { supabase } from '@/integrations/supabase/client';
import type { WishlistItem } from '@/types/wishlist';

export class WishlistService {
  static async getWishlistItems(userId: string): Promise<WishlistItem[]> {
    try {
      const { data, error } = await supabase
        .from('wishlist_items')
        .select(`
          *,
          coin_listing:coin_listings(
            id,
            title,
            description,
            value,
            images,
            seller:profiles!seller_id(full_name)
          )
        `)
        .eq('user_id', userId);

      if (error) throw error;

      // Transform the data to match our WishlistItem interface
      return (data || []).map(item => ({
        id: item.coin_listing.id,
        title: item.coin_listing.title,
        description: item.coin_listing.description,
        value: item.coin_listing.value,
        images: item.coin_listing.images,
        seller_name: item.coin_listing.seller?.full_name || 'Unknown Seller'
      }));
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
      return [];
    }
  }

  static async addToWishlist(userId: string, coinId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('wishlist_items')
        .insert({
          user_id: userId,
          coin_id: coinId
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  }

  static async removeFromWishlist(userId: string, coinId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', userId)
        .eq('coin_id', coinId);

      if (error) throw error;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  }

  static async isInWishlist(userId: string, coinId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('wishlist_items')
        .select('id')
        .eq('user_id', userId)
        .eq('coin_id', coinId)
        .single();

      if (error) throw error;
      return !!data;
    } catch (error) {
      console.error('Error checking wishlist status:', error);
      return false;
    }
  }
}

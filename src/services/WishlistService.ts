
import { supabase } from '@/integrations/supabase/client';
import type { WishlistItem } from '@/types/wishlist';

export class WishlistService {
  // Get user's wishlist from Supabase
  static async getUserWishlist(userId: string) {
    try {
      const { data, error } = await supabase
        .from('user_wishlists')
        .select(`
          id,
          coin_listing_id,
          coin_listings (
            id,
            title,
            description,
            value,
            images,
            seller_name
          )
        `)
        .eq('user_id', userId);

      if (error) throw error;

      // Transform data to match WishlistItem interface
      const wishlistItems: WishlistItem[] = data?.map(item => ({
        id: item.coin_listing_id,
        title: item.coin_listings?.title || '',
        description: item.coin_listings?.description || '',
        image: item.coin_listings?.images?.[0] || '',
        value: String(item.coin_listings?.value || 0),
        type: 'coin' as const,
      })) || [];

      return wishlistItems;
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      throw error;
    }
  }

  // Add item to wishlist in Supabase
  static async addToWishlist(userId: string, coinId: number) {
    try {
      const { error } = await supabase
        .from('user_wishlists')
        .insert({
          user_id: userId,
          coin_listing_id: coinId
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  }

  // Remove item from wishlist in Supabase
  static async removeFromWishlist(userId: string, coinId: number) {
    try {
      const { error } = await supabase
        .from('user_wishlists')
        .delete()
        .eq('user_id', userId)
        .eq('coin_listing_id', coinId);

      if (error) throw error;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  }

  // Check if item is in wishlist
  static async isInWishlist(userId: string, coinId: number) {
    try {
      const { data, error } = await supabase
        .from('user_wishlists')
        .select('id')
        .eq('user_id', userId)
        .eq('coin_listing_id', coinId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return !!data;
    } catch (error) {
      console.error('Error checking wishlist:', error);
      return false;
    }
  }
}

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { WishlistItem, WishlistContextType } from '@/types/wishlist';
import { WishlistService } from '@/services/WishlistService';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Safely get user with error handling
  let user = null;
  try {
    const authHook = useSupabaseAuth();
    user = authHook?.user || null;
  } catch (error) {
    console.error('Error getting user in WishlistProvider:', error);
  }

  // Load wishlist from database on initial render
  useEffect(() => {
    if (user) {
      loadWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  const loadWishlist = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const items = await WishlistService.getWishlistItems(user.id);
      setWishlist(items || []);
    } catch (error) {
      console.error('Error loading wishlist:', error);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (item: WishlistItem) => {
    if (!user) {
      console.warn('Cannot add to wishlist: no user');
      return;
    }
    try {
      await WishlistService.addToWishlist(user.id, item.id);
      setWishlist(prev => {
        // Check if item already exists
        if (prev.some(i => i.id === item.id)) return prev;
        return [...prev, item];
      });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  };

  const removeFromWishlist = async (id: string) => {
    if (!user) {
      console.warn('Cannot remove from wishlist: no user');
      return;
    }
    try {
      await WishlistService.removeFromWishlist(user.id, id);
      setWishlist(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  };

  const isInWishlist = (id: string) => {
    return wishlist.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}; 

export interface WishlistItem {
  id: number;
  title: string;
  description: string;
  image: string;
  value: string;
  type: 'coin';
  price?: string; // Optional price field
}

export interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
} 
export interface WishlistItem {
  id: string;
  title: string;
  description: string;
  value: number;
  images: string[];
  seller_name: string;
}

export interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (coinId: string) => boolean;
}

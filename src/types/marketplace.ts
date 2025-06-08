export interface CoinListing {
  id: string;
  title: string;
  description: string;
  mint_date: string;
  region: string;
  value: number;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Extremely Rare';
  verified: boolean;
  images: string[];
  seller_id: string;
  seller_name: string;
  seller_rating: number;
  seller_avatar?: string;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
  metal: string;
  dynasty: string;
  ruler: string;
  condition: string;
  category?: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  coin_id: string;
  quantity: number;
  created_at: string;
  coin_listing?: CoinListing;
}

export interface MarketplaceFilters {
  search?: string;
  region?: string;
  rarity?: string;
  minValue?: number;
  maxValue?: number;
  verified?: boolean;
  sortBy?: string;
  year?: string;
  minYear?: number;
  maxYear?: number;
  metal?: string;
  condition?: string;
  dynasty?: string;
  category?: string;
}

export interface CoinReview {
  id: string;
  coin_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  user?: {
    full_name: string;
    avatar_url?: string;
  };
}

export interface ShippingAddress {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: ShippingAddress;
  created_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  coin_id: string;
  quantity: number;
  price: number;
  coin_listing?: CoinListing;
}

export interface PriceHistory {
  id: string;
  coin_id: string;
  price: number;
  date: string;
  created_at: string;
}

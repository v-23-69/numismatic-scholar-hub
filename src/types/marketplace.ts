
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
}

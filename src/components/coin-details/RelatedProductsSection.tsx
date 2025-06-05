
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coins } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import type { CoinListing } from '@/types/marketplace';

interface RelatedProductsSectionProps {
  coinId: string;
  dynasty?: string;
  ruler?: string;
}

const RelatedProductsSection = ({ coinId, dynasty, ruler }: RelatedProductsSectionProps) => {
  const navigate = useNavigate();
  const [relatedCoins, setRelatedCoins] = useState<CoinListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRelatedProducts();
  }, [coinId, dynasty, ruler]);

  const loadRelatedProducts = async () => {
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
        .neq('id', coinId)
        .gt('stock_quantity', 0)
        .limit(6);

      // Try to find related coins by dynasty first, then ruler
      if (dynasty) {
        query = query.eq('dynasty', dynasty);
      } else if (ruler) {
        query = query.eq('ruler', ruler);
      }

      const { data, error } = await query;

      if (error) throw error;

      const formattedCoins: CoinListing[] = (data || []).map(item => ({
        ...item,
        seller_name: item.seller?.full_name || 'Unknown Seller',
        seller_rating: 4.8,
        seller_avatar: item.seller?.avatar_url,
      }));

      setRelatedCoins(formattedCoins);
    } catch (error) {
      console.error('Error loading related products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCoinClick = (coinId: string) => {
    navigate(`/coins-market/${coinId}`);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Coins className="h-5 w-5" />
            <span>Related Products</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Coins className="h-5 w-5" />
          <span>Related Products</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {relatedCoins.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Coins className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No related products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {relatedCoins.map((coin) => (
              <div
                key={coin.id}
                onClick={() => handleCoinClick(String(coin.id))}
                className="cursor-pointer group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-gray-100">
                  {coin.images.length > 0 ? (
                    <img
                      src={coin.images[0]}
                      alt={coin.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Coins className="h-8 w-8" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-sm text-royal group-hover:text-royal-light transition-colors line-clamp-2">
                    {coin.title}
                  </h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-semibold text-gray-900">
                      ₹{coin.value.toLocaleString()}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {coin.rarity}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RelatedProductsSection;

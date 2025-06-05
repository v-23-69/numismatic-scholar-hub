
import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';

interface PriceHistory {
  id: string;
  price: number;
  date: string;
}

interface PriceHistorySectionProps {
  coinId: string;
}

const PriceHistorySection = ({ coinId }: PriceHistorySectionProps) => {
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPriceHistory();
  }, [coinId]);

  const loadPriceHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('price_history')
        .select('*')
        .eq('coin_id', coinId)
        .order('date', { ascending: false })
        .limit(10);

      if (error) throw error;
      setPriceHistory(data || []);
    } catch (error) {
      console.error('Error loading price history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Price History</span>
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
          <TrendingUp className="h-5 w-5" />
          <span>Price History</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {priceHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No price history available</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
              <span>Date</span>
              <span>Price</span>
            </div>
            {priceHistory.map((entry) => (
              <div key={entry.id} className="grid grid-cols-2 gap-4 text-sm">
                <span>{new Date(entry.date).toLocaleDateString()}</span>
                <span className="font-semibold text-royal">₹{entry.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PriceHistorySection;

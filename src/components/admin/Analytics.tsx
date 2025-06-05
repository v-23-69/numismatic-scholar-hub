
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, ShoppingCart, Star, Coins } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import supabase from '@/lib/supabaseClient';

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  topCoins: Array<{
    title: string;
    sales: number;
    revenue: number;
  }>;
  userGrowth: Array<{
    month: string;
    users: number;
  }>;
  ratingDistribution: Array<{
    rating: number;
    count: number;
  }>;
}

const Analytics = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    topCoins: [],
    userGrowth: [],
    ratingDistribution: []
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      // Load basic stats (mock data since orders table doesn't exist)
      const mockAnalytics: AnalyticsData = {
        totalRevenue: 245000,
        totalOrders: 47,
        averageOrderValue: 5213,
        topCoins: [
          { title: 'Mughal Gold Mohur', sales: 12, revenue: 180000 },
          { title: 'British India Rupee', sales: 8, revenue: 34000 },
          { title: 'Maratha Silver Coin', sales: 6, revenue: 18000 },
          { title: 'Gupta Dynasty Gold', sales: 4, revenue: 32000 },
          { title: 'Delhi Sultanate Coin', sales: 3, revenue: 15000 }
        ],
        userGrowth: [
          { month: 'Jan', users: 15 },
          { month: 'Feb', users: 23 },
          { month: 'Mar', users: 31 },
          { month: 'Apr', users: 42 },
          { month: 'May', users: 58 },
          { month: 'Jun', users: 67 }
        ],
        ratingDistribution: [
          { rating: 5, count: 45 },
          { rating: 4, count: 23 },
          { rating: 3, count: 8 },
          { rating: 2, count: 3 },
          { rating: 1, count: 1 }
        ]
      };

      // Get actual review distribution
      const { data: reviewData } = await supabase
        .from('coin_reviews')
        .select('rating');

      if (reviewData) {
        const distribution = [1, 2, 3, 4, 5].map(rating => ({
          rating,
          count: reviewData.filter(r => r.rating === rating).length
        }));
        mockAnalytics.ratingDistribution = distribution;
      }

      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Error loading analytics:', error);
      toast({
        title: "Error",
        description: "Failed to load analytics data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-royal">₹{analytics.totalRevenue.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-royal">{analytics.totalOrders}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold text-royal">₹{analytics.averageOrderValue.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Selling Coins */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Coins className="h-5 w-5" />
            <span>Top Selling Coins</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.topCoins.map((coin, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-royal text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">{coin.title}</h4>
                    <p className="text-sm text-gray-600">{coin.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-royal">₹{coin.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>User Growth (Last 6 Months)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.userGrowth.map((month, index) => {
              const maxUsers = Math.max(...analytics.userGrowth.map(m => m.users));
              const width = (month.users / maxUsers) * 100;
              
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 text-sm font-medium">{month.month}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                    <div 
                      className="bg-royal h-6 rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${width}%` }}
                    >
                      <span className="text-white text-xs font-medium">{month.users}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Rating Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5" />
            <span>Review Rating Distribution</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.ratingDistribution.reverse().map((rating) => {
              const maxCount = Math.max(...analytics.ratingDistribution.map(r => r.count));
              const width = maxCount > 0 ? (rating.count / maxCount) * 100 : 0;
              
              return (
                <div key={rating.rating} className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 w-16">
                    <span className="font-medium">{rating.rating}</span>
                    <Star className="h-4 w-4 text-gold fill-current" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                    <div 
                      className="bg-gold h-6 rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${width}%` }}
                    >
                      <span className="text-white text-xs font-medium">{rating.count}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;

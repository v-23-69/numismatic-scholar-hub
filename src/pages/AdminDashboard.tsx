
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Coins, 
  ShoppingCart, 
  MessageSquare, 
  BarChart3,
  Shield,
  TrendingUp,
  Package,
  Star
} from 'lucide-react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useToast } from "@/hooks/use-toast";
import CoinsManagement from '@/components/admin/CoinsManagement';
import OrdersManagement from '@/components/admin/OrdersManagement';
import UsersManagement from '@/components/admin/UsersManagement';
import ReviewsManagement from '@/components/admin/ReviewsManagement';
import Analytics from '@/components/admin/Analytics';
import supabase from '@/lib/supabaseClient';

interface DashboardStats {
  totalCoins: number;
  totalOrders: number;
  totalUsers: number;
  totalReviews: number;
  totalRevenue: number;
  pendingOrders: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSupabaseAuth();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalCoins: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalReviews: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    checkAdminAccess();
  }, [user]);

  const checkAdminAccess = async () => {
    if (!user) {
      navigate('/authenticate');
      return;
    }

    try {
      // Check if user has admin role
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (profile?.role !== 'admin') {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin dashboard",
          variant: "destructive"
        });
        navigate('/');
        return;
      }

      setIsAdmin(true);
      await loadDashboardStats();
    } catch (error) {
      console.error('Error checking admin access:', error);
      toast({
        title: "Error",
        description: "Failed to verify admin access",
        variant: "destructive"
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardStats = async () => {
    try {
      // Get total coins
      const { count: coinsCount } = await supabase
        .from('coin_listings')
        .select('*', { count: 'exact', head: true });

      // Get total orders (placeholder - would need orders table)
      // const { count: ordersCount } = await supabase
      //   .from('orders')
      //   .select('*', { count: 'exact', head: true });

      // Get total users
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get total reviews
      const { count: reviewsCount } = await supabase
        .from('coin_reviews')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalCoins: coinsCount || 0,
        totalOrders: 0, // Placeholder
        totalUsers: usersCount || 0,
        totalReviews: reviewsCount || 0,
        totalRevenue: 0, // Placeholder
        pendingOrders: 0 // Placeholder
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-8 w-8 text-royal" />
              <h1 className="text-4xl font-bold text-royal font-playfair">Admin Dashboard</h1>
            </div>
            <p className="text-lg text-gray-600">Manage your CoinGlobe marketplace</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Coins</p>
                    <p className="text-2xl font-bold text-royal">{stats.totalCoins}</p>
                  </div>
                  <Coins className="h-8 w-8 text-royal" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-royal">{stats.totalOrders}</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-royal" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-royal">{stats.totalUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-royal" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Reviews</p>
                    <p className="text-2xl font-bold text-royal">{stats.totalReviews}</p>
                  </div>
                  <Star className="h-8 w-8 text-royal" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Management Tabs */}
          <Tabs defaultValue="coins" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-gray-100">
              <TabsTrigger value="coins" className="flex items-center space-x-2">
                <Coins className="h-4 w-4" />
                <span>Coins</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center space-x-2">
                <Package className="h-4 w-4" />
                <span>Orders</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Users</span>
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Reviews</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="coins">
              <CoinsManagement onStatsUpdate={loadDashboardStats} />
            </TabsContent>

            <TabsContent value="orders">
              <OrdersManagement />
            </TabsContent>

            <TabsContent value="users">
              <UsersManagement />
            </TabsContent>

            <TabsContent value="reviews">
              <ReviewsManagement onStatsUpdate={loadDashboardStats} />
            </TabsContent>

            <TabsContent value="analytics">
              <Analytics />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Eye, RotateCcw, Calendar } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { MarketplaceService } from '@/services/MarketplaceService';

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useSupabaseAuth();
  const { toast } = useToast();
  
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!user) {
      navigate('/authenticate');
      return;
    }
    loadOrders();
  }, [user, navigate]);

  const loadOrders = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const ordersData = await MarketplaceService.getUserOrders(user.id);
      setOrders(ordersData);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast({
        title: "Error",
        description: "Failed to load your orders",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateOrderTotal = (orderItems: any[]) => {
    return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your orders...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-royal font-playfair">My Orders</h1>
            <p className="text-lg text-gray-600">Track and manage your coin purchases</p>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="h-24 w-24 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-600 mb-4">No orders yet</h2>
              <p className="text-gray-500 mb-8">Start exploring our amazing coin collection!</p>
              <Button 
                onClick={() => navigate('/coins-market')}
                className="bg-royal hover:bg-royal-light text-white px-8 py-3"
              >
                Browse Coins
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="border border-gray-200">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div>
                        <CardTitle className="text-lg text-royal">
                          Order #{order.id}
                        </CardTitle>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          Placed on {formatDate(order.created_at)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        <span className="text-lg font-bold text-royal">
                          ₹{order.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Order Items */}
                      <div className="space-y-2">
                        {order.order_items?.map((item: any, index: number) => (
                          <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                            <img
                              src={item.coin_listing?.images?.[0] || 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80'}
                              alt={item.coin_listing?.title}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-grow">
                              <h4 className="font-medium text-gray-900">{item.coin_listing?.title}</h4>
                              <p className="text-sm text-gray-500">
                                Quantity: {item.quantity} × ₹{item.price.toLocaleString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Shipping Address */}
                      {order.shipping_address && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-blue-900 mb-2">Shipping Address</h4>
                          <p className="text-sm text-blue-800">
                            {order.shipping_address.full_name}<br />
                            {order.shipping_address.address_line_1}<br />
                            {order.shipping_address.address_line_2 && `${order.shipping_address.address_line_2}`}<br />
                            {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}
                          </p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 pt-4 border-t">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          Track Order
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center">
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Reorder
                        </Button>
                        <Button variant="outline" size="sm">
                          Download Invoice
                        </Button>
                        <Button variant="outline" size="sm">
                          Contact Support
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;

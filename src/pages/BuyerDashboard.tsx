
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Package, 
  Download, 
  Phone, 
  RefreshCw, 
  Eye,
  Truck,
  CheckCircle,
  Clock,
  ShoppingBag
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

interface Order {
  id: string;
  order_id: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
  created_at: string;
  estimated_delivery: string;
  shipping_address: any;
  items: any[];
}

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSupabaseAuth();
  const { toast } = useToast();
  
  const [orders, setOrders] = useState<Order[]>([]);
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
    try {
      setLoading(true);
      // Mock orders for demonstration - replace with actual Supabase query
      const mockOrders: Order[] = [
        {
          id: '1',
          order_id: 'CG-2024-001',
          total_amount: 15000,
          status: 'shipped',
          created_at: '2024-01-15T10:00:00Z',
          estimated_delivery: '2024-01-20',
          shipping_address: {
            name: 'John Doe',
            address: '123 Main St, Mumbai',
            phone: '+91 9876543210'
          },
          items: [
            {
              title: 'Ancient Roman Denarius',
              quantity: 1,
              price: 15000,
              image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80'
            }
          ]
        },
        {
          id: '2',
          order_id: 'CG-2024-002',
          total_amount: 8500,
          status: 'confirmed',
          created_at: '2024-01-10T14:30:00Z',
          estimated_delivery: '2024-01-18',
          shipping_address: {
            name: 'John Doe',
            address: '123 Main St, Mumbai',
            phone: '+91 9876543210'
          },
          items: [
            {
              title: 'Mughal Silver Rupee',
              quantity: 1,
              price: 8500,
              image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80'
            }
          ]
        }
      ];
      setOrders(mockOrders);
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
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleReorder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      toast({
        title: "Items added to cart",
        description: "Previous order items have been added to your cart",
        className: "bg-green-50 border-green-200 text-green-800"
      });
      navigate('/cart');
    }
  };

  const handleDownloadInvoice = (orderId: string) => {
    toast({
      title: "Invoice downloaded",
      description: "Your invoice has been downloaded successfully",
      className: "bg-green-50 border-green-200 text-green-800"
    });
  };

  const handleContactSalesperson = () => {
    toast({
      title: "Connecting to support",
      description: "You will be connected to our sales team shortly",
      className: "bg-blue-50 border-blue-200 text-blue-800"
    });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-royal font-playfair">Buyer Dashboard</h1>
            <p className="text-lg text-gray-600">Track your orders and manage your purchases</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-royal/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Package className="h-8 w-8 text-royal mx-auto mb-2" />
                <h3 className="font-semibold text-royal">Total Orders</h3>
                <p className="text-2xl font-bold text-royal">{orders.length}</p>
              </CardContent>
            </Card>
            
            <Card className="border-royal/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Truck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-royal">In Transit</h3>
                <p className="text-2xl font-bold text-green-600">
                  {orders.filter(o => o.status === 'shipped').length}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-royal/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-royal">Delivered</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {orders.filter(o => o.status === 'delivered').length}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-royal/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <ShoppingBag className="h-8 w-8 text-gold mx-auto mb-2" />
                <h3 className="font-semibold text-royal">Total Spent</h3>
                <p className="text-2xl font-bold text-royal">
                  ₹{orders.reduce((sum, order) => sum + order.total_amount, 0).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Orders List */}
          <Card className="border-royal/20">
            <CardHeader>
              <CardTitle className="text-royal flex items-center justify-between">
                <span>Your Orders</span>
                <Button
                  onClick={loadOrders}
                  variant="outline"
                  size="sm"
                  className="border-royal text-royal hover:bg-royal hover:text-white"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-16">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal mx-auto"></div>
                  <p className="text-gray-600 mt-4">Loading your orders...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-16">
                  <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-600 mb-2">No orders yet</h3>
                  <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
                  <Button 
                    onClick={() => navigate('/coins-market')}
                    className="bg-royal hover:bg-royal-light text-white"
                  >
                    Browse Coins
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-6"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-royal">Order #{order.order_id}</h3>
                          <p className="text-sm text-gray-600">
                            Placed on {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3 mt-3 md:mt-0">
                          <Badge className={`${getStatusColor(order.status)} flex items-center`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1 capitalize">{order.status}</span>
                          </Badge>
                          <span className="text-lg font-bold text-royal">
                            ₹{order.total_amount.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-3 mb-4">
                        {order.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-4">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-grow">
                              <h4 className="font-medium text-royal">{item.title}</h4>
                              <p className="text-sm text-gray-600">
                                Quantity: {item.quantity} × ₹{item.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Separator className="my-4" />

                      {/* Shipping Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-royal mb-2">Shipping Address</h4>
                          <p className="text-sm text-gray-600">
                            {order.shipping_address.name}<br />
                            {order.shipping_address.address}<br />
                            {order.shipping_address.phone}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-royal mb-2">Delivery Information</h4>
                          <p className="text-sm text-gray-600">
                            Estimated delivery: {new Date(order.estimated_delivery).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        <Button
                          onClick={() => navigate(`/order/${order.order_id}`)}
                          variant="outline"
                          size="sm"
                          className="border-royal text-royal hover:bg-royal hover:text-white"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        
                        <Button
                          onClick={() => handleReorder(order.id)}
                          variant="outline"
                          size="sm"
                          className="border-royal text-royal hover:bg-royal hover:text-white"
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Reorder
                        </Button>
                        
                        <Button
                          onClick={() => handleDownloadInvoice(order.id)}
                          variant="outline"
                          size="sm"
                          className="border-royal text-royal hover:bg-royal hover:text-white"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Invoice
                        </Button>
                        
                        <Button
                          onClick={handleContactSalesperson}
                          variant="outline"
                          size="sm"
                          className="border-royal text-royal hover:bg-royal hover:text-white"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Support
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BuyerDashboard;

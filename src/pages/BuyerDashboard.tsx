
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Heart, Bell, ShoppingCart, Star, Truck, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Mock data for buyer dashboard
const mockBuyerStats = {
  totalOrders: 12,
  wishlistItems: 8,
  unreadNotifications: 3,
  totalSpent: 125000
};

const mockOrders = [
  {
    id: 'ORD-001',
    coinTitle: 'Mughal Empire Gold Mohur 1658',
    seller: 'Ancient Coins Co.',
    amount: 25000,
    status: 'shipped',
    orderDate: '2024-06-01',
    estimatedDelivery: '2024-06-08',
    trackingNumber: 'TRK123456789',
    progress: 75,
    image: '/placeholder.svg'
  },
  {
    id: 'ORD-002',
    coinTitle: 'British India Silver Rupee 1835',
    seller: 'Heritage Coins',
    amount: 3500,
    status: 'delivered',
    orderDate: '2024-05-28',
    deliveryDate: '2024-06-02',
    progress: 100,
    image: '/placeholder.svg'
  },
  {
    id: 'ORD-003',
    coinTitle: 'Gupta Empire Gold Dinar 375 AD',
    seller: 'Rare Collectibles',
    amount: 85000,
    status: 'pending',
    orderDate: '2024-06-03',
    estimatedDelivery: '2024-06-10',
    progress: 25,
    image: '/placeholder.svg'
  }
];

const mockWishlistItems = [
  {
    id: '1',
    title: 'Chola Dynasty Bronze Coin 1010 AD',
    price: 12000,
    seller: 'South Indian Coins',
    addedDate: '2024-05-30',
    image: '/placeholder.svg',
    inStock: true
  },
  {
    id: '2',
    title: 'Maratha Empire Silver Coin 1760',
    price: 8500,
    seller: 'Royal Collections',
    addedDate: '2024-05-28',
    image: '/placeholder.svg',
    inStock: true
  },
  {
    id: '3',
    title: 'Delhi Sultanate Gold Tanka 1320',
    price: 45000,
    seller: 'Medieval Coins',
    addedDate: '2024-05-25',
    image: '/placeholder.svg',
    inStock: false
  }
];

const mockNotifications = [
  {
    id: '1',
    type: 'order',
    title: 'Order shipped',
    message: 'Your Mughal Empire Gold Mohur has been shipped',
    time: '2 hours ago',
    read: false
  },
  {
    id: '2',
    type: 'wishlist',
    title: 'Price drop alert',
    message: 'Chola Dynasty Bronze Coin price reduced by ₹1,500',
    time: '1 day ago',
    read: false
  },
  {
    id: '3',
    type: 'promotion',
    title: 'Special offer',
    message: 'Get 10% off on all British India coins this week',
    time: '2 days ago',
    read: true
  }
];

const mockRecommendations = [
  {
    id: '1',
    title: 'Vijayanagara Empire Gold Pagoda 1500',
    price: 18000,
    reason: 'Based on your recent purchases',
    image: '/placeholder.svg'
  },
  {
    id: '2',
    title: 'Mysore Kingdom Silver Rupee 1790',
    price: 6500,
    reason: 'Similar to items in your wishlist',
    image: '/placeholder.svg'
  }
];

const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Package className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-royal mb-2">Buyer Dashboard</h1>
              <p className="text-gray-600">Track your orders and manage your coin collection</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <Link to="/wishlist">
                <Button variant="outline" className="border-royal text-royal hover:bg-blue-50">
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </Button>
              </Link>
              <Link to="/coins-market">
                <Button className="bg-royal hover:bg-blue-600">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Browse Coins
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-royal">{mockBuyerStats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">+3 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-royal">{mockBuyerStats.wishlistItems}</div>
              <p className="text-xs text-muted-foreground">2 on sale now</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-royal">{mockBuyerStats.unreadNotifications}</div>
              <p className="text-xs text-muted-foreground">Unread messages</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-royal">₹{mockBuyerStats.totalSpent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Tracking */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Track your coin orders and delivery status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <img
                          src={order.image}
                          alt={order.coinTitle}
                          className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-medium text-sm mb-1">{order.coinTitle}</h3>
                              <p className="text-sm text-gray-600">Sold by {order.seller}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-royal">₹{order.amount.toLocaleString()}</p>
                              <Badge className={`${getStatusColor(order.status)} mt-1`}>
                                {getStatusIcon(order.status)}
                                <span className="ml-1 capitalize">{order.status}</span>
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                              <span>Order Progress</span>
                              <span>{order.progress}%</span>
                            </div>
                            <Progress value={order.progress} className="h-2" />
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">
                              Ordered: {new Date(order.orderDate).toLocaleDateString()}
                            </span>
                            {order.status === 'delivered' ? (
                              <span className="text-green-600">
                                Delivered: {new Date(order.deliveryDate!).toLocaleDateString()}
                              </span>
                            ) : (
                              <span className="text-blue-600">
                                Expected: {new Date(order.estimatedDelivery).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          
                          {order.trackingNumber && order.status === 'shipped' && (
                            <div className="mt-2 text-sm">
                              <span className="text-gray-600">Tracking: </span>
                              <span className="font-mono text-blue-600">{order.trackingNumber}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Recent updates and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockNotifications.slice(0, 3).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border ${
                        !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-1">{notification.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>Based on your interests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecommendations.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg hover:shadow-md transition-shadow">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                        <p className="text-xs text-gray-600 mb-1">{item.reason}</p>
                        <p className="font-bold text-royal text-sm">₹{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Wishlist Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Wishlist Summary</CardTitle>
            <CardDescription>Your saved coins and their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockWishlistItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-medium text-sm mb-2 line-clamp-2">{item.title}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-royal">₹{item.price.toLocaleString()}</span>
                    <Badge className={item.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">By {item.seller}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-royal hover:bg-blue-600"
                      disabled={!item.inStock}
                    >
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default BuyerDashboard;

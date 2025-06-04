
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, TrendingUp, Package, AlertCircle, Eye, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Mock data for seller dashboard
const mockSellerStats = {
  activeListings: 24,
  totalSales: 156,
  monthlyRevenue: 45200,
  averageRating: 4.8,
  pendingOrders: 3,
  expiringListings: 2
};

const mockRecentOrders = [
  {
    id: '1',
    coinTitle: 'Mughal Empire Gold Mohur 1658',
    buyer: 'Rajesh Kumar',
    amount: 25000,
    status: 'pending',
    date: '2024-06-03'
  },
  {
    id: '2',
    coinTitle: 'British India Silver Rupee 1835',
    buyer: 'Priya Sharma',
    amount: 3500,
    status: 'shipped',
    date: '2024-06-02'
  },
  {
    id: '3',
    coinTitle: 'Gupta Empire Gold Dinar 375 AD',
    buyer: 'Amit Patel',
    amount: 85000,
    status: 'delivered',
    date: '2024-06-01'
  }
];

const mockActiveListings = [
  {
    id: '1',
    title: 'Mughal Empire Gold Mohur 1658',
    price: 25000,
    views: 45,
    status: 'active',
    expiresIn: '12 days',
    image: '/placeholder.svg'
  },
  {
    id: '2',
    title: 'British India Silver Rupee 1835',
    price: 3500,
    views: 23,
    status: 'active',
    expiresIn: '8 days',
    image: '/placeholder.svg'
  },
  {
    id: '3',
    title: 'Chola Dynasty Bronze Coin 1010 AD',
    price: 12000,
    views: 67,
    status: 'pending',
    expiresIn: '2 days',
    image: '/placeholder.svg'
  }
];

const mockSalesData = [
  { month: 'Jan', sales: 8, revenue: 15000 },
  { month: 'Feb', sales: 12, revenue: 22000 },
  { month: 'Mar', sales: 15, revenue: 28000 },
  { month: 'Apr', sales: 18, revenue: 35000 },
  { month: 'May', sales: 22, revenue: 45000 },
  { month: 'Jun', sales: 14, revenue: 32000 }
];

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      shipped: 'bg-blue-100 text-blue-800',
      delivered: 'bg-green-100 text-green-800',
      expired: 'bg-red-100 text-red-800'
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-royal mb-2">Seller Dashboard</h1>
              <p className="text-gray-600">Manage your coin listings and track your sales performance</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <Link to="/coins-market">
                <Button variant="outline" className="border-royal text-royal hover:bg-blue-50">
                  View Marketplace
                </Button>
              </Link>
              <Button className="bg-royal hover:bg-blue-600">
                <Plus className="h-4 w-4 mr-2" />
                Add New Listing
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-royal">{mockSellerStats.activeListings}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-royal">{mockSellerStats.totalSales}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-royal">₹{mockSellerStats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-royal">{mockSellerStats.pendingOrders}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {mockSellerStats.expiringListings > 0 && (
          <Card className="mb-8 border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
                <div>
                  <p className="font-medium text-yellow-800">
                    {mockSellerStats.expiringListings} listings expiring soon
                  </p>
                  <p className="text-sm text-yellow-700">
                    Review and renew your listings to keep them active
                  </p>
                </div>
                <Button variant="outline" className="ml-auto" size="sm">
                  View Listings
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your latest customer orders and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Coin</TableHead>
                      <TableHead>Buyer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRecentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.coinTitle}</TableCell>
                        <TableCell>{order.buyer}</TableCell>
                        <TableCell>₹{order.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Sales Chart */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales</CardTitle>
                <CardDescription>Sales trend over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSalesData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{data.month}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-royal h-2 rounded-full"
                            style={{ width: `${(data.sales / 25) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{data.sales}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Active Listings */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Active Listings</CardTitle>
            <CardDescription>Manage your current coin listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockActiveListings.map((listing) => (
                <div key={listing.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-medium text-sm mb-2 line-clamp-2">{listing.title}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-royal">₹{listing.price.toLocaleString()}</span>
                    <Badge className={getStatusBadge(listing.status)}>
                      {listing.status}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Eye className="h-4 w-4 mr-1" />
                    {listing.views} views • Expires in {listing.expiresIn}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
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

export default SellerDashboard;

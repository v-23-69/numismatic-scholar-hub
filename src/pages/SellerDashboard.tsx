
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Package, AlertCircle, Edit, Trash2, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useSellerAccess } from '@/hooks/useSellerAccess';
import { ListCoinModal } from '@/components/marketplace/ListCoinModal';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import type { CoinListing } from '@/types/marketplace';

const SellerDashboard = () => {
  const { user } = useSupabaseAuth();
  const { isSellerAllowed } = useSellerAccess();
  const { toast } = useToast();
  const [listings, setListings] = useState<CoinListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (user && isSellerAllowed) {
      loadSellerListings();
    }
  }, [user, isSellerAllowed]);

  const loadSellerListings = async () => {
    try {
      setLoading(true);
      console.log('Loading listings for seller:', user.id);
      
      // Get coins listed by this specific seller
      const { data, error } = await supabase
        .from('coin_listings')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      console.log('Found listings:', data);
      setListings(data || []);
    } catch (error) {
      console.error('Error loading seller listings:', error);
      toast({
        title: "Error",
        description: "Failed to load your listings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteListing = async (listingId: number) => {
    try {
      const { error } = await supabase
        .from('coin_listings')
        .delete()
        .eq('id', listingId)
        .eq('seller_id', user?.id); // Ensure only the seller can delete their own listings

      if (error) throw error;

      toast({
        title: "Listing deleted",
        description: "Your coin listing has been removed",
        className: "bg-green-50 border-green-200 text-green-800"
      });

      loadSellerListings();
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast({
        title: "Error",
        description: "Failed to delete listing",
        variant: "destructive"
      });
    }
  };

  const mockStats = {
    activeListings: listings.length,
    totalSales: 0,
    averageRating: 0,
    pendingVerifications: 0
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      sold: 'bg-blue-100 text-blue-800',
      expired: 'bg-red-100 text-red-800'
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
  };

  // Check if user is authorized
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-royal mb-4">Please Sign In</h1>
            <p className="text-gray-600 mb-4">You need to be signed in to access the Seller Dashboard.</p>
            <Link to="/authenticate">
              <Button className="bg-royal hover:bg-royal-light text-white rounded-lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isSellerAllowed) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-royal mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-4">You don't have permission to access the Seller Dashboard.</p>
            <Link to="/coins-market">
              <Button className="bg-royal hover:bg-royal-light text-white rounded-lg">
                Back to Marketplace
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
                <Button variant="outline" className="border-royal text-royal hover:bg-blue-50 rounded-lg">
                  View Marketplace
                </Button>
              </Link>
              <Button 
                onClick={() => setShowAddModal(true)}
                className="bg-royal hover:bg-blue-600 text-white rounded-lg"
              >
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
              <div className="text-2xl font-bold text-royal">{mockStats.activeListings}</div>
              <p className="text-xs text-muted-foreground">Your current listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-royal">{mockStats.totalSales}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-royal">{mockStats.averageRating}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-royal">{mockStats.pendingVerifications}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Listings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Coin Listings</CardTitle>
            <CardDescription>Manage your active and pending coin listings</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your listings...</p>
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4 text-lg">No coins listed yet</p>
                <p className="text-gray-500 mb-6">Start building your coin collection marketplace by listing your first coin.</p>
                <Button 
                  onClick={() => setShowAddModal(true)} 
                  className="bg-royal hover:bg-royal-light text-white rounded-lg"
                >
                  Add Your First Listing
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Coin</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={listing.images[0] || 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80'}
                            alt={listing.title}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div>
                            <p className="font-medium text-sm">{listing.title}</p>
                            <p className="text-xs text-gray-500">{listing.region}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">₹{listing.value.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{listing.category || 'Uncategorized'}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge('active')}>
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell>{listing.stock_quantity}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm" className="rounded-lg">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700 rounded-lg"
                            onClick={() => handleDeleteListing(Number(listing.id))}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
      
      {/* List Coin Modal */}
      <ListCoinModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal} 
      />
    </div>
  );
};

export default SellerDashboard;

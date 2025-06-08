
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, TrendingUp, Package, AlertCircle, Eye, Edit, Trash2, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useSellerAccess } from '@/hooks/useSellerAccess';
import { MarketplaceService } from '@/services/MarketplaceService';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import type { CoinListing } from '@/types/marketplace';

const SellerDashboard = () => {
  const { user } = useSupabaseAuth();
  const { isSellerAllowed } = useSellerAccess();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [listings, setListings] = useState<CoinListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCoin, setNewCoin] = useState({
    title: '',
    description: '',
    mint_date: '',
    region: '',
    value: 0,
    rarity: 'Common' as const,
    verified: false,
    images: [''],
    stock_quantity: 1,
    metal: '',
    dynasty: '',
    ruler: '',
    condition: '',
    category: ''
  });

  useEffect(() => {
    if (user && isSellerAllowed) {
      loadSellerListings();
    }
  }, [user, isSellerAllowed]);

  const loadSellerListings = async () => {
    if (!user) return;
    
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

  const handleAddCoin = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('coin_listings')
        .insert({
          title: newCoin.title,
          description: newCoin.description,
          value: newCoin.value,
          images: newCoin.images.filter(img => img.trim() !== ''),
          category: newCoin.category,
          region: newCoin.region,
          rarity: newCoin.rarity,
          mint_date: newCoin.mint_date || null,
          metal: newCoin.metal || null,
          condition: newCoin.condition || null,
          dynasty: newCoin.dynasty || null,
          seller_id: user.id,
          seller_name: user.user_metadata?.full_name || user.email || 'Anonymous',
          verified: false,
          stock_quantity: newCoin.stock_quantity,
        });

      if (error) throw error;
      
      toast({
        title: "Coin listed successfully!",
        description: "Your coin has been added to the marketplace",
        className: "bg-green-50 border-green-200 text-green-800"
      });
      
      setShowAddModal(false);
      setNewCoin({
        title: '',
        description: '',
        mint_date: '',
        region: '',
        value: 0,
        rarity: 'Common',
        verified: false,
        images: [''],
        stock_quantity: 1,
        metal: '',
        dynasty: '',
        ruler: '',
        condition: '',
        category: ''
      });
      
      loadSellerListings();
    } catch (error) {
      console.error('Error adding coin:', error);
      toast({
        title: "Error",
        description: "Failed to add coin listing",
        variant: "destructive"
      });
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
    totalSales: 156,
    monthlyRevenue: 45200,
    averageRating: 4.8,
    pendingOrders: 3,
    totalViews: 2847
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
            <h1 className="text-2xl font-bold text-royal mb-4">Please sign in to access Seller Dashboard</h1>
            <Link to="/authenticate">
              <Button className="bg-royal hover:bg-royal-light text-white">
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
              <Button className="bg-royal hover:bg-royal-light text-white">
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
                <Button variant="outline" className="border-royal text-royal hover:bg-blue-50">
                  View Marketplace
                </Button>
              </Link>
              <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
                <DialogTrigger asChild>
                  <Button className="bg-royal hover:bg-blue-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Listing
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Coin Listing</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Coin Title *</Label>
                        <Input
                          id="title"
                          value={newCoin.title}
                          onChange={(e) => setNewCoin(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g., Mughal Gold Mohur 1658"
                        />
                      </div>
                      <div>
                        <Label htmlFor="value">Price (₹) *</Label>
                        <Input
                          id="value"
                          type="number"
                          value={newCoin.value}
                          onChange={(e) => setNewCoin(prev => ({ ...prev, value: Number(e.target.value) }))}
                          placeholder="25000"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={newCoin.description}
                        onChange={(e) => setNewCoin(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Detailed description of the coin..."
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select onValueChange={(value) => setNewCoin(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Ancient India">Ancient India</SelectItem>
                            <SelectItem value="Mughal India">Mughal India</SelectItem>
                            <SelectItem value="British India">British India</SelectItem>
                            <SelectItem value="Republic India">Republic India</SelectItem>
                            <SelectItem value="Ancient">Ancient</SelectItem>
                            <SelectItem value="Medieval">Medieval</SelectItem>
                            <SelectItem value="Modern">Modern</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="region">Region/Country</Label>
                        <Input
                          id="region"
                          value={newCoin.region}
                          onChange={(e) => setNewCoin(prev => ({ ...prev, region: e.target.value }))}
                          placeholder="e.g., Mughal Empire"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="mint_date">Mint Date/Year</Label>
                        <Input
                          id="mint_date"
                          value={newCoin.mint_date}
                          onChange={(e) => setNewCoin(prev => ({ ...prev, mint_date: e.target.value }))}
                          placeholder="e.g., 1658 AD"
                        />
                      </div>
                      <div>
                        <Label htmlFor="metal">Metal</Label>
                        <Input
                          id="metal"
                          value={newCoin.metal}
                          onChange={(e) => setNewCoin(prev => ({ ...prev, metal: e.target.value }))}
                          placeholder="e.g., Gold, Silver, Copper"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="condition">Condition</Label>
                        <Select onValueChange={(value) => setNewCoin(prev => ({ ...prev, condition: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mint">Mint</SelectItem>
                            <SelectItem value="Excellent">Excellent</SelectItem>
                            <SelectItem value="Very Fine">Very Fine</SelectItem>
                            <SelectItem value="Fine">Fine</SelectItem>
                            <SelectItem value="Good">Good</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="rarity">Rarity</Label>
                        <Select onValueChange={(value) => setNewCoin(prev => ({ ...prev, rarity: value as any }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select rarity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Common">Common</SelectItem>
                            <SelectItem value="Uncommon">Uncommon</SelectItem>
                            <SelectItem value="Rare">Rare</SelectItem>
                            <SelectItem value="Very Rare">Very Rare</SelectItem>
                            <SelectItem value="Extremely Rare">Extremely Rare</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="stock">Stock Quantity</Label>
                        <Input
                          id="stock"
                          type="number"
                          value={newCoin.stock_quantity}
                          onChange={(e) => setNewCoin(prev => ({ ...prev, stock_quantity: Number(e.target.value) }))}
                          min="1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="dynasty">Dynasty/Ruler</Label>
                      <Input
                        id="dynasty"
                        value={newCoin.dynasty}
                        onChange={(e) => setNewCoin(prev => ({ ...prev, dynasty: e.target.value }))}
                        placeholder="e.g., Akbar"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="images">Image URL</Label>
                      <Input
                        id="images"
                        value={newCoin.images[0]}
                        onChange={(e) => setNewCoin(prev => ({ ...prev, images: [e.target.value] }))}
                        placeholder="https://example.com/coin-image.jpg"
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setShowAddModal(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddCoin} className="bg-royal hover:bg-royal-light">
                        Add Listing
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-royal">₹{mockStats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-royal">{mockStats.totalViews}</div>
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
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">You haven't listed any coins yet</p>
                <Button onClick={() => setShowAddModal(true)} className="bg-royal hover:bg-royal-light">
                  <Plus className="h-4 w-4 mr-2" />
                  List Your First Coin
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
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteListing(listing.id)}
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
    </div>
  );
};

export default SellerDashboard;

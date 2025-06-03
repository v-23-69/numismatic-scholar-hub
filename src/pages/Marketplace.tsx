
import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, Plus, Upload, Shield, ArrowUpDown, Heart, ShoppingCart, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturedCoins from "@/components/marketplace/FeaturedCoins";
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from "@/components/ui/use-toast";
import { MarketplaceService } from '@/services/MarketplaceService';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import type { CoinListing } from '@/types/marketplace';

interface MarketplaceFilters {
  search?: string;
  region?: string;
  rarity?: string;
  minValue?: number;
  maxValue?: number;
  verified?: boolean;
  sortBy?: string;
}

const CoinCard = ({ coin, index }: { coin: CoinListing, index: number }) => {
  const navigate = useNavigate();
  const { user } = useSupabaseAuth();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();
  const [addingToCart, setAddingToCart] = useState(false);
  
  const toggleWishlist = () => {
    const coinIdNum = Number(coin.id);
    if (isInWishlist(coinIdNum)) {
      removeFromWishlist(coinIdNum);
      toast({
        title: "Removed from wishlist",
        description: `${coin.title} has been removed from your wishlist`,
      });
    } else {
      addToWishlist({
        id: coinIdNum,
        title: coin.title,
        description: coin.description,
        image: coin.images[0] || '',
        value: String(coin.value),
        type: 'coin'
      });
      toast({
        title: "Added to wishlist",
        description: `${coin.title} has been added to your wishlist`,
      });
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add items to cart",
        variant: "destructive"
      });
      return;
    }

    try {
      setAddingToCart(true);
      await MarketplaceService.addToCart(user.id, coin.id, 1);
      
      toast({
        title: "Added to cart",
        description: `${coin.title} has been added to your cart`,
        className: "bg-green-50 border-green-200 text-green-800"
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive"
      });
    } finally {
      setAddingToCart(false);
    }
  };
  
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="royal-card overflow-hidden group cursor-pointer"
      onClick={() => navigate(`/coins-market/${coin.id}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={coin.images[0] || 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80'} 
          alt={coin.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {coin.verified && (
          <div className="absolute top-3 right-3 bg-gold text-royal-dark text-xs font-bold px-2 py-1 rounded flex items-center">
            <Shield className="h-3 w-3 mr-1" />
            VERIFIED
          </div>
        )}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist();
          }}
          className={`absolute top-3 left-3 p-2 rounded-full ${
            isInWishlist(Number(coin.id)) 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-500 hover:text-red-500'
          } transition-colors shadow-md`}
        >
          <Heart className="h-4 w-4" fill={isInWishlist(Number(coin.id)) ? "currentColor" : "none"} />
        </button>
        
        {coin.stock_quantity === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold">OUT OF STOCK</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-gold border-gold">{coin.region}</Badge>
          <span className="text-sm text-gray-600">{coin.mint_date}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-royal group-hover:text-gold transition-colors">
          {coin.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {coin.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">
            Rarity: <span className="text-royal">{coin.rarity}</span>
          </span>
          <span className="text-royal font-bold">₹{coin.value.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-royal rounded-full flex items-center justify-center text-white text-xs mr-2">
              {coin.seller_avatar ? (
                <img 
                  src={coin.seller_avatar} 
                  alt={coin.seller_name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                coin.seller_name.charAt(0)
              )}
            </div>
            <span className="text-sm text-gray-700">{coin.seller_name}</span>
          </div>
          <Button 
            onClick={handleAddToCart}
            disabled={addingToCart || coin.stock_quantity === 0}
            className="text-white bg-royal hover:bg-royal-light text-sm"
            size="sm"
          >
            {addingToCart ? (
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
            ) : (
              <ShoppingCart className="h-3 w-3 mr-1" />
            )}
            {coin.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters 
}: { 
  filters: MarketplaceFilters;
  onFiltersChange: (filters: MarketplaceFilters) => void;
  onClearFilters: () => void;
}) => {
  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'minValue' || key === 'maxValue') {
      return typeof value === 'number' && !isNaN(value);
    }
    if (key === 'search' || key === 'sortBy') return false; // Don't count search and sort as filters
    return value !== undefined && value !== '' && value !== null;
  });

  return (
    <Card className="p-6 bg-gradient-to-b from-white to-gray-50 border-royal/20 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-royal text-lg flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </h3>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="text-royal hover:text-royal-light hover:bg-royal/10"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Sort By</label>
        <Select 
          value={filters.sortBy || 'newest'} 
          onValueChange={(value: string) => {
            onFiltersChange({ ...filters, sortBy: value });
          }}
        >
          <SelectTrigger className="border-royal/30 focus:border-royal focus:ring-royal/20">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent className="z-50 bg-white border border-gray-200 shadow-lg">
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="featured">Featured</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="relative z-20 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Region</label>
        <Select 
          value={filters.region || 'all'} 
          onValueChange={(value: string) => {
            const newValue = value === 'all' ? undefined : value;
            onFiltersChange({ ...filters, region: newValue });
          }}
        >
          <SelectTrigger className="border-royal/30 focus:border-royal focus:ring-royal/20">
            <SelectValue placeholder="All regions" />
          </SelectTrigger>
          <SelectContent className="z-50 bg-white border border-gray-200 shadow-lg">
            <SelectItem value="all">All regions</SelectItem>
            <SelectItem value="United States">United States</SelectItem>
            <SelectItem value="Roman Empire">Roman Empire</SelectItem>
            <SelectItem value="India">India</SelectItem>
            <SelectItem value="China">China</SelectItem>
            <SelectItem value="Europe">Europe</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="relative z-10 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Rarity</label>
        <Select 
          value={filters.rarity || 'all'} 
          onValueChange={(value: string) => {
            const newValue = value === 'all' ? undefined : value;
            onFiltersChange({ ...filters, rarity: newValue });
          }}
        >
          <SelectTrigger className="border-royal/30 focus:border-royal focus:ring-royal/20">
            <SelectValue placeholder="All rarities" />
          </SelectTrigger>
          <SelectContent className="z-40 bg-white border border-gray-200 shadow-lg">
            <SelectItem value="all">All rarities</SelectItem>
            <SelectItem value="Common">Common</SelectItem>
            <SelectItem value="Uncommon">Uncommon</SelectItem>
            <SelectItem value="Rare">Rare</SelectItem>
            <SelectItem value="Very Rare">Very Rare</SelectItem>
            <SelectItem value="Extremely Rare">Extremely Rare</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Price Range (₹)</label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="number"
            placeholder="Min Value"
            value={filters.minValue !== undefined ? String(filters.minValue) : ''}
            onChange={e => {
              const value = e.target.value;
              onFiltersChange({ ...filters, minValue: value !== '' ? Number(value) : undefined });
            }}
            min={0}
            className="border-royal/30 focus:border-royal focus:ring-royal/20"
          />
          <Input
            type="number"
            placeholder="Max Value"
            value={filters.maxValue !== undefined ? String(filters.maxValue) : ''}
            onChange={e => {
              const value = e.target.value;
              onFiltersChange({ ...filters, maxValue: value !== '' ? Number(value) : undefined });
            }}
            min={0}
            className="border-royal/30 focus:border-royal focus:ring-royal/20"
          />
        </div>
      </div>
      
      <div className="flex items-center p-4 bg-royal/10 rounded-lg">
        <input
          type="checkbox"
          id="verified"
          checked={filters.verified || false}
          onChange={(e) => onFiltersChange({ 
            ...filters, 
            verified: e.target.checked || undefined 
          })}
          className="rounded border-royal/30 text-royal focus:ring-royal/20 mr-3"
        />
        <label htmlFor="verified" className="text-sm text-gray-700 flex items-center">
          <Shield className="h-4 w-4 mr-1 text-gold" />
          Verified coins only
        </label>
      </div>
    </Card>
  );
};

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useSupabaseAuth();
  const { toast } = useToast();
  
  // State management
  const [coins, setCoins] = useState<CoinListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  
  // Filters
  const [filters, setFilters] = useState<MarketplaceFilters>(() => {
    const minValue = searchParams.get('minValue');
    const maxValue = searchParams.get('maxValue');
    return {
      search: searchParams.get('search') || '',
      region: searchParams.get('region') || undefined,
      rarity: searchParams.get('rarity') || undefined,
      minValue: minValue !== null && minValue !== '' ? Number(minValue) : undefined,
      maxValue: maxValue !== null && maxValue !== '' ? Number(maxValue) : undefined,
      verified: searchParams.get('verified') === 'true' ? true : undefined,
      sortBy: searchParams.get('sortBy') || 'newest',
    };
  });

  // Load coins from Supabase
  const loadCoins = async (pageNum: number = 1, resetList: boolean = true) => {
    try {
      setLoading(true);
      const result = await MarketplaceService.getCoinListings(filters, pageNum, 12);
      
      if (resetList) {
        setCoins(result.data);
      } else {
        setCoins(prev => [...prev, ...result.data]);
      }
      
      setHasMore(result.hasMore);
      setTotalCount(result.count);
      setPage(pageNum);
    } catch (error) {
      console.error('Error loading coins:', error);
      toast({
        title: "Error",
        description: "Failed to load coin listings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Initialize and handle filter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    loadCoins(1, true);
  }, [filters]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.set(key, String(value));
      }
    });
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFiltersChange = (newFilters: MarketplaceFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      minValue: typeof newFilters.minValue === 'string' 
        ? (newFilters.minValue !== '' ? Number(newFilters.minValue) : undefined)
        : newFilters.minValue,
      maxValue: typeof newFilters.maxValue === 'string'
        ? (newFilters.maxValue !== '' ? Number(newFilters.maxValue) : undefined)
        : newFilters.maxValue,
    }));
  };

  const clearFilters = () => {
    setFilters({ search: filters.search || '', sortBy: 'newest' });
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      loadCoins(page + 1, false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-royal/10 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-playfair text-royal mb-4">
                Numismatic Marketplace
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Discover authenticated coins from trusted sellers or list your own collection for our community of passionate collectors.
              </p>
              
              <div className="relative max-w-xl mx-auto">
                <Input
                  type="text"
                  placeholder="Search for coins by name, region, or date..."
                  value={filters.search || ''}
                  onChange={(e) => handleFiltersChange({ ...filters, search: e.target.value })}
                  className="pr-10 h-12 text-lg border-royal/30 focus:border-royal focus:ring-royal/20"
                />
                <Search className="absolute right-3 top-3 h-6 w-6 text-gray-400" />
              </div>
              
              <div className="flex flex-wrap justify-center mt-6 space-x-0 space-y-2 sm:space-x-4 sm:space-y-0">
                {user ? (
                  <Button className="bg-gold hover:bg-gold-light text-royal">
                    <Plus className="h-4 w-4 mr-2" />
                    List Your Coin
                  </Button>
                ) : (
                  <Button onClick={() => navigate('/authenticate')} className="bg-royal hover:bg-royal-light text-white">
                    Sign In to List Coins
                  </Button>
                )}
                
                <Button 
                  onClick={() => navigate('/verify-coins')}
                  variant="outline" 
                  className="border-royal text-royal hover:bg-royal hover:text-white"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Verification Services
                </Button>
                
                <Button 
                  onClick={() => navigate('/wishlist')}
                  variant="outline" 
                  className="border-royal text-royal hover:bg-royal hover:text-white"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  View Wishlist
                </Button>

                <Button 
                  onClick={() => navigate('/cart')}
                  variant="outline" 
                  className="border-royal text-royal hover:bg-royal hover:text-white"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Cart
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Coins Section */}
        <FeaturedCoins />
        
        {/* Main Content */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1 relative">
                <div className="relative z-30 sticky top-4">
                  <FilterPanel 
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onClearFilters={clearFilters}
                  />
                </div>
              </div>

              {/* Coins Grid */}
              <div className="lg:col-span-3">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold font-playfair text-royal">
                    {totalCount > 0 ? `${totalCount} Coins Found` : 'All Coins'}
                  </h2>
                </div>
                
                {loading && page === 1 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : coins.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                      {coins.map((coin, index) => (
                        <CoinCard key={coin.id} coin={coin} index={index} />
                      ))}
                    </div>
                    
                    {/* Load More Button */}
                    {hasMore && (
                      <div className="text-center mt-12">
                        <Button 
                          onClick={loadMore}
                          disabled={loading}
                          className="bg-royal hover:bg-royal-light text-white px-8 py-3"
                        >
                          {loading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Loading...
                            </>
                          ) : (
                            'Load More Coins'
                          )}
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-bold text-gray-700 mb-2">No coins found</h3>
                    <p className="text-gray-600 mb-8">
                      Try adjusting your search or filter criteria to find what you're looking for.
                    </p>
                    <Button 
                      onClick={clearFilters}
                      className="bg-royal hover:bg-royal-light text-white"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Authentication Feature */}
        <section className="bg-royal/5 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold font-playfair text-royal mb-4">
                  Expert Coin Authentication
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Not sure about a coin's authenticity? Upload photos to get professional verification from our expert numismatists.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <div className="h-5 w-5 bg-gold rounded-full flex items-center justify-center mr-3">
                      <span className="text-royal text-xs font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">Quick analysis within 24 hours</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 bg-gold rounded-full flex items-center justify-center mr-3">
                      <span className="text-royal text-xs font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">Verification of authenticity</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 bg-gold rounded-full flex items-center justify-center mr-3">
                      <span className="text-royal text-xs font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">Details on era, material, and rarity</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 bg-gold rounded-full flex items-center justify-center mr-3">
                      <span className="text-royal text-xs font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">Current market value estimate</span>
                  </li>
                </ul>
                
                <Button className="bg-gold hover:bg-gold-light text-royal">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Coin for ₹20
                </Button>
              </div>
              
              <div className="relative">
                <div className="royal-card overflow-hidden p-6">
                  <div className="absolute top-3 right-3 bg-gold text-royal-dark text-xs font-bold px-2 py-1 rounded">
                    1000+ COINS AUTHENTICATED
                  </div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-royal rounded-full flex items-center justify-center text-white mr-4">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-royal">Verified by Experts</h3>
                      <p className="text-sm text-gray-600">Results in 24 Hours</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-royal/5 rounded-md">
                      <span className="text-gray-700 font-medium">Authentication</span>
                      <span className="text-royal font-bold">✓ Included</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-royal/5 rounded-md">
                      <span className="text-gray-700 font-medium">Era & Origin</span>
                      <span className="text-royal font-bold">✓ Included</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-royal/5 rounded-md">
                      <span className="text-gray-700 font-medium">Material Analysis</span>
                      <span className="text-royal font-bold">✓ Included</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-royal/5 rounded-md">
                      <span className="text-gray-700 font-medium">Market Value</span>
                      <span className="text-royal font-bold">✓ Included</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-royal/5 rounded-md">
                      <span className="text-gray-700 font-medium">Rarity Assessment</span>
                      <span className="text-royal font-bold">✓ Included</span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-gold text-royal-dark text-lg font-bold p-4 rounded-lg shadow-lg">
                  Only ₹20
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;

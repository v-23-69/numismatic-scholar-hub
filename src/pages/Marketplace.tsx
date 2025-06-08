import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, Plus, Shield, Heart, ShoppingCart, Eye, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturedCoins from "@/components/marketplace/FeaturedCoins";
import { ListCoinModal } from "@/components/marketplace/ListCoinModal";
import { QuickViewModal } from "@/components/marketplace/QuickViewModal";
import { FilterPresets } from "@/components/marketplace/FilterPresets";
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from "@/hooks/use-toast";
import { MarketplaceService } from '@/services/MarketplaceService';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useSellerAccess } from '@/hooks/useSellerAccess';
import type { CoinListing, MarketplaceFilters } from '@/types/marketplace';

const CoinCard = ({ coin, index, onQuickView }: { coin: CoinListing, index: number, onQuickView: (coin: CoinListing) => void }) => {
  const navigate = useNavigate();
  const { user } = useSupabaseAuth();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();
  const [addingToCart, setAddingToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    const coinIdStr = String(coin.id);
    if (isInWishlist(coinIdStr)) {
      removeFromWishlist(coinIdStr);
      toast({
        title: "Removed from wishlist",
        description: `${coin.title} has been removed from your wishlist`,
      });
    } else {
      addToWishlist({
        id: coinIdStr,
        title: coin.title,
        description: coin.description,
        value: coin.value,
        images: coin.images,
        seller_name: coin.seller_name
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

  // Enhanced metadata display
  const getConditionColor = (condition: string) => {
    switch (condition?.toLowerCase()) {
      case 'mint': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'fair': return 'text-yellow-600 bg-yellow-50';
      case 'poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
          onClick={toggleWishlist}
          className={`absolute top-3 left-3 p-2 rounded-full ${
            isInWishlist(String(coin.id)) 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-500 hover:text-red-500'
          } transition-colors shadow-md`}
        >
          <Heart className="h-4 w-4" fill={isInWishlist(String(coin.id)) ? "currentColor" : "none"} />
        </button>
        
        {/* Quick View Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(coin);
          }}
          className="absolute bottom-3 right-3 bg-royal text-white p-2 rounded-full shadow-lg hover:bg-royal-light transition-colors"
        >
          <Eye className="h-4 w-4" />
        </motion.button>
        
        {coin.stock_quantity === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold">OUT OF STOCK</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        {/* Enhanced Metadata Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-gold border-gold">{coin.region}</Badge>
            {coin.mint_date && (
              <div className="flex items-center text-xs text-gray-600">
                <Calendar className="h-3 w-3 mr-1" />
                {coin.mint_date}
              </div>
            )}
          </div>
          {coin.metal && (
            <div className="flex items-center text-xs text-gray-600">
              <span className="mr-1">•</span>
              {coin.metal}
            </div>
          )}
        </div>

        {/* Dynasty/Category */}
        {coin.dynasty && (
          <div className="flex items-center mb-2">
            <Crown className="h-3 w-3 mr-1 text-royal" />
            <span className="text-xs text-royal font-medium">{coin.dynasty}</span>
          </div>
        )}
        
        <h3 className="text-xl font-bold mb-2 text-royal group-hover:text-gold transition-colors">
          {coin.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {coin.description}
        </p>
        
        {/* Enhanced Metadata Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Rarity:</span>
            <span className="text-royal font-medium">{coin.rarity}</span>
          </div>
          {coin.condition && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Condition:</span>
              <span className={`px-1 rounded text-xs font-medium ${getConditionColor(coin.condition)}`}>
                {coin.condition}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Award className="h-4 w-4 mr-1 text-gold" />
            <span className="text-royal font-bold text-lg">₹{coin.value.toLocaleString()}</span>
          </div>
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

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isInitialized } = useSupabaseAuth();
  const { isSellerAllowed } = useSellerAccess();
  const { toast } = useToast();
  
  // State management
  const [coins, setCoins] = useState<CoinListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [showListModal, setShowListModal] = useState(false);
  const [quickViewCoin, setQuickViewCoin] = useState<CoinListing | null>(null);
  const [showQuickView, setShowQuickView] = useState(false);
  
  // Filters
  const [filters, setFilters] = useState<MarketplaceFilters>(() => {
    const minValue = searchParams.get('minValue');
    const maxValue = searchParams.get('maxValue');
    const minYear = searchParams.get('minYear');
    const maxYear = searchParams.get('maxYear');
    return {
      search: searchParams.get('search') || '',
      region: searchParams.get('region') || undefined,
      rarity: searchParams.get('rarity') || undefined,
      minValue: minValue !== null && minValue !== '' ? Number(minValue) : undefined,
      maxValue: maxValue !== null && maxValue !== '' ? Number(maxValue) : undefined,
      verified: searchParams.get('verified') === 'true' ? true : undefined,
      sortBy: searchParams.get('sortBy') || 'newest',
      year: searchParams.get('year') || undefined,
      minYear: minYear !== null && minYear !== '' ? Number(minYear) : undefined,
      maxYear: maxYear !== null && maxYear !== '' ? Number(maxYear) : undefined,
      metal: searchParams.get('metal') || undefined,
      condition: searchParams.get('condition') || undefined,
      dynasty: searchParams.get('dynasty') || undefined,
      category: searchParams.get('category') || undefined
    };
  });

  // Load coins from Supabase
  const loadCoins = async (pageNum: number = 1, resetList: boolean = true) => {
    try {
      setLoading(true);
      const result = await MarketplaceService.getCoinListings(filters, pageNum, 12);
      
      if (resetList) {
        setCoins(result.data);
        // Smooth scroll to filters section when results update
        setTimeout(() => {
          const filtersSection = document.getElementById('filters-section');
          if (filtersSection && pageNum === 1) {
            filtersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
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
    if (isInitialized) {
      loadCoins(1, true);
    }
  }, [filters, isInitialized]);

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
      minYear: typeof newFilters.minYear === 'string'
        ? (newFilters.minYear !== '' ? Number(newFilters.minYear) : undefined)
        : newFilters.minYear,
      maxYear: typeof newFilters.maxYear === 'string'
        ? (newFilters.maxYear !== '' ? Number(newFilters.maxYear) : undefined)
        : newFilters.maxYear,
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

  const handleQuickView = (coin: CoinListing) => {
    setQuickViewCoin(coin);
    setShowQuickView(true);
  };

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (['minValue', 'maxValue', 'minYear', 'maxYear'].includes(key)) {
      return typeof value === 'number' && !isNaN(value);
    }
    if (key === 'search' || key === 'sortBy') return false;
    return value !== undefined && value !== '' && value !== null;
  });

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
                {/* Only show seller buttons if user is allowed seller and authenticated */}
                {isInitialized && user && isSellerAllowed && (
                  <Button 
                    onClick={() => setShowListModal(true)} 
                    className="bg-royal hover:bg-royal-light text-white rounded-lg"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    List Your Coin
                  </Button>
                )}
                
                {(!user || !isSellerAllowed) && (
                  <Button 
                    onClick={() => navigate('/authenticate')} 
                    variant="outline"
                    className="border-royal text-royal hover:bg-blue-50"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign in to List
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Coins Section */}
        <FeaturedCoins />
        
        {/* Main Coins Listing */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold font-playfair text-royal">
                {totalCount > 0 ? `${totalCount} Professional Coins Found` : 'All Coins'}
              </h2>
              {hasActiveFilters && (
                <div className="text-sm text-gray-600">
                  Filtered results • <button 
                    onClick={clearFilters}
                    className="text-royal hover:underline"
                  >
                    View all coins
                  </button>
                </div>
              )}
            </div>

            {/* Compact Filter Presets Section */}
            <section className="py-3 bg-gray-50 rounded-lg mb-6">
              <div className="container mx-auto px-4">
                <FilterPresets 
                  onApplyPreset={handleFiltersChange}
                  currentFilters={filters}
                />
              </div>
            </section>

            {/* Professional Filters & Sorting Section - Prominently Displayed */}
            <section id="filters-section" className="py-8 bg-white border border-gray-200 rounded-lg shadow-lg mb-8">
              <div className="container mx-auto px-6">
                <div className="bg-gradient-to-r from-royal/5 to-gold/5 border border-royal/20 rounded-lg p-8 shadow-lg">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-semibold text-royal text-xl flex items-center">
                      <Filter className="h-6 w-6 mr-3" />
                      Professional Filters & Sorting
                    </h3>
                    {hasActiveFilters && (
                      <Button 
                        onClick={clearFilters}
                        variant="outline"
                        size="sm"
                        className="border-royal text-royal hover:bg-blue-50 rounded-lg"
                      >
                        Clear All Filters
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {/* Sort By */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Sort By</label>
                      <Select 
                        value={filters.sortBy || 'newest'} 
                        onValueChange={(value: string) => handleFiltersChange({ ...filters, sortBy: value })}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                          <SelectItem value="price_asc">Price: Low to High</SelectItem>
                          <SelectItem value="price_desc">Price: High to Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
                      <Select 
                        value={filters.category || 'all'} 
                        onValueChange={(value: string) => {
                          const newValue = value === 'all' ? undefined : value;
                          handleFiltersChange({ ...filters, category: newValue });
                        }}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="all">All Categories</SelectItem>
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

                    {/* Rarity */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Rarity</label>
                      <Select 
                        value={filters.rarity || 'all'} 
                        onValueChange={(value: string) => {
                          const newValue = value === 'all' ? undefined : value;
                          handleFiltersChange({ ...filters, rarity: newValue });
                        }}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="all">All Rarities</SelectItem>
                          <SelectItem value="Common">Common</SelectItem>
                          <SelectItem value="Uncommon">Uncommon</SelectItem>
                          <SelectItem value="Rare">Rare</SelectItem>
                          <SelectItem value="Very Rare">Very Rare</SelectItem>
                          <SelectItem value="Extremely Rare">Extremely Rare</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
                      <div className="flex space-x-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={filters.minValue !== undefined ? String(filters.minValue) : ''}
                          onChange={(e) => {
                            const value = e.target.value;
                            handleFiltersChange({ 
                              ...filters, 
                              minValue: value !== '' ? Number(value) : undefined 
                            });
                          }}
                          className="h-12"
                        />
                        <Input
                          type="number"
                          placeholder="Max"
                          value={filters.maxValue !== undefined ? String(filters.maxValue) : ''}
                          onChange={(e) => {
                            const value = e.target.value;
                            handleFiltersChange({ 
                              ...filters, 
                              maxValue: value !== '' ? Number(value) : undefined 
                            });
                          }}
                          className="h-12"
                        />
                      </div>
                    </div>

                    {/* Metal */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Metal</label>
                      <Select 
                        value={filters.metal || 'all'} 
                        onValueChange={(value: string) => {
                          const newValue = value === 'all' ? undefined : value;
                          handleFiltersChange({ ...filters, metal: newValue });
                        }}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="all">All Metals</SelectItem>
                          <SelectItem value="Gold">Gold</SelectItem>
                          <SelectItem value="Silver">Silver</SelectItem>
                          <SelectItem value="Copper">Copper</SelectItem>
                          <SelectItem value="Bronze">Bronze</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Verified Only Toggle */}
                    <div className="flex items-end">
                      <div className="flex items-center p-4 bg-royal/10 rounded-lg h-12">
                        <input
                          type="checkbox"
                          id="verified"
                          checked={filters.verified || false}
                          onChange={(e) => handleFiltersChange({ 
                            ...filters, 
                            verified: e.target.checked || undefined 
                          })}
                          className="rounded border-royal/30 text-royal focus:ring-royal/20 mr-2"
                        />
                        <label htmlFor="verified" className="text-sm text-gray-700 flex items-center">
                          <Shield className="h-4 w-4 mr-1 text-gold" />
                          Verified only
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Coin Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
              {loading && page === 1 ? (
                // Loading skeletons
                [...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))
              ) : coins.length === 0 ? (
                // No results
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-600">No coins found matching your criteria</p>
                </div>
              ) : (
                // Coin cards
                coins.map((coin) => (
                  <Card key={coin.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={coin.images[0] || 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80'}
                          alt={coin.title}
                          className="w-full h-48 object-cover"
                        />
                        {coin.verified && (
                          <Badge className="absolute top-2 right-2 bg-gold text-white">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{coin.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{coin.region}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-royal">₹{coin.value.toLocaleString()}</span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleQuickView(coin)}
                            className="border-royal text-royal hover:bg-blue-50 rounded-lg"
                          >
                            Quick View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Load More Button */}
            {hasMore && !loading && (
              <div className="text-center mt-8">
                <Button 
                  onClick={loadMore}
                  variant="outline"
                  className="border-royal text-royal hover:bg-blue-50 rounded-lg"
                >
                  Load More
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* List Coin Modal - only show if user is allowed seller */}
      {isInitialized && user && isSellerAllowed && (
        <ListCoinModal 
          open={showListModal} 
          onOpenChange={setShowListModal} 
        />
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        coin={quickViewCoin}
        open={showQuickView}
        onOpenChange={setShowQuickView}
      />
    </div>
  );
};

export default Marketplace;

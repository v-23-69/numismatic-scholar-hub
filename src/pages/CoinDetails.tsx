
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Shield, ShoppingCart, Star, ArrowLeft, ChevronLeft, ChevronRight, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from "@/components/ui/use-toast";
import { MarketplaceService } from '@/services/MarketplaceService';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import type { CoinListing } from '@/types/marketplace';
import ReviewsSection from '@/components/coin-details/ReviewsSection';
import PriceHistorySection from '@/components/coin-details/PriceHistorySection';
import RelatedProductsSection from '@/components/coin-details/RelatedProductsSection';

const CoinDetails = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const navigate = useNavigate();
  const { user } = useSupabaseAuth();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();
  
  const [coin, setCoin] = useState<CoinListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [buyingNow, setBuyingNow] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (coinId) {
      loadCoinDetails();
    }
  }, [coinId]);

  const loadCoinDetails = async () => {
    try {
      setLoading(true);
      const coinData = await MarketplaceService.getCoinListing(coinId!);
      setCoin(coinData);
    } catch (error) {
      console.error('Error loading coin details:', error);
      toast({
        title: "Error",
        description: "Failed to load coin details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = () => {
    if (!coin) return;
    
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

  const handleAddToCart = async () => {
    if (!coin || !user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add items to cart",
        variant: "destructive"
      });
      return;
    }

    try {
      setAddingToCart(true);
      await MarketplaceService.addToCart(user.id, String(coin.id), quantity);
      
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

  const handleBuyNow = async () => {
    if (!coin || !user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to make a purchase",
        variant: "destructive"
      });
      return;
    }

    try {
      setBuyingNow(true);
      await MarketplaceService.addToCart(user.id, String(coin.id), quantity);
      
      toast({
        title: "Proceeding to checkout",
        description: `${coin.title} has been added to your cart`,
        className: "bg-green-50 border-green-200 text-green-800"
      });
      
      // Redirect to checkout
      navigate('/checkout');
    } catch (error) {
      console.error('Error during buy now:', error);
      toast({
        title: "Error",
        description: "Failed to process purchase",
        variant: "destructive"
      });
    } finally {
      setBuyingNow(false);
    }
  };

  const nextImage = () => {
    if (!coin?.images.length) return;
    setCurrentImageIndex((prev) => (prev + 1) % coin.images.length);
  };

  const prevImage = () => {
    if (!coin?.images.length) return;
    setCurrentImageIndex((prev) => (prev - 1 + coin.images.length) % coin.images.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal mx-auto mb-4"></div>
            <p className="text-gray-600">Loading coin details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Coin Not Found</h2>
            <p className="text-gray-600 mb-8">The coin you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/coins-market')} className="bg-royal hover:bg-royal-light text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Marketplace
            </Button>
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
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <button 
              onClick={() => navigate('/coins-market')}
              className="hover:text-royal transition-colors"
            >
              Marketplace
            </button>
            <span>/</span>
            <span className="text-royal">{coin.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Image Carousel */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                {coin.images.length > 0 ? (
                  <>
                    <img 
                      src={coin.images[currentImageIndex]} 
                      alt={`${coin.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {coin.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image available
                  </div>
                )}
                
                {coin.verified && (
                  <div className="absolute top-4 right-4 bg-gold text-royal-dark text-xs font-bold px-3 py-1 rounded-full flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    VERIFIED
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {coin.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {coin.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        currentImageIndex === index ? 'border-royal' : 'border-gray-200'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${coin.title} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="outline" className="text-gold border-gold">
                    {coin.region}
                  </Badge>
                  <Badge variant="outline" className="text-royal border-royal">
                    {coin.rarity}
                  </Badge>
                </div>
                
                <h1 className="text-3xl font-bold text-royal font-playfair mb-2">
                  {coin.title}
                </h1>
                
                <p className="text-gray-600 mb-4">{coin.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Mint Date: <strong>{coin.mint_date}</strong></span>
                  <span>Stock: <strong>{coin.stock_quantity} available</strong></span>
                </div>
              </div>

              {/* Price */}
              <div className="border-t border-b py-6">
                <div className="text-3xl font-bold text-royal mb-2">
                  ₹{coin.value.toLocaleString()}
                </div>
                <p className="text-gray-600">Free shipping on orders over ₹5,000</p>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(coin.stock_quantity, quantity + 1))}
                      className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      disabled={quantity >= coin.stock_quantity}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    onClick={handleBuyNow}
                    disabled={buyingNow || coin.stock_quantity === 0}
                    className="w-full bg-gold hover:bg-gold/90 text-royal-dark h-12 font-semibold"
                  >
                    {buyingNow ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-royal-dark mr-2"></div>
                    ) : (
                      <CreditCard className="h-4 w-4 mr-2" />
                    )}
                    {coin.stock_quantity === 0 ? 'Out of Stock' : 'Buy Now'}
                  </Button>
                  
                  <Button 
                    onClick={handleAddToCart}
                    disabled={addingToCart || coin.stock_quantity === 0}
                    className="w-full bg-royal hover:bg-royal-light text-white h-12"
                  >
                    {addingToCart ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <ShoppingCart className="h-4 w-4 mr-2" />
                    )}
                    Add to Cart
                  </Button>
                  
                  <Button 
                    onClick={toggleWishlist}
                    variant="outline" 
                    className="w-full border-royal text-royal hover:bg-royal hover:text-white h-12"
                  >
                    <Heart 
                      className="h-4 w-4 mr-2" 
                      fill={isInWishlist(String(coin.id)) ? "currentColor" : "none"} 
                    />
                    {isInWishlist(String(coin.id)) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </Button>
                </div>
              </div>

              {/* Seller Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-royal mb-4">Seller Information</h3>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-royal rounded-full flex items-center justify-center text-white font-semibold">
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
                    <div>
                      <p className="font-medium text-gray-900">{coin.seller_name}</p>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(coin.seller_rating) 
                                ? 'text-gold fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">
                          {coin.seller_rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <ReviewsSection coinId={String(coin.id)} />
              <PriceHistorySection coinId={String(coin.id)} />
            </div>
            <div>
              <RelatedProductsSection 
                coinId={String(coin.id)} 
                dynasty={coin.dynasty} 
                ruler={coin.ruler} 
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoinDetails;

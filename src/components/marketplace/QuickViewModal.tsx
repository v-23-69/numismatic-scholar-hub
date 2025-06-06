
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  Heart, 
  ShoppingCart, 
  X, 
  Calendar, 
  Award, 
  Crown,
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from "@/hooks/use-toast";
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { MarketplaceService } from '@/services/MarketplaceService';
import type { CoinListing } from '@/types/marketplace';

interface QuickViewModalProps {
  coin: CoinListing | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuickViewModal = ({ coin, open, onOpenChange }: QuickViewModalProps) => {
  const navigate = useNavigate();
  const { user } = useSupabaseAuth();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();
  const [addingToCart, setAddingToCart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!coin) return null;

  const toggleWishlist = () => {
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

  const handleBuyNow = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to purchase items",
        variant: "destructive"
      });
      return;
    }

    try {
      await MarketplaceService.addToCart(user.id, coin.id, 1);
      navigate('/cart');
      onOpenChange(false);
    } catch (error) {
      console.error('Error adding to cart for buy now:', error);
      toast({
        title: "Error",
        description: "Failed to proceed with purchase",
        variant: "destructive"
      });
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition?.toLowerCase()) {
      case 'mint': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'fair': return 'text-yellow-600 bg-yellow-50';
      case 'poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === coin.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? coin.images.length - 1 : prev - 1
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 z-[100] bg-white border border-royal/20 shadow-2xl">
        <DialogTitle className="sr-only">Quick View: {coin.title}</DialogTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative bg-gray-50">
            <div className="relative h-96 md:h-full overflow-hidden">
              <img 
                src={coin.images[currentImageIndex] || coin.images[0] || 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80'} 
                alt={coin.title}
                className="w-full h-full object-cover"
              />
              
              {coin.verified && (
                <div className="absolute top-4 right-4 bg-gold text-royal-dark text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-lg">
                  <Shield className="h-3 w-3 mr-1" />
                  VERIFIED
                </div>
              )}

              {coin.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-royal p-2 rounded-full shadow-lg transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-royal p-2 rounded-full shadow-lg transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {coin.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-royal' : 'bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="outline" className="text-gold border-gold">{coin.region}</Badge>
                  {coin.mint_date && (
                    <div className="flex items-center text-xs text-gray-600">
                      <Calendar className="h-3 w-3 mr-1" />
                      {coin.mint_date}
                    </div>
                  )}
                </div>

                {coin.dynasty && (
                  <div className="flex items-center mb-2">
                    <Crown className="h-3 w-3 mr-1 text-royal" />
                    <span className="text-xs text-royal font-medium">{coin.dynasty}</span>
                  </div>
                )}

                <h2 className="text-2xl font-bold text-royal mb-2">{coin.title}</h2>
              </div>
              
              <button 
                onClick={() => onOpenChange(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-3">{coin.description}</p>

            {/* Enhanced Metadata Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Rarity:</span>
                  <span className="text-royal font-medium">{coin.rarity}</span>
                </div>
                {coin.condition && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Condition:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getConditionColor(coin.condition)}`}>
                      {coin.condition}
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                {coin.metal && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Metal:</span>
                    <span className="text-royal font-medium">{coin.metal}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Stock:</span>
                  <span className="text-royal font-medium">{coin.stock_quantity} available</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center mb-6">
              <Award className="h-5 w-5 mr-2 text-gold" />
              <span className="text-3xl font-bold text-royal">₹{coin.value.toLocaleString()}</span>
            </div>

            {/* Seller Info */}
            <Card className="mb-6 border-royal/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-royal rounded-full flex items-center justify-center text-white text-sm mr-3">
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
                      <p className="font-medium text-royal">{coin.seller_name}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < coin.seller_rating ? 'text-gold fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">({coin.seller_rating})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3 mt-auto">
              <div className="flex space-x-3">
                <Button 
                  onClick={handleBuyNow}
                  disabled={coin.stock_quantity === 0}
                  className="flex-1 bg-gold hover:bg-gold-light text-royal"
                  size="lg"
                >
                  {coin.stock_quantity === 0 ? 'Out of Stock' : 'Buy Now'}
                </Button>
                
                <Button 
                  onClick={handleAddToCart}
                  disabled={addingToCart || coin.stock_quantity === 0}
                  variant="outline"
                  size="lg"
                  className="flex-1 border-royal text-royal hover:bg-royal hover:text-white"
                >
                  {addingToCart ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-royal mr-2"></div>
                  ) : (
                    <ShoppingCart className="h-4 w-4 mr-2" />
                  )}
                  Add to Cart
                </Button>
                
                <Button 
                  onClick={toggleWishlist}
                  variant="outline"
                  size="lg"
                  className={`border-royal ${
                    isInWishlist(String(coin.id)) 
                      ? 'bg-red-50 text-red-600 border-red-200' 
                      : 'text-royal hover:bg-royal hover:text-white'
                  }`}
                >
                  <Heart className="h-4 w-4" fill={isInWishlist(String(coin.id)) ? "currentColor" : "none"} />
                </Button>
              </div>
              
              <Button 
                onClick={() => {
                  navigate(`/coins-market/${coin.id}`);
                  onOpenChange(false);
                }}
                variant="ghost"
                className="w-full text-royal hover:bg-royal/10"
              >
                View Full Details
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

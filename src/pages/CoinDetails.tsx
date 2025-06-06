
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Shield, ShoppingCart, Star, ArrowLeft, ChevronLeft, ChevronRight, CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from "@/hooks/use-toast";
import { MarketplaceService } from '@/services/MarketplaceService';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import type { CoinListing } from '@/types/marketplace';

const CoinDetails = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const navigate = useNavigate();
  const { user } = useSupabaseAuth();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();
  
  const [coin, setCoin] = useState<CoinListing | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [buyingNow, setBuyingNow] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (coinId) {
      loadCoinDetails();
      loadReviews();
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

  const loadReviews = async () => {
    try {
      const reviewsData = await MarketplaceService.getCoinReviews(coinId!);
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error loading reviews:', error);
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

  const handleSubmitReview = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add a review",
        variant: "destructive"
      });
      return;
    }

    if (newRating === 0 || !newComment.trim()) {
      toast({
        title: "Please complete your review",
        description: "Both rating and comment are required",
        variant: "destructive"
      });
      return;
    }

    try {
      setSubmittingReview(true);
      await MarketplaceService.submitReview(coinId!, user.id, newRating, newComment.trim());
      
      toast({
        title: "Review added",
        description: "Your review has been posted successfully",
        className: "bg-green-50 border-green-200 text-green-800"
      });

      setNewRating(0);
      setNewComment('');
      loadReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive"
      });
    } finally {
      setSubmittingReview(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRate?.(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star
              className={`h-4 w-4 ${
                star <= rating ? 'text-gold fill-current' : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
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
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                <img 
                  src={coin.images[currentImageIndex] || coin.images[0] || 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80'} 
                  alt={coin.title}
                  className="w-full h-full object-cover"
                />
                
                {coin.verified && (
                  <div className="absolute top-4 right-4 bg-gold text-royal-dark text-xs font-bold px-3 py-1 rounded-full flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    VERIFIED
                  </div>
                )}

                {coin.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev - 1 + coin.images.length) % coin.images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev + 1) % coin.images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
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
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-royal mb-6">Reviews ({reviews.length})</h3>
              
              {/* Add Review Form */}
              <div className="border-b pb-6 mb-6">
                <h4 className="font-semibold mb-4">Add Your Review</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    {renderStars(newRating, true, setNewRating)}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comment
                    </label>
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts about this coin..."
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button
                    onClick={handleSubmitReview}
                    disabled={submittingReview || newRating === 0 || !newComment.trim()}
                    className="bg-royal hover:bg-royal-light text-white"
                  >
                    {submittingReview ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : null}
                    Post Review
                  </Button>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No reviews yet. Be the first to review this coin!</p>
                  </div>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-royal rounded-full flex items-center justify-center text-white font-semibold">
                          {review.user?.full_name?.charAt(0) || 'A'}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">
                              {review.user?.full_name || 'Anonymous'}
                            </h4>
                            <span className="text-sm text-gray-500">
                              {new Date(review.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center mt-1 mb-2">
                            {renderStars(review.rating)}
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoinDetails;

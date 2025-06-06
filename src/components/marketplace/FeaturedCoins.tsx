
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Heart, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MarketplaceService } from '@/services/MarketplaceService';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useToast } from "@/hooks/use-toast";
import type { CoinListing } from '@/types/marketplace';

const FeaturedCoins = () => {
  const navigate = useNavigate();
  const { user } = useSupabaseAuth();
  const { toast } = useToast();
  const [featuredCoins, setFeaturedCoins] = useState<CoinListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedCoins();
  }, []);

  const loadFeaturedCoins = async () => {
    try {
      setLoading(true);
      // Get the first 4 verified coins as featured
      const { data } = await MarketplaceService.getCoinListings(
        { verified: true }, 
        1, 
        4
      );
      setFeaturedCoins(data);
    } catch (error) {
      console.error('Error loading featured coins:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (coinId: string, e: React.MouseEvent) => {
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
      await MarketplaceService.addToCart(user.id, coinId, 1);
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart",
        className: "bg-green-50 border-green-200 text-green-800"
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <section className="py-12 bg-gradient-to-r from-royal/5 via-gold/5 to-royal/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-playfair text-royal mb-4">
              Featured Coins
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our hand-picked selection of exceptional coins from verified sellers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                <div className="bg-white p-4 rounded-b-lg">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-r from-royal/5 via-gold/5 to-royal/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-playfair text-royal mb-4">
            Featured Coins
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of exceptional coins from verified sellers
          </p>
        </div>

        {featuredCoins.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No featured coins available at the moment.</p>
            <Button 
              onClick={() => navigate('/coins-market')}
              className="mt-4 bg-royal hover:bg-royal-light text-white"
            >
              Browse All Coins
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCoins.map((coin, index) => (
                <motion.div
                  key={coin.id}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group cursor-pointer overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-royal/30">
                    <div 
                      className="relative h-48 overflow-hidden"
                      onClick={() => navigate(`/coins-market/${coin.id}`)}
                    >
                      <img 
                        src={coin.images[0] || 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80'} 
                        alt={coin.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {coin.verified && (
                        <div className="absolute top-3 right-3 bg-gold text-royal-dark text-xs font-bold px-2 py-1 rounded flex items-center">
                          <Shield className="h-3 w-3 mr-1" />
                          VERIFIED
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-royal hover:bg-royal-light"
                            onClick={(e) => handleAddToCart(coin.id, e)}
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-gold border-gold text-xs">
                          {coin.region}
                        </Badge>
                        <Badge variant="outline" className="text-royal border-royal text-xs">
                          {coin.rarity}
                        </Badge>
                      </div>
                      
                      <h3 
                        className="font-semibold text-royal text-lg mb-2 line-clamp-2 cursor-pointer hover:text-gold transition-colors"
                        onClick={() => navigate(`/coins-market/${coin.id}`)}
                      >
                        {coin.title}
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-lg font-bold text-royal">
                            ₹{coin.value.toLocaleString()}
                          </span>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-royal hover:bg-royal-light text-white"
                          onClick={(e) => handleAddToCart(coin.id, e)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button 
                onClick={() => navigate('/coins-market')}
                className="bg-royal hover:bg-royal-light text-white px-8 py-3"
              >
                View All Coins
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedCoins;

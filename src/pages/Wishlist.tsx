import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from "@/components/ui/use-toast";
import type { WishlistItem } from '@/types/wishlist';

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleRemove = (id: number) => {
    removeFromWishlist(id);
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist",
    });
  };

  const handleAddToCart = (item: WishlistItem) => {
    // TODO: Implement add to cart functionality
    toast({
      title: "Added to cart",
      description: `${item.title} has been added to your cart`,
      className: "bg-green-50 border-green-200 text-green-800"
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/coins-market')}
              className="text-royal hover:text-royal-light"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Coins Market
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-royal font-playfair">My Wishlist</h1>
              <p className="text-lg text-gray-600">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="h-24 w-24 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-8">Save coins you love to your wishlist and come back to them later!</p>
              <Button 
                onClick={() => navigate('/coins-market')}
                className="bg-royal hover:bg-royal-light text-white px-8 py-3"
              >
                Return to Coins Market
              </Button>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <div className="h-48 overflow-hidden rounded-t-lg">
                          <img 
                            src={item.image || 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80'} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-royal text-lg mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                        
                        {item.value && (
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-lg font-bold text-royal">₹{Number(item.value).toLocaleString()}</span>
                            <span className="text-sm text-gray-500 capitalize">{item.type}</span>
                          </div>
                        )}
                        
                        <div className="flex space-x-2">
                          <Button 
                            onClick={() => handleAddToCart(item)}
                            className="flex-1 bg-royal hover:bg-royal-light text-white text-sm"
                          >
                            <ShoppingCart className="h-3 w-3 mr-1" />
                            Add to Cart
                          </Button>
                          <Button 
                            variant="outline"
                            className="flex-1 border-royal text-royal hover:bg-royal hover:text-white text-sm"
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Button 
                  onClick={() => navigate('/coins-market')}
                  variant="outline"
                  className="border-royal text-royal hover:bg-royal hover:text-white px-8 py-3"
                >
                  Return to Coins Market
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;

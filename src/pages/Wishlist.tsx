
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useWishlist } from '@/context/WishlistContext';
import { useState } from 'react';
import PaymentModal from '@/components/marketplace/PaymentModal';
import { useToast } from "@/components/ui/use-toast";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [selectedCoin, setSelectedCoin] = useState<any>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleBuyNow = (item: any) => {
    setSelectedCoin(item);
    setPaymentModalOpen(true);
  };
  
  const handlePurchaseSuccess = () => {
    // Remove purchased item from wishlist
    if (selectedCoin) {
      removeFromWishlist(selectedCoin.id);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-12 bg-gradient-to-b from-royal/5 to-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-8">
              <Heart className="h-6 w-6 text-royal mr-3" />
              <h1 className="text-3xl font-bold font-playfair text-royal">Your Wishlist</h1>
            </div>
            
            {wishlist.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gray-100 mb-4">
                  <Heart className="h-10 w-10 text-gray-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-700 mb-2">Your wishlist is empty</h2>
                <p className="text-gray-600 mb-6">Browse our collection and add items you'd like to save for later.</p>
                <Button 
                  className="bg-royal hover:bg-royal-light text-white"
                  onClick={() => navigate('/marketplace')}
                >
                  Explore Marketplace
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {wishlist.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2 text-royal">
                        {item.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-royal font-bold">₹{item.value}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          className="flex-1 bg-royal hover:bg-royal-light text-white"
                          onClick={() => handleBuyNow(item)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Buy Now
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-red-500 text-red-500 hover:bg-red-50"
                          onClick={() => {
                            removeFromWishlist(item.id);
                            toast({
                              title: "Item removed",
                              description: "Item has been removed from your wishlist",
                            });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Payment Modal */}
      {selectedCoin && (
        <PaymentModal
          open={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          coin={selectedCoin}
          onSuccess={handlePurchaseSuccess}
        />
      )}
    </div>
  );
};

export default Wishlist;

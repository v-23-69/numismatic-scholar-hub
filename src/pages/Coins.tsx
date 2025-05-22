
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useWishlist } from '@/context/WishlistContext';
import PaymentModal from '@/components/marketplace/PaymentModal';
import { useToast } from "@/components/ui/use-toast";
import { useContext } from 'react';
import { ConfigContext } from "@/App";

// Types for coin listings
interface CoinListing {
  id: number;
  title: string;
  description: string;
  mintDate: string;
  region: string;
  value: string;
  rarity: string;
  verified: boolean;
  image: string;
  seller: {
    name: string;
    rating: number;
    avatar?: string;
  };
}

// Sample coin data (in a real app, this would come from Supabase)
const sampleCoins: CoinListing[] = [
  {
    id: 1,
    title: "1854 Gold Double Eagle",
    description: "Rare Type 1 Liberty Head Double Eagle in excellent condition with minimal wear.",
    mintDate: "1854",
    region: "United States",
    value: "5,200",
    rarity: "Rare",
    verified: true,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80",
    seller: {
      name: "Golden Collectibles",
      rating: 4.9
    }
  },
  {
    id: 2,
    title: "Ancient Roman Denarius",
    description: "Silver denarius from Emperor Hadrian's reign, showing remarkable detail and patina.",
    mintDate: "117-138 CE",
    region: "Roman Empire",
    value: "850",
    rarity: "Uncommon",
    verified: true,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&auto=format&fit=crop&q=80",
    seller: {
      name: "Antiquity Experts",
      rating: 4.8
    }
  },
  {
    id: 3,
    title: "Mughal Empire Gold Mohur",
    description: "Beautifully preserved gold mohur from Akbar's reign with intact inscriptions.",
    mintDate: "1556-1605",
    region: "India",
    value: "3,100",
    rarity: "Very Rare",
    verified: false,
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc1b13a?w=600&auto=format&fit=crop&q=80",
    seller: {
      name: "Eastern Heritage",
      rating: 4.7
    }
  },
];

const CoinCard = ({ coin, index }: { coin: CoinListing, index: number }) => {
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const { toast } = useToast();
  
  const toggleWishlist = () => {
    if (isInWishlist(coin.id)) {
      removeFromWishlist(coin.id);
      toast({
        title: "Removed from wishlist",
        description: `${coin.title} has been removed from your wishlist`,
      });
    } else {
      addToWishlist({
        id: coin.id,
        title: coin.title,
        description: coin.description,
        image: coin.image,
        value: coin.value,
        type: 'coin'
      });
      toast({
        title: "Added to wishlist",
        description: `${coin.title} has been added to your wishlist`,
      });
    }
  };
  
  const handleBuyNow = () => {
    setIsPaymentModalOpen(true);
  };
  
  const handlePaymentSuccess = () => {
    // If item was in wishlist, remove it as it's now purchased
    if (isInWishlist(coin.id)) {
      removeFromWishlist(coin.id);
    }
    
    // Close the payment modal
    setIsPaymentModalOpen(false);
  };
  
  return (
    <>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="royal-card overflow-hidden group"
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={coin.image} 
            alt={coin.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {coin.verified && (
            <div className="absolute top-3 right-3 bg-gold text-royal-dark text-xs font-bold px-2 py-1 rounded flex items-center">
              <span className="h-3 w-3 mr-1">✓</span>
              VERIFIED
            </div>
          )}
          <button 
            onClick={toggleWishlist}
            className={`absolute top-3 left-3 p-2 rounded-full ${
              isInWishlist(coin.id) 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-500 hover:text-red-500'
            } transition-colors shadow-md`}
          >
            <Heart className="h-4 w-4" fill={isInWishlist(coin.id) ? "currentColor" : "none"} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gold">{coin.region}</span>
            <span className="text-sm text-gray-600">{coin.mintDate}</span>
          </div>
          
          <h3 className="text-xl font-bold mb-2 text-royal group-hover:text-gold transition-colors">
            {coin.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {coin.description}
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Rarity: <span className="text-royal">{coin.rarity}</span></span>
            <span className="text-royal font-bold">₹{coin.value}</span>
          </div>
          
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-royal rounded-full flex items-center justify-center text-white text-xs mr-2">
                {coin.seller.name.charAt(0)}
              </div>
              <span className="text-sm text-gray-700">{coin.seller.name}</span>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={handleBuyNow}
                className="text-white bg-royal hover:bg-royal-light text-sm"
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Payment Modal */}
      <PaymentModal
        open={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        coin={coin}
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
};

const Coins = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { supabaseClient } = useContext(ConfigContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  React.useEffect(() => {
    const checkAuthStatus = async () => {
      if (supabaseClient) {
        const { data } = await supabaseClient.auth.getSession();
        setIsAuthenticated(!!data.session);
      }
    };
    
    checkAuthStatus();
  }, [supabaseClient]);

  // Filter coins based on search query
  const filteredCoins = sampleCoins.filter(coin => 
    coin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.mintDate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-royal/10 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-playfair text-royal mb-4">
                Coin Collection
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Discover authenticated coins from trusted sellers or list your own collection for our community of passionate collectors.
              </p>
              
              <div className="relative max-w-xl mx-auto">
                <Input
                  type="text"
                  placeholder="Search for coins by name, region, or date..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="flex flex-wrap justify-center mt-6 space-x-0 space-y-2 sm:space-x-4 sm:space-y-0">
                {!isAuthenticated ? (
                  <Link to="/authenticate">
                    <Button className="bg-royal hover:bg-royal-light text-white">
                      Sign In to List Coins
                    </Button>
                  </Link>
                ) : (
                  <Button className="bg-gold hover:bg-gold-light text-royal">
                    List Your Coin
                  </Button>
                )}
                
                <Link to="/marketplace">
                  <Button variant="outline" className="border-royal text-royal hover:bg-royal hover:text-white">
                    Verification Services
                  </Button>
                </Link>
                
                <Link to="/wishlist">
                  <Button variant="outline" className="border-royal text-royal hover:bg-royal hover:text-white">
                    <Heart className="h-4 w-4 mr-2" />
                    View Wishlist
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold font-playfair text-royal">
                Featured Coins
              </h2>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>
            
            {filteredCoins.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCoins.map((coin, index) => (
                  <CoinCard key={coin.id} coin={coin} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-bold text-gray-700 mb-2">No coins found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Coins;

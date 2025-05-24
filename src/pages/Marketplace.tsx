import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, Upload, Shield, ArrowUpDown, Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useWishlist } from '@/context/WishlistContext';
import PaymentModal from '@/components/marketplace/PaymentModal';
import { useToast } from "@/components/ui/use-toast";

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
              <Shield className="h-3 w-3 mr-1" />
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

const CoinUploadForm = () => {
  // Form state (in a real app, would be managed by React Hook Form or similar)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mintDate, setMintDate] = useState('');
  const [region, setRegion] = useState('');
  const [value, setValue] = useState('');
  const [rarity, setRarity] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would submit to Supabase in a real implementation
    console.log('Coin submitted:', { title, description, mintDate, region, value, rarity, image });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Coin Name</label>
          <Input 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter coin title"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="mintDate" className="block text-sm font-medium text-gray-700">Mint Date</label>
          <Input 
            id="mintDate" 
            value={mintDate} 
            onChange={(e) => setMintDate(e.target.value)} 
            placeholder="e.g., 1885 or 3rd century BCE"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="region" className="block text-sm font-medium text-gray-700">Region/Country</label>
          <Input 
            id="region" 
            value={region} 
            onChange={(e) => setRegion(e.target.value)} 
            placeholder="e.g., United States, Roman Empire"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="rarity" className="block text-sm font-medium text-gray-700">Rarity</label>
          <select 
            id="rarity" 
            value={rarity} 
            onChange={(e) => setRarity(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          >
            <option value="">Select rarity</option>
            <option value="Common">Common</option>
            <option value="Uncommon">Uncommon</option>
            <option value="Rare">Rare</option>
            <option value="Very Rare">Very Rare</option>
            <option value="Extremely Rare">Extremely Rare</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="value" className="block text-sm font-medium text-gray-700">Estimated Value (₹)</label>
          <Input 
            id="value" 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            placeholder="Enter estimated value"
            required
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Describe your coin's history, condition, and notable features"
            required
          ></textarea>
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Coin Images</label>
          <Input 
            id="image" 
            type="file"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="cursor-pointer"
            accept="image/*"
            multiple
            required
          />
          <p className="text-xs text-gray-500">Upload clear images of both sides of your coin. Maximum 5MB per image.</p>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" className="bg-royal hover:bg-royal-light text-white">
          Submit Coin Listing
        </Button>
      </div>
    </form>
  );
};

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // In a real app, this would come from auth state

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
                Numismatic Marketplace
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
                {isAuthenticated ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gold hover:bg-gold-light text-royal">
                        <Plus className="h-4 w-4 mr-2" />
                        List Your Coin
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>List Your Coin</DialogTitle>
                        <DialogDescription>
                          Fill in the details about your coin to create a new listing.
                        </DialogDescription>
                      </DialogHeader>
                      <CoinUploadForm />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Link to="/authenticate">
                    <Button className="bg-royal hover:bg-royal-light text-white">
                      Sign In to List Coins
                    </Button>
                  </Link>
                )}
                
                <Button variant="outline" className="border-royal text-royal hover:bg-royal hover:text-white">
                  <Shield className="h-4 w-4 mr-2" />
                  Verification Services
                </Button>
                
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

import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, Upload, Shield, ArrowUpDown, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ConfigContext } from "@/App";
import EnhancedSearchBar from '@/components/search/EnhancedSearchBar';

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
  const { supabaseClient } = useContext(ConfigContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
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
                Verification Services
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Get your coins authenticated by our experts or list your own collection for verification.
              </p>
              
              <div className="relative max-w-xl mx-auto">
                <EnhancedSearchBar
                  expanded={true}
                  placeholder="Search for verification services..."
                />
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
                      {/* <CoinUploadForm /> */}
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
                
                <Link to="/coins">
                  <Button variant="outline" className="border-royal text-royal hover:bg-royal hover:text-white">
                    <Heart className="h-4 w-4 mr-2" />
                    View All Coins
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* The rest of your Marketplace page content */}
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

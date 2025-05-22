
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import EnhancedSearchBar from '@/components/search/EnhancedSearchBar';
import { getBestMatchRoute } from '@/services/SearchService';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = () => {
    if (searchQuery.trim()) {
      const bestMatchRoute = getBestMatchRoute(searchQuery);
      if (bestMatchRoute) {
        navigate(bestMatchRoute);
      }
    }
  };
  
  return (
    <section className="relative bg-gradient-to-b from-royal/10 to-white py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold font-playfair text-royal leading-tight mb-4">
                Master the Art of<br />
                <span className="text-gold">Numismatics</span> Today
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                Learn from expert numismatists, authenticate your coins, and connect with fellow collectors in the world's premier numismatic education platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <EnhancedSearchBar
                  expanded={true}
                  className="flex-grow w-full sm:max-w-md mb-4 sm:mb-0"
                />
                
                <Button 
                  className="bg-royal hover:bg-blue-600 text-white"
                  onClick={handleSearch}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
              
              <div className="mt-6 flex items-center">
                <div className="flex -space-x-2 mr-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden">
                      <span className="text-xs font-semibold text-gray-600">{i}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">4,200+</span> students already learning
                </p>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2 lg:pl-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1621847468516-1ed3aae69312?w=800&auto=format&fit=crop&q=60"
                  alt="Ancient coins collection" 
                  className="w-full h-auto"
                />
              </div>
              
              <div className="absolute -bottom-5 -right-5 md:-right-10 bg-white p-4 rounded-lg shadow-lg max-w-xs">
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-royal text-2xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-royal">Expert Verification</h3>
                    <p className="text-sm text-gray-600">Get your coins authenticated by experts</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

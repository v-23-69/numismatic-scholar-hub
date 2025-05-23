
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
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex justify-center items-center mb-6">
            <div className="h-16 w-16 bg-royal rounded-full flex items-center justify-center">
              <span className="text-gold text-2xl font-bold">NS</span>
            </div>
            <div className="bg-gold text-xs text-royal-dark font-bold px-3 py-1 rounded-full -ml-4 mt-8">
              TRUSTED
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold font-playfair text-royal leading-tight mb-4">
            The Trusted Home of<br />
            <span className="text-gold">Coin Knowledge</span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Join our premium community where collectors, historians, and enthusiasts
            unite to learn, trade, and celebrate the art and history of numismatics.
          </p>
          
          <div className="max-w-xl mx-auto mb-8">
            <EnhancedSearchBar
              expanded={true}
              className="w-full"
              placeholder="Search courses, coins, or mentors..."
            />
          </div>
          
          <div className="flex justify-center items-center gap-6 mt-6">
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-gold mr-2"></span>
              <p className="text-sm text-gray-600">1,000+ Coins Verified</p>
            </div>
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-royal mr-2"></span>
              <p className="text-sm text-gray-600">Expert-Led Courses</p>
            </div>
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-gold mr-2"></span>
              <p className="text-sm text-gray-600">Trusted Community</p>
            </div>
          </div>
          
          <div className="flex justify-center mt-10 gap-4">
            <Button 
              className="bg-royal hover:bg-blue-600 text-white px-8"
              asChild
            >
              <a href="/courses">Explore Courses</a>
            </Button>
            <Button 
              variant="outline"
              className="border-royal text-royal hover:bg-royal hover:text-white"
              asChild
            >
              <a href="/marketplace">Visit Marketplace</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

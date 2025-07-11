import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import SearchDropdown from '@/components/search/SearchDropdown';

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-royal/5 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-gold/5"></div>
        <div className="absolute left-1/4 top-1/3 w-32 h-32 rounded-full bg-royal/5"></div>
        <div className="absolute right-1/3 bottom-1/4 w-48 h-48 rounded-full bg-gold/5"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Royal Badge Logo */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative inline-block mb-6"
          >
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 bg-royal rounded-full flex items-center justify-center">
                <span className="text-gold font-bold text-3xl">NS</span>
              </div>
              <div className="bg-gold text-xs text-royal px-3 py-1 rounded-full font-bold mt-1">
                TRUSTED
              </div>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-royal font-playfair mb-4"
          >
            The Trusted Home of<br />
            <span className="text-gold">Coin Knowledge</span>
          </motion.h1>
          
          {/* Subheading */}
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl"
          >
            Join our premium community where collectors, historians, and enthusiasts 
            unite to learn, trade, and celebrate the art and history of numismatics.
          </motion.p>
          
          {/* Enhanced Search Bar */}
          <motion.div 
            initial={{ y: 20, opacity: 0, width: "80%" }}
            animate={{ y: 0, opacity: 1, width: "100%" }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="relative w-full max-w-2xl mb-8"
          >
            <SearchDropdown 
              expanded={true}
              placeholder="Search for courses, coins, or mentors..."
            />
          </motion.div>
          
          {/* Feature Badges */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <div className="py-1 px-3 bg-white border border-gold/20 rounded-full text-sm text-gray-600 shadow-sm flex items-center">
              <span className="h-2 w-2 bg-gold rounded-full mr-2"></span>
              1,000+ Coins Verified
            </div>
            <div className="py-1 px-3 bg-white border border-gold/20 rounded-full text-sm text-gray-600 shadow-sm flex items-center">
              <span className="h-2 w-2 bg-royal rounded-full mr-2"></span>
              Expert-Led Courses
            </div>
            <div className="py-1 px-3 bg-white border border-gold/20 rounded-full text-sm text-gray-600 shadow-sm flex items-center">
              <span className="h-2 w-2 bg-gold rounded-full mr-2"></span>
              Trusted Community
            </div>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/courses">
              <Button className="bg-royal hover:bg-royal-light text-white px-8 py-6 text-lg">
                Explore Courses
              </Button>
            </Link>
            <Link to="/coins-market">
              <Button variant="outline" className="border-royal text-royal hover:bg-royal hover:text-white px-8 py-6 text-lg">
                Visit Coins Market
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 
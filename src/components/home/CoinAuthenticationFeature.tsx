import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Shield, Check, Clock, Coins } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

const CoinAuthenticationFeature = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-royal/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-royal/10 text-royal px-3 py-1 rounded-full text-sm font-medium mb-4">
              NEW FEATURE
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-royal font-playfair mb-6">
              Expert Coin Authentication at Your Fingertips
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Uncertain about a coin's authenticity or value? Our team of expert numismatists is ready to help. 
              Upload photos of your coins and receive professional verification within 24 hours.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="h-6 w-6 bg-gold rounded-full flex items-center justify-center mt-0.5 mr-3">
                  <Check className="h-4 w-4 text-royal" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Verified by Experts</h3>
                  <p className="text-gray-600">
                    Every coin is analyzed by certified numismatists with decades of experience.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-6 w-6 bg-gold rounded-full flex items-center justify-center mt-0.5 mr-3">
                  <Check className="h-4 w-4 text-royal" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Results in 24 Hours</h3>
                  <p className="text-gray-600">
                    Receive comprehensive analysis of your coin within 24 hours of submission.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-6 w-6 bg-gold rounded-full flex items-center justify-center mt-0.5 mr-3">
                  <Check className="h-4 w-4 text-royal" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Complete Assessment</h3>
                  <p className="text-gray-600">
                    Get details on authenticity, era, material, rarity, and current market value.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/verify-coins">
                <Button className="bg-gold hover:bg-gold-light text-royal">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Coin for ₹20
                </Button>
              </Link>
              
              <Link to="/courses">
                <Button variant="outline" className="border-royal text-royal hover:bg-royal hover:text-white">
                  <Shield className="h-4 w-4 mr-2" />
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div 
              className="royal-card overflow-hidden transition-all duration-300"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-royal rounded-full flex items-center justify-center text-white mr-4">
                      <Shield className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-royal">Coin Authentication</h3>
                      <p className="text-sm text-gray-600">Expert verification service</p>
                    </div>
                  </div>
                  <div className="bg-gold/10 text-gold-dark px-2 py-1 rounded text-xs font-bold border border-gold/20">
                    1000+ VERIFIED
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="relative overflow-hidden rounded-lg mb-6 border-2 border-gold">
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent ${isHovered ? 'animate-shine' : ''}`}></div>
                    <img 
                      src="https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&auto=format&fit=crop&q=80" 
                      alt="Coin authentication process" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-3 bg-royal/80 rounded-full">
                        <Upload className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1 text-sm">
                      <Clock className="h-4 w-4 text-gold" />
                      <span className="text-gray-600">24-hour turnaround</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm">
                      <Coins className="h-4 w-4 text-gold" />
                      <span className="text-gray-600">All coin types accepted</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Authentication</span>
                    <span className="font-medium text-royal">Included</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Era & Origin</span>
                    <span className="font-medium text-royal">Included</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Material Analysis</span>
                    <span className="font-medium text-royal">Included</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Market Value</span>
                    <span className="font-medium text-royal">Included</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Rarity Assessment</span>
                    <span className="font-medium text-royal">Included</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-royal p-4 flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Service fee</p>
                  <p className="text-white font-bold text-2xl">₹20</p>
                </div>
                <Link to="/verify-coins">
                  <Button className="bg-gold hover:bg-gold-light text-royal">
                    Get Started Now
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-royal text-white text-sm font-bold p-2 rounded shadow-lg">
              TRUSTED SERVICE
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CoinAuthenticationFeature;

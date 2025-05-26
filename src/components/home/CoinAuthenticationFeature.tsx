
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Shield, Clock, Award, Camera } from 'lucide-react';

const CoinAuthenticationFeature = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-royal/5 to-gold/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-royal/10 rounded-full mb-6">
              <Shield className="h-5 w-5 text-royal mr-2" />
              <span className="text-royal font-medium">Expert Verification</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-royal font-playfair mb-6">
              Expert Coin Authentication at Your Fingertips
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              Get professional authentication and grading for your coins from our network of certified numismatic experts. Upload photos and receive detailed reports within 24 hours.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <Clock className="h-6 w-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-royal">24-Hour Turnaround</h4>
                  <p className="text-gray-600">Quick and reliable authentication process</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Award className="h-6 w-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-royal">Certified Experts</h4>
                  <p className="text-gray-600">Professional numismatists with years of experience</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Camera className="h-6 w-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-royal">Simple Upload Process</h4>
                  <p className="text-gray-600">Just take photos and let our experts handle the rest</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/verify-coins">
                <Button className="bg-royal hover:bg-royal-light text-white px-8 py-6 text-lg">
                  Get Started Now
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" className="border-royal text-royal hover:bg-royal hover:text-white px-8 py-6 text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Content - Demo Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gold/20">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-2xl font-bold text-royal mb-2">Coin Verification</h3>
                <p className="text-gray-600">Professional authentication service</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Authentication</span>
                  <span className="text-green-600 font-bold">✓ Verified</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Est. Value</span>
                  <span className="font-bold text-gold">₹2,500 - ₹3,200</span>
                </div>
              </div>

              <Link to="/verify-coins">
                <Button className="w-full bg-gold hover:bg-gold/80 text-royal font-bold py-4 text-lg">
                  Upload Coin for ₹20
                </Button>
              </Link>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gold/20 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-royal/20 rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CoinAuthenticationFeature;

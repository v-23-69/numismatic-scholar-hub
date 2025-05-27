import { Award, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const AuthenticationFeature = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    // Scroll to top first
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Navigate to about page with hash
    navigate('/about#authentication');
  };

  const handleGetStarted = () => {
    // Scroll to top first
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Navigate to verify coins page
    navigate('/verify-coins');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-royal/5 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center bg-gold/10 px-4 py-2 rounded-full">
              <Award className="text-gold mr-2" size={20} />
              <span className="text-gold font-medium">Expert Coin Authentication</span>
            </div>
            
            <h2 className="text-4xl font-bold text-royal font-playfair leading-tight">
              Get Your Coins Authenticated by Certified Experts
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Our team of certified numismatists provides comprehensive coin authentication services. 
              From rare collectibles to historical pieces, we ensure accurate assessment of authenticity, 
              condition, and market value using industry-standard techniques.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-600 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-royal">Expert Analysis</h4>
                  <p className="text-gray-600 text-sm">Detailed examination by certified professionals</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-600 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-royal">Instant Reports</h4>
                  <p className="text-gray-600 text-sm">Get comprehensive authentication reports</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-600 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-royal">Market Valuation</h4>
                  <p className="text-gray-600 text-sm">Current market price and future projections</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-600 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-royal">Certificate Provided</h4>
                  <p className="text-gray-600 text-sm">Official authentication certificates</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                onClick={handleGetStarted}
                className="bg-royal hover:bg-royal/90 text-white px-6 py-3"
                size="lg"
              >
                Get Started Now
              </Button>
              <Button 
                onClick={handleLearnMore}
                variant="outline" 
                className="border-royal text-royal hover:bg-royal hover:text-white px-6 py-3"
                size="lg"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 transform rotate-1">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <img 
                  src="/placeholder.svg" 
                  alt="Coin Authentication Process" 
                  className="rounded-lg shadow-md"
                />
                <img 
                  src="/placeholder.svg" 
                  alt="Expert Analysis" 
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-royal mb-2">Professional Authentication</h4>
                <p className="text-gray-600 text-sm">Trusted by collectors worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthenticationFeature;

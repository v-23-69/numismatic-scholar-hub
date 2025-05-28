
import { motion } from 'framer-motion';
import { Shield, Clock, Award, Upload, Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

const AuthenticationStep = ({ 
  number, 
  title, 
  description,
  delay 
}: { 
  number: string; 
  title: string; 
  description: string;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex flex-col items-center text-center space-y-3"
    >
      <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-royal font-bold">
        {number}
      </div>
      <h3 className="text-xl font-bold font-playfair text-royal">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const TrustIndicator = ({ 
  icon: Icon, 
  text, 
  delay 
}: { 
  icon: React.ElementType; 
  text: string; 
  delay: number;
}) => {
  return (
    <motion.div 
      initial={{ y: 10, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className="flex items-center gap-2"
    >
      <div className="text-gold">
        <Icon size={20} />
      </div>
      <span className="text-sm font-medium">{text}</span>
    </motion.div>
  );
};

const AuthenticationFeature = () => {
  const navigate = useNavigate();

  const handleLearnMoreClick = (section: string) => {
    navigate('/about', { replace: false });
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleGetStartedClick = () => {
    navigate('/verify-coins');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gold/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-royal font-playfair mb-4">
            Expert Coin Authentication
          </h2>
          <p className="text-lg text-gray-600">
            Get your coins authenticated by our expert numismatists. Upload a photo and receive 
            professional analysis of its authenticity, era, material, rarity, and market value.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden border-gold/20">
              <CardContent className="p-0">
                <div className="bg-royal p-8 text-white">
                  <h3 className="text-2xl font-bold font-playfair mb-4">Upload Your Coin</h3>
                  <p className="mb-6 text-white/90">
                    Our experts analyze your coin photos to provide detailed authentication and valuation.
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <TrustIndicator icon={Shield} text="Verified by Experts" delay={0.1} />
                    <TrustIndicator icon={Clock} text="Results in 24 Hours" delay={0.2} />
                    <TrustIndicator icon={Award} text="1000+ Coins Authenticated" delay={0.3} />
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      onClick={handleGetStartedClick}
                      className="bg-gold hover:bg-gold-light text-royal gap-2 font-medium"
                    >
                      <Upload size={18} /> Upload Coin for ₹20
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-white text-white hover:bg-white/10"
                      onClick={() => handleLearnMoreClick('authentication')}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="font-medium text-royal mb-3">What you'll receive:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="text-gold mt-1">•</div>
                      <span className="text-gray-600">Authenticity verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="text-gold mt-1">•</div>
                      <span className="text-gray-600">Era and origin information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="text-gold mt-1">•</div>
                      <span className="text-gray-600">Material composition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="text-gold mt-1">•</div>
                      <span className="text-gray-600">Rarity assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="text-gold mt-1">•</div>
                      <span className="text-gray-600">Current market valuation</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-12"
          >
            <h3 className="text-2xl font-bold text-royal font-playfair text-center lg:text-left">How It Works</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AuthenticationStep 
                number="1" 
                title="Upload Photos" 
                description="Take clear photos of both sides of your coin and upload them."
                delay={0.1}
              />
              <AuthenticationStep 
                number="2" 
                title="Pay Fee" 
                description="Complete a secure payment of just ₹20 per coin."
                delay={0.2}
              />
              <AuthenticationStep 
                number="3" 
                title="Get Results" 
                description="Receive your expert analysis within 24 hours."
                delay={0.3}
              />
            </div>

            <div className="bg-royal/5 p-6 rounded-lg border border-royal/10">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-gold/20 p-3 text-gold">
                  <Camera size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-royal mb-2">Tips for Better Results</h4>
                  <p className="text-gray-600 mb-4">
                    Take photos in good lighting, without glare. Include both sides of the coin and 
                    any distinctive marks. Higher resolution images lead to more accurate analysis.
                  </p>
                  <Button 
                    variant="ghost" 
                    className="text-gold font-medium hover:underline p-0 h-auto"
                    onClick={() => handleLearnMoreClick('authentication')}
                  >
                    View Photography Guide
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <Button 
            onClick={handleGetStartedClick}
            className="bg-royal hover:bg-royal-light text-white px-8 py-6 text-lg"
          >
            Authenticate Your Coin Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AuthenticationFeature;

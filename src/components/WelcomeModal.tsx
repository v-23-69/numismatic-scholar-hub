
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen the welcome modal before
    const hasSeenWelcome = localStorage.getItem('coinglobe-welcome-seen');
    
    if (!hasSeenWelcome) {
      // Show modal after a short delay to ensure page is loaded
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('coinglobe-welcome-seen', 'true');
  };

  const handleGetStarted = () => {
    handleClose();
    // Scroll to featured sections
    setTimeout(() => {
      const featuredSection = document.getElementById('featured-sections');
      if (featuredSection) {
        featuredSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto bg-white border border-royal/20 shadow-2xl z-[100]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-playfair text-royal text-center mb-2">
            Welcome to CoinGlobe!
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Discover authentic coins, get expert verification, and connect with fellow numismatists worldwide.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🏛️</span>
            </div>
            <h3 className="font-semibold text-royal mb-2">Your Numismatic Journey Starts Here</h3>
            <p className="text-sm text-gray-600">
              Explore rare coins, get professional authentication, and build your collection with confidence.
            </p>
          </div>
          
          <div className="flex space-x-3 mt-6">
            <Button 
              onClick={handleGetStarted}
              className="flex-1 bg-royal hover:bg-royal-light text-white"
            >
              Get Started
            </Button>
            <Button 
              onClick={handleClose}
              variant="outline"
              className="flex-1 border-royal text-royal hover:bg-royal hover:text-white"
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;

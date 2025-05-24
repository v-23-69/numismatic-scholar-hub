<<<<<<< HEAD
=======

>>>>>>> 813d0fd0065b6f839cbd5b9921e4616d9d2a780c
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if modal has been shown before
    const hasModalBeenShown = localStorage.getItem('welcomeModalShown');
    
    if (!hasModalBeenShown) {
      // Show modal after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Set flag in localStorage
        localStorage.setItem('welcomeModalShown', 'true');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Reset localStorage for testing (remove in production)
  const resetModal = () => {
    localStorage.removeItem('welcomeModalShown');
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair text-royal">Welcome to NumismaticScholar!</DialogTitle>
          <DialogDescription>
            Your trusted platform for coin authentication, education, and community.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="bg-royal/5 p-4 rounded-lg mb-4">
            <h3 className="font-bold text-royal mb-2">🔍 New: Professional Coin Verification</h3>
            <p className="text-sm text-gray-600">
              Get your coins verified by our numismatic experts for just ₹20 per coin.
              Receive a detailed authenticity report within 24 hours!
            </p>
          </div>
          
          <div className="bg-royal/5 p-4 rounded-lg">
            <h3 className="font-bold text-royal mb-2">👨‍🏫 Expert-Led Numismatic Courses</h3>
            <p className="text-sm text-gray-600">
              Learn coin grading, authentication, and history from top experts.
              New courses added monthly!
            </p>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(false)}
          >
            Remind me later
          </Button>
          
          <Button
            onClick={() => window.location.href = '/marketplace'}
          >
            Verify My Coins
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;

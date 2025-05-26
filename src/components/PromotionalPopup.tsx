
import { useState, useEffect } from 'react';
import { X, BookOpen, Shield, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PopupOffer {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  action: () => void;
}

const PromotionalPopup = () => {
  const [currentPopup, setCurrentPopup] = useState<PopupOffer | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const offers: PopupOffer[] = [
    {
      id: 'course-offer',
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      title: '📚 25% OFF on Rare Coin Courses',
      description: 'Today Only! Learn from expert numismatists',
      buttonText: 'Explore Courses',
      action: () => window.location.href = '/courses'
    },
    {
      id: 'verification-offer',
      icon: <Shield className="h-6 w-6 text-royal" />,
      title: '💰 ₹20 Coin Authentication',
      description: 'Quick & Reliable expert verification',
      buttonText: 'Verify Now',
      action: () => window.location.href = '/verify-coins'
    },
    {
      id: 'agent-support',
      icon: <Headphones className="h-6 w-6 text-green-600" />,
      title: '🆕 Live Agent Support Available',
      description: 'Get instant help from our coin experts',
      buttonText: 'Get Support',
      action: () => window.location.href = '/agent-support'
    }
  ];

  useEffect(() => {
    const showRandomPopup = () => {
      const randomOffer = offers[Math.floor(Math.random() * offers.length)];
      setCurrentPopup(randomOffer);
      setShowPopup(true);
      
      // Auto-close after 6 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 6000);
    };

    // Show popup after 3 seconds on page load
    const initialTimer = setTimeout(showRandomPopup, 3000);

    // Show popup every 45 seconds
    const intervalTimer = setInterval(showRandomPopup, 45000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  if (!showPopup || !currentPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 max-w-sm w-full pointer-events-auto animate-scale-in">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              {currentPopup.icon}
              <div>
                <h3 className="font-bold text-lg text-gray-900">{currentPopup.title}</h3>
                <p className="text-gray-600 text-sm">{currentPopup.description}</p>
              </div>
            </div>
            <button
              onClick={closePopup}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex space-x-2">
            <Button
              onClick={currentPopup.action}
              className="flex-1 bg-royal hover:bg-blue-600 text-white font-medium"
            >
              {currentPopup.buttonText}
            </Button>
            <Button
              onClick={closePopup}
              variant="outline"
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalPopup;

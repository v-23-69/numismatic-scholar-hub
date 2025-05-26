
import { useState } from 'react';
import { Plus, X, Coins, BookOpen, Shield, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actionItems = [
    {
      icon: Coins,
      title: "Sell Coins",
      description: "List your coins for sale",
      href: "/coins-market",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: BookOpen,
      title: "Sell Courses",
      description: "Create educational content",
      href: "/courses",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: Shield,
      title: "₹20 Coin Verification",
      description: "Get expert authentication",
      href: "/verify-coins",
      color: "bg-gold hover:bg-gold/80"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            className="h-14 w-14 rounded-full bg-royal hover:bg-royal-light text-white shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => setIsOpen(true)}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-royal">Quick Actions</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {actionItems.map((item, index) => (
              <Link 
                key={index}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="block"
              >
                <div className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-royal hover:bg-royal/5 transition-all duration-200 cursor-pointer">
                  <div className={`p-3 rounded-full ${item.color} text-white mr-4`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-royal">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </Link>
            ))}
            
            {/* Special Offer */}
            <div className="mt-6 p-4 bg-gradient-to-r from-gold/10 to-royal/10 rounded-lg border border-gold/20">
              <div className="flex items-center mb-3">
                <Gift className="h-5 w-5 text-gold mr-2" />
                <h3 className="font-bold text-royal">🎉 Limited Time Offer!</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Get 20% off on all courses. Use code <span className="font-bold text-royal">COINGLOBE20</span>
              </p>
              <Link to="/courses" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gold hover:bg-gold/80 text-royal font-medium">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FloatingActionButton;

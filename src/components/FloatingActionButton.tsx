
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus, X, Facebook, Instagram, MessageCircle, Twitter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const togglePopup = () => setIsOpen(!isOpen);

  const actionOptions = [
    { title: "Sell Coins", href: "/coins-market", description: "List your coins for sale" },
    { title: "Sell Courses", href: "/courses", description: "Create educational content" },
    { title: "₹20 Coin Verification", href: "/verify-coins", description: "Get expert authentication" }
  ];

  const socialLinks = [
    { 
      icon: Facebook, 
      href: "https://facebook.com/coinglobe", 
      color: "text-blue-600 hover:text-blue-700",
      active: false
    },
    { 
      icon: Instagram, 
      href: "https://instagram.com/coinglobe", 
      color: "text-pink-600 hover:text-pink-700",
      active: false
    },
    { 
      icon: MessageCircle, 
      href: "https://wa.me/919876543210", 
      color: "text-green-600 hover:text-green-700",
      active: false
    },
    { 
      icon: Twitter, 
      href: "https://twitter.com/coinglobe_official", 
      color: "text-blue-500 hover:text-blue-600",
      active: false
    }
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={togglePopup}
        />
      )}
      
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Popup */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 mb-2">
            <Card className="w-80 shadow-2xl border border-gold/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Action Options */}
                  <div className="space-y-3">
                    {actionOptions.map((option, index) => (
                      <Link
                        key={index}
                        to={option.href}
                        onClick={togglePopup}
                        className="block p-3 rounded-lg border border-gray-200 hover:border-royal hover:bg-royal/5 transition-all duration-200"
                      >
                        <h4 className="font-bold text-royal text-sm">{option.title}</h4>
                        <p className="text-gray-600 text-xs">{option.description}</p>
                        {location.pathname === option.href && 
                          <div className="w-full h-0.5 bg-royal mt-2"></div>
                        }
                      </Link>
                    ))}
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    {socialLinks.map((social, index) => (
                      <a 
                        key={index} 
                        href={social.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`${social.color} p-2 rounded-full hover:bg-gray-100`}
                      >
                        <social.icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Toggle Button */}
        <Button
          onClick={togglePopup}
          className="h-14 w-14 rounded-full bg-royal hover:bg-royal-light shadow-lg"
        >
          {isOpen ? <X size={20} /> : <Plus size={24} />}
        </Button>
      </div>
    </>
  );
};

export default FloatingActionButton;

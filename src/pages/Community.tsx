
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Community = () => {
  // Example links - replace with actual group URLs
  const whatsappLink = "https://chat.whatsapp.com/example-group-link";
  const facebookLink = "https://www.facebook.com/groups/example-group-link";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-royal font-playfair mb-6">
              Join Our Collector Community
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-12">
              Join our collector communities on WhatsApp and Facebook to connect with fellow enthusiasts, 
              share your collections, get expert opinions, and stay updated on upcoming events.
            </p>

            <Card className="mb-12 p-6 border-gold/20">
              <CardContent className="pt-6 flex flex-col items-center space-y-6">
                <div className="w-full max-w-md grid grid-cols-1 md:grid-cols-2 gap-6">
                  <a 
                    href={whatsappLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button 
                      className="w-full py-8 bg-[#25D366] hover:bg-[#128C7E] text-white shadow-md flex items-center justify-center text-lg"
                    >
                      <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Join WhatsApp Group
                    </Button>
                  </a>
                  <a 
                    href={facebookLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button 
                      className="w-full py-8 bg-[#1877F2] hover:bg-[#0E5FCC] text-white shadow-md flex items-center justify-center text-lg"
                    >
                      <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm-1.218 19v-7.069h-1.782V9.599h1.782V8.889c0-1.766.752-2.889 2.889-2.889h1.781v2.332h-1.113c-.832 0-.887.247-.887.889v.389h2l-.264 2.332h-1.736V19h-2.67z"/>
                      </svg>
                      Join Facebook Group
                    </Button>
                  </a>
                </div>
                
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  By joining our community groups, you'll connect with collectors from around the world,
                  get exclusive updates, and participate in member-only events.
                </p>
              </CardContent>
            </Card>
            
            <h2 className="text-2xl font-bold text-royal font-playfair mb-6">
              Why Join Our Community?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gold/10">
                <h3 className="text-xl font-bold text-royal mb-3">Connect</h3>
                <p className="text-gray-700">
                  Meet fellow collectors who share your passion and interests
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gold/10">
                <h3 className="text-xl font-bold text-royal mb-3">Learn</h3>
                <p className="text-gray-700">
                  Share knowledge and learn from experienced collectors
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gold/10">
                <h3 className="text-xl font-bold text-royal mb-3">Discover</h3>
                <p className="text-gray-700">
                  Find trading opportunities and discover rare coins
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;

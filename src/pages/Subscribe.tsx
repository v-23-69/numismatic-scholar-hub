
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Check, X } from 'lucide-react';
import supabase from '@/lib/supabaseClient';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // TODO: Connect to Supabase newsletter table
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Insert into newsletter_subscriptions table
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email: email.trim(),
          subscribed_at: new Date().toISOString()
        });

      if (error) {
        throw error;
      }

      setIsSubscribed(true);
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter. You'll receive updates on latest coins & courses.",
        className: "bg-green-50 border-green-200 text-green-800"
      });
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    setIsLoading(true);

    try {
      // Update is_subscribed to false for this email
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .update({ subscribed_at: null }) // Set to null to indicate unsubscribed
        .eq('email', email.trim());

      if (error) {
        throw error;
      }

      setIsSubscribed(false);
      setEmail('');
      toast({
        title: "Successfully unsubscribed",
        description: "You have been unsubscribed from our newsletter.",
        className: "bg-blue-50 border-blue-200 text-blue-800"
      });
    } catch (error: any) {
      console.error('Newsletter unsubscribe error:', error);
      toast({
        title: "Unsubscribe failed",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-royal/5 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-royal rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-10 w-10 text-gold" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-royal font-playfair mb-6">
                Stay Updated with NumismaticScholar
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                Subscribe to get updates on latest coins & courses. Unsubscribe anytime.
              </p>

              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-6">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-royal focus:border-transparent"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="bg-royal hover:bg-royal-light text-white px-8 py-4 text-lg"
                    >
                      {isLoading ? 'Subscribing...' : 'Subscribe Now'}
                    </Button>
                    
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/')}
                      className="border-royal text-royal hover:bg-royal hover:text-white px-8 py-4 text-lg"
                    >
                      Back to Home
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-green-800 mb-4">Successfully Subscribed!</h2>
                  <p className="text-green-700 mb-6">
                    You're now subscribed to our newsletter. You'll receive updates on the latest coins, courses, and community events.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button 
                      onClick={handleUnsubscribe}
                      disabled={isLoading}
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <X className="h-4 w-4 mr-2" />
                      {isLoading ? 'Unsubscribing...' : 'Unsubscribe'}
                    </Button>
                    
                    <Button 
                      onClick={() => navigate('/')}
                      className="bg-royal hover:bg-royal-light text-white"
                    >
                      Back to Home
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Latest Courses</h3>
                  <p className="text-gray-600 text-sm">Be the first to know about new educational content</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">New Coin Listings</h3>
                  <p className="text-gray-600 text-sm">Get notified when rare coins are available</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Community Events</h3>
                  <p className="text-gray-600 text-sm">Stay updated on webinars and meetups</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Subscribe;

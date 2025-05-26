
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones, MessageCircle, Phone, Clock, CheckCircle, Star } from 'lucide-react';

const AgentSupport = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <Headphones className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-royal font-playfair mb-4">
                👋 Welcome to CoinGlobe Live Support
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our expert will now guide you about your coin. You'll receive personalized assistance within minutes.
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center mb-3">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                <span className="font-semibold text-green-800">Payment Successful!</span>
              </div>
              <p className="text-green-700">
                Your verification request has been received and payment processed. Our expert team is now reviewing your submission.
              </p>
            </div>
          </div>

          {/* Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="border-2 border-royal/20 hover:border-royal/40 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="h-6 w-6 text-royal" />
                </div>
                <CardTitle className="text-royal">Live Chat Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Connect instantly with our coin experts via live chat for immediate assistance.
                </p>
                <Button className="w-full bg-royal hover:bg-royal-light">
                  Start Live Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-gold/20 hover:border-gold/40 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="h-6 w-6 text-gold" />
                </div>
                <CardTitle className="text-gold">Phone Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Speak directly with our numismatic experts for detailed coin discussions.
                </p>
                <div className="mb-4">
                  <p className="font-semibold text-royal">+91-9876543210</p>
                  <p className="text-sm text-gray-500">Available 9 AM - 8 PM</p>
                </div>
                <Button variant="outline" className="w-full border-gold text-gold hover:bg-gold hover:text-white">
                  Call Now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Status Timeline */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 text-royal mr-2" />
                Verification Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Payment Received</p>
                    <p className="text-sm text-gray-500">Just now</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Expert Review in Progress</p>
                    <p className="text-sm text-gray-500">Expected completion: Within 24-48 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Detailed Report Delivery</p>
                    <p className="text-sm text-gray-400">Via email and phone</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expert Team */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Meet Your Expert Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-8 w-8 text-royal" />
                  </div>
                  <h4 className="font-semibold">Dr. Rajesh Kumar</h4>
                  <p className="text-sm text-gray-600">Senior Numismatist</p>
                  <p className="text-xs text-gray-500">25+ years experience</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-8 w-8 text-gold" />
                  </div>
                  <h4 className="font-semibold">Priya Sharma</h4>
                  <p className="text-sm text-gray-600">Authentication Specialist</p>
                  <p className="text-xs text-gray-500">15+ years experience</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold">Amit Patel</h4>
                  <p className="text-sm text-gray-600">Valuation Expert</p>
                  <p className="text-xs text-gray-500">20+ years experience</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold text-royal mb-4">
              Need to verify more coins?
            </h3>
            <div className="space-x-4">
              <Button onClick={() => window.location.href = '/verify-coins'} className="bg-royal hover:bg-royal-light">
                Submit Another Coin
              </Button>
              <Button onClick={() => window.location.href = '/courses'} variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white">
                Explore Courses
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AgentSupport;

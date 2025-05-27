
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Headphones, MessageCircle, Phone, Clock, CheckCircle, Star, Award, Shield, TrendingUp, Coins } from 'lucide-react';

const VerificationAgent = () => {
  // Sample dummy data for coin verification
  const verificationResult = {
    coinName: "1947 British India 1 Rupee",
    authentication: "Authentic",
    metal: "Silver (0.500)",
    year: "1947",
    mintMark: "B (Bombay)",
    condition: "Very Fine (VF-30)",
    rarity: "Common",
    marketValue: {
      current: "₹800 - ₹1,200",
      trend: "+15% (6 months)"
    },
    futurePrediction: "Stable growth expected due to historical significance",
    expertNotes: "This coin represents the last year of British rule in India, making it historically significant. The condition is good with clear details visible."
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-royal font-playfair mb-4">
                👋 Welcome to CoinGlobe Expert Analysis
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our expert team has completed the verification of your coin. Here's your detailed analysis report.
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center mb-3">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                <span className="font-semibold text-green-800">Verification Complete!</span>
              </div>
              <p className="text-green-700">
                Your coin has been thoroughly analyzed by our certified numismatic experts.
              </p>
            </div>
          </div>

          {/* Verification Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Authentication Card */}
            <Card className="border-2 border-green-200">
              <CardHeader className="text-center bg-green-50">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-green-700">Authentication</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="text-center">
                  <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2 rounded-xl">
                    {verificationResult.authentication}
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Coin:</span>
                    <span className="font-semibold">{verificationResult.coinName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Year:</span>
                    <span className="font-semibold">{verificationResult.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Metal:</span>
                    <span className="font-semibold">{verificationResult.metal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mint Mark:</span>
                    <span className="font-semibold">{verificationResult.mintMark}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Condition:</span>
                    <span className="font-semibold">{verificationResult.condition}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Value Card */}
            <Card className="border-2 border-blue-200">
              <CardHeader className="text-center bg-blue-50">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Coins className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700">Market Value</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {verificationResult.marketValue.current}
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 rounded-xl">
                    {verificationResult.marketValue.trend}
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rarity:</span>
                    <span className="font-semibold">{verificationResult.rarity}</span>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="font-semibold text-blue-700">Future Prediction</span>
                    </div>
                    <p className="text-sm text-blue-600">{verificationResult.futurePrediction}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Expert Notes */}
          <Card className="mb-8 border-2 border-gold/20">
            <CardHeader>
              <CardTitle className="flex items-center text-gold">
                <Award className="h-5 w-5 mr-2" />
                Expert Analysis Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{verificationResult.expertNotes}</p>
            </CardContent>
          </Card>

          {/* Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="border-2 border-royal/20 hover:border-royal/40 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="h-6 w-6 text-royal" />
                </div>
                <CardTitle className="text-royal">Have Questions?</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Connect with our experts for additional clarifications about your coin.
                </p>
                <Button className="w-full bg-royal hover:bg-royal-light rounded-xl">
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
                  Speak directly with our numismatic experts for detailed discussions.
                </p>
                <div className="mb-4">
                  <p className="font-semibold text-royal">+91-9876543210</p>
                  <p className="text-sm text-gray-500">Available 9 AM - 8 PM</p>
                </div>
                <Button variant="outline" className="w-full border-gold text-gold hover:bg-gold hover:text-white rounded-xl">
                  Call Now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Expert Team */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center">Your Expert Team</CardTitle>
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

          {/* Verification Credits Display */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Your Account</h3>
              <p className="text-blue-600">You have <span className="font-bold">1 free verification</span> remaining</p>
              <p className="text-sm text-blue-500 mt-1">Bonus credit from your recent purchase</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-royal mb-4">
              Need to verify more coins?
            </h3>
            <div className="space-x-4">
              <Button onClick={() => window.location.href = '/verify-coins'} className="bg-royal hover:bg-royal-light rounded-xl">
                Submit Another Coin
              </Button>
              <Button onClick={() => window.location.href = '/courses'} variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white rounded-xl">
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

export default VerificationAgent;

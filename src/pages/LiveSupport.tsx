
import { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, MessageCircle, Phone, Clock, CheckCircle, Star, Headphones } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LiveSupport = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<'zoom' | 'chat' | null>(null);

  const handleZoomCall = () => {
    // In a real app, this would open a Zoom meeting
    window.open('https://zoom.us/j/example', '_blank');
  };

  const handleLiveChat = () => {
    setSelectedOption('chat');
    // In a real app, this would open a chat widget
  };

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
                🎯 Live Expert Support
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Connect with our numismatic experts in real-time for instant coin verification insights.
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center mb-3">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                <span className="font-semibold text-green-800">Your verification is in progress!</span>
              </div>
              <p className="text-green-700">
                Our expert team is analyzing your coins. Choose your preferred way to connect below.
              </p>
            </div>
          </div>

          {/* Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card 
              className={`border-2 transition-all duration-300 cursor-pointer ${
                selectedOption === 'zoom' 
                  ? 'border-royal bg-royal/5' 
                  : 'border-royal/20 hover:border-royal/40'
              }`}
              onClick={() => setSelectedOption('zoom')}
            >
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Video className="h-6 w-6 text-royal" />
                </div>
                <CardTitle className="text-royal">Zoom Video Call</CardTitle>
                <CardDescription>
                  Face-to-face consultation with screen sharing for detailed coin analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-3 mb-4">
                  <p className="text-sm text-gray-600">✓ Live video interaction</p>
                  <p className="text-sm text-gray-600">✓ Screen sharing enabled</p>
                  <p className="text-sm text-gray-600">✓ Record session for reference</p>
                </div>
                <Button 
                  onClick={handleZoomCall}
                  className="w-full bg-royal hover:bg-royal/90"
                >
                  Join Zoom Call
                </Button>
              </CardContent>
            </Card>

            <Card 
              className={`border-2 transition-all duration-300 cursor-pointer ${
                selectedOption === 'chat' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-blue-200 hover:border-blue-400'
              }`}
              onClick={() => setSelectedOption('chat')}
            >
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-600">Live Chat</CardTitle>
                <CardDescription>
                  Quick text-based support with image sharing capabilities
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-3 mb-4">
                  <p className="text-sm text-gray-600">✓ Instant messaging</p>
                  <p className="text-sm text-gray-600">✓ Share additional photos</p>
                  <p className="text-sm text-gray-600">✓ Chat history saved</p>
                </div>
                <Button 
                  onClick={handleLiveChat}
                  variant="outline" 
                  className="w-full border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white"
                >
                  Start Live Chat
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface - Shows when chat is selected */}
          {selectedOption === 'chat' && (
            <Card className="mb-8 border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Live Chat Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-xl h-64 mb-4 overflow-y-auto">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Star className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm max-w-xs">
                        <p className="text-sm"><strong>Expert Raj:</strong> Hello! I've received your coin verification request. Let me analyze the images you've submitted.</p>
                        <span className="text-xs text-gray-500">Just now</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Star className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm max-w-xs">
                        <p className="text-sm">I can see you've uploaded a coin from the British India period. The details are quite clear. Would you like me to start with authenticity verification or pricing analysis?</p>
                        <span className="text-xs text-gray-500">30 seconds ago</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    placeholder="Type your message here..." 
                    className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700">Send</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Status Timeline */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 text-royal mr-2" />
                Verification Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Payment Received & Images Uploaded</p>
                    <p className="text-sm text-gray-500">Completed</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Expert Analysis in Progress</p>
                    <p className="text-sm text-gray-500">Live support available now</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">PDF Report Generation</p>
                    <p className="text-sm text-gray-400">Will be delivered via email & SMS</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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
                  <div className="mt-2">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                    <span className="text-xs text-green-600">Online now</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-8 w-8 text-gold" />
                  </div>
                  <h4 className="font-semibold">Priya Sharma</h4>
                  <p className="text-sm text-gray-600">Authentication Specialist</p>
                  <p className="text-xs text-gray-500">15+ years experience</p>
                  <div className="mt-2">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                    <span className="text-xs text-green-600">Online now</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold">Amit Patel</h4>
                  <p className="text-sm text-gray-600">Valuation Expert</p>
                  <p className="text-xs text-gray-500">20+ years experience</p>
                  <div className="mt-2">
                    <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
                    <span className="text-xs text-yellow-600">Available shortly</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-royal mb-4">
              Need additional help?
            </h3>
            <div className="space-x-4">
              <Button 
                onClick={() => navigate('/verify-coins')} 
                className="bg-royal hover:bg-royal/90"
              >
                Submit Another Coin
              </Button>
              <Button 
                onClick={() => navigate('/courses')} 
                variant="outline" 
                className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white"
              >
                Learn About Coins
              </Button>
              <Button 
                onClick={() => navigate('/')} 
                variant="outline"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LiveSupport;

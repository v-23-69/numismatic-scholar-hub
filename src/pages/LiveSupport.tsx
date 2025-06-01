
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, MessageCircle, CheckCircle, Clock, User, Phone } from 'lucide-react';

const LiveSupport = () => {
  const navigate = useNavigate();
  const [supportType, setSupportType] = useState<'chat' | 'video' | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSupportChoice = (type: 'chat' | 'video') => {
    setSupportType(type);
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
    }, 3000);
  };

  if (isConnecting) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-royal/5">
          <div className="text-center px-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-royal mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-royal mb-4">Connecting to Expert...</h2>
            <p className="text-gray-600">Please wait while we connect you to our numismatic specialist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (supportType) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-8 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <Badge className="bg-green-100 text-green-800 mb-4">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Connected to Expert
                </Badge>
                <h1 className="text-3xl font-bold text-royal font-playfair mb-4">
                  Live {supportType === 'video' ? 'Video' : 'Chat'} Support
                </h1>
                <p className="text-gray-600">
                  You're now connected with our numismatic expert for real-time assistance.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="h-96 border-2 border-royal/20">
                    <CardContent className="h-full flex items-center justify-center bg-royal/5">
                      {supportType === 'video' ? (
                        <div className="text-center">
                          <Video className="h-16 w-16 text-royal mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-royal mb-2">Video Call Active</h3>
                          <p className="text-gray-600">Expert analysis in progress...</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <MessageCircle className="h-16 w-16 text-royal mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-royal mb-2">Chat Support Active</h3>
                          <p className="text-gray-600">Expert is analyzing your coin...</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Your Expert
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-royal rounded-full flex items-center justify-center text-white font-bold">
                          DR
                        </div>
                        <div>
                          <h4 className="font-semibold">Dr. Rajesh Kumar</h4>
                          <p className="text-sm text-gray-600">Senior Numismatist</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        15+ years experience in ancient and modern coin authentication
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Session Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Session Started</span>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Analysis Progress</span>
                          <span className="text-sm text-green-600">In Progress</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Estimated Time</span>
                          <span className="text-sm">10-15 mins</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Switch to Phone Call
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        size="sm"
                        onClick={() => navigate('/verify-coins')}
                      >
                        Return to Verification
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>What's Happening Now</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>Images received and uploaded successfully</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>Expert is analyzing coin authenticity</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-yellow-600" />
                        <span>Preparing detailed analysis report</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <span>Final report and valuation (pending)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-royal font-playfair mb-4">
                Choose Your Support Method
              </h1>
              <p className="text-lg text-gray-600">
                Connect with our expert numismatist for real-time coin verification assistance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="border-2 border-royal/20 hover:border-royal/40 transition-colors cursor-pointer group" onClick={() => handleSupportChoice('video')}>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-royal/20 transition-colors">
                    <Video className="h-8 w-8 text-royal" />
                  </div>
                  <h3 className="text-xl font-bold text-royal mb-3">Video Call Support</h3>
                  <p className="text-gray-600 mb-4">
                    Get face-to-face guidance from our expert. Perfect for detailed analysis and real-time questions.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Live video consultation</li>
                    <li>• Real-time coin examination</li>
                    <li>• Instant expert feedback</li>
                    <li>• Screen sharing capability</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-royal/20 hover:border-royal/40 transition-colors cursor-pointer group" onClick={() => handleSupportChoice('chat')}>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-royal/20 transition-colors">
                    <MessageCircle className="h-8 w-8 text-royal" />
                  </div>
                  <h3 className="text-xl font-bold text-royal mb-3">Live Chat Support</h3>
                  <p className="text-gray-600 mb-4">
                    Text-based support with our expert. Great for quick questions and detailed written analysis.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Instant messaging</li>
                    <li>• Written expert analysis</li>
                    <li>• Image sharing support</li>
                    <li>• Chat history saved</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-3">What to Expect:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                <div>
                  <h4 className="font-medium mb-2">During the Session:</h4>
                  <ul className="space-y-1">
                    <li>• Expert will review your uploaded images</li>
                    <li>• Real-time analysis and feedback</li>
                    <li>• Answer any questions you have</li>
                    <li>• Provide authentication insights</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">After the Session:</h4>
                  <ul className="space-y-1">
                    <li>• Detailed PDF report emailed to you</li>
                    <li>• Market valuation information</li>
                    <li>• Authentication certificate</li>
                    <li>• Historical context and details</li>
                  </ul>
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

export default LiveSupport;

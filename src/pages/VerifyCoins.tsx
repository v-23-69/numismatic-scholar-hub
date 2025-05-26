
import { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Calendar, Info, Award, CheckCircle, Plus, Minus } from 'lucide-react';

const VerifyCoins = () => {
  const { toast } = useToast();
  const [verificationStep, setVerificationStep] = useState(1);
  const [coinCount, setCoinCount] = useState(1);
  const basePrice = 20;
  
  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Verification Request Submitted",
      description: "Our experts will review your submission within 48 hours.",
    });
    // Redirect to agent support page
    window.location.href = '/agent-support';
  };

  const incrementCoinCount = () => {
    setCoinCount(prev => prev + 1);
  };

  const decrementCoinCount = () => {
    setCoinCount(prev => Math.max(1, prev - 1));
  };

  const totalPrice = coinCount * basePrice;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-royal font-playfair mb-4">Expert Coin Verification</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get your coins authenticated by our team of certified numismatic experts. 
              Our rigorous process ensures accurate assessment of authenticity, condition, and value.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div className={`flex flex-col items-center ${verificationStep >= 1 ? 'text-royal' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${verificationStep >= 1 ? 'bg-royal text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <span className="mt-2 text-sm font-medium">Details</span>
              </div>
              <div className="flex-1 mx-4">
                <div className={`h-1 ${verificationStep >= 2 ? 'bg-royal' : 'bg-gray-200'} rounded-full`}></div>
              </div>
              <div className={`flex flex-col items-center ${verificationStep >= 2 ? 'text-royal' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${verificationStep >= 2 ? 'bg-royal text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <span className="mt-2 text-sm font-medium">Upload</span>
              </div>
              <div className="flex-1 mx-4">
                <div className={`h-1 ${verificationStep >= 3 ? 'bg-royal' : 'bg-gray-200'} rounded-full`}></div>
              </div>
              <div className={`flex flex-col items-center ${verificationStep >= 3 ? 'text-royal' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${verificationStep >= 3 ? 'bg-royal text-white' : 'bg-gray-200'}`}>
                  3
                </div>
                <span className="mt-2 text-sm font-medium">Payment</span>
              </div>
            </div>
            
            {verificationStep === 1 && (
              <Card className="border-2 border-blue-100">
                <CardHeader>
                  <CardTitle className="text-royal">Your Details</CardTitle>
                  <CardDescription>
                    Please provide your contact information for verification updates.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Enter your full name" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+91 98765 43210" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contact">Email or WhatsApp (Optional)</Label>
                      <Input id="contact" placeholder="email@example.com or WhatsApp number" />
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => setVerificationStep(2)} className="bg-royal hover:bg-blue-600">
                    Continue to Upload
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {verificationStep === 2 && (
              <Card className="border-2 border-blue-100">
                <CardHeader>
                  <CardTitle className="text-royal">Upload Your Coins</CardTitle>
                  <CardDescription>
                    Upload clear photos of both sides of your coin(s) and tell us what you'd like to know.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Coin Count Selection */}
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-semibold text-royal mb-4">Number of Coins</h3>
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={decrementCoinCount}
                        disabled={coinCount <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-2xl font-bold text-royal px-6">{coinCount}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={incrementCoinCount}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-semibold text-royal">
                        Total: ₹{totalPrice} for {coinCount} coin{coinCount > 1 ? 's' : ''}
                      </p>
                      <p className="text-sm text-gray-600">₹20 per coin verification</p>
                    </div>
                    
                    {coinCount >= 5 && (
                      <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-200">
                        <p className="text-sm font-medium text-green-800 text-center">
                          🎁 Special Offer: Get 1 coin verification FREE when uploading 5 or more!
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center hover:border-blue-400 transition-colors">
                      <Upload className="h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600 text-center mb-4">
                        Upload photos of the <strong>front side</strong> of your coin(s)
                      </p>
                      <Button variant="outline" size="sm" className="border-royal text-royal hover:bg-blue-50">
                        Select Images
                      </Button>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center hover:border-blue-400 transition-colors">
                      <Upload className="h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600 text-center mb-4">
                        Upload photos of the <strong>back side</strong> of your coin(s)
                      </p>
                      <Button variant="outline" size="sm" className="border-royal text-royal hover:bg-blue-50">
                        Select Images
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="question">What would you like to know about this coin?</Label>
                    <Textarea 
                      id="question" 
                      placeholder="e.g., Is this coin authentic? What's its estimated value? What year is it from? Any specific details you want verified..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-start">
                      <Info className="text-blue-600 mr-3 mt-1" size={20} />
                      <div>
                        <h4 className="text-sm font-medium text-blue-800">Photo Tips for Best Results</h4>
                        <ul className="mt-2 text-sm text-blue-700 list-disc pl-5 space-y-1">
                          <li>Use natural lighting without direct glare</li>
                          <li>Place the coin against a neutral background</li>
                          <li>Capture close-up shots that show details clearly</li>
                          <li>Include any mint marks or special features</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setVerificationStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setVerificationStep(3)} className="bg-royal hover:bg-blue-600">
                    Proceed to Payment
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {verificationStep === 3 && (
              <Card className="border-2 border-blue-100">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-royal">Complete Your Payment</CardTitle>
                  <CardDescription>
                    Secure payment for your coin verification service
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div className="bg-royal/10 p-6 rounded-lg">
                    <h3 className="text-3xl font-bold text-royal mb-2">₹{totalPrice}</h3>
                    <p className="text-gray-600">for {coinCount} coin{coinCount > 1 ? 's' : ''} verification</p>
                    {coinCount >= 5 && (
                      <p className="text-sm text-green-600 font-medium mt-2">
                        ✨ 1 FREE verification included!
                      </p>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-4 flex items-center justify-center">
                      <Award className="mr-2 text-gold" size={20} />
                      What you'll receive:
                    </h4>
                    <ul className="text-left text-gray-600 space-y-2 max-w-md mx-auto">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Expert authentication within 48 hours</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Detailed condition assessment report</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Estimated market value analysis</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />High-resolution verification certificate</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Direct access to live agent support</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="justify-center space-x-4">
                  <Button variant="outline" onClick={() => setVerificationStep(2)}>
                    Back to Upload
                  </Button>
                  <Button 
                    onClick={handleSubmission}
                    className="bg-gold hover:bg-gold/80 text-white font-bold px-8 py-3 text-lg"
                  >
                    Pay ₹{totalPrice} & Submit
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VerifyCoins;

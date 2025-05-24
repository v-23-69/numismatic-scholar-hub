<<<<<<< HEAD
=======

>>>>>>> 813d0fd0065b6f839cbd5b9921e4616d9d2a780c
import { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Camera, Calendar, Info, Award, CheckCircle } from 'lucide-react';

const VerifyCoins = () => {
  const { toast } = useToast();
  const [verificationStep, setVerificationStep] = useState(1);
  
  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Verification Request Submitted",
      description: "Our experts will review your submission within 48 hours.",
    });
    setVerificationStep(3);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-10 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-royal font-playfair mb-4">Expert Coin Verification</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get your coins authenticated by our team of certified numismatic experts. 
              Our rigorous process ensures accurate assessment of authenticity, condition, and value.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between mb-10">
              <div className={`flex flex-col items-center ${verificationStep >= 1 ? 'text-royal' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${verificationStep >= 1 ? 'bg-royal text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <span className="mt-2">Submit Details</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className={`h-1 w-full ${verificationStep >= 2 ? 'bg-royal' : 'bg-gray-200'}`}></div>
              </div>
              <div className={`flex flex-col items-center ${verificationStep >= 2 ? 'text-royal' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${verificationStep >= 2 ? 'bg-royal text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <span className="mt-2">Upload Photos</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className={`h-1 w-full ${verificationStep >= 3 ? 'bg-royal' : 'bg-gray-200'}`}></div>
              </div>
              <div className={`flex flex-col items-center ${verificationStep >= 3 ? 'text-royal' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${verificationStep >= 3 ? 'bg-royal text-white' : 'bg-gray-200'}`}>
                  3
                </div>
                <span className="mt-2">Complete</span>
              </div>
            </div>
            
            {verificationStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Coin Details</CardTitle>
                  <CardDescription>
                    Please provide as much information as possible about your coin.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="coinType">Coin Type</Label>
                        <Input id="coinType" placeholder="e.g., Morgan Dollar, Gold Eagle" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="year">Year</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                          <Input id="year" placeholder="Year of minting" className="pl-10" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="mint">Mint Mark</Label>
                        <Input id="mint" placeholder="e.g., S, D, P, CC" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="material">Material</Label>
                        <Input id="material" placeholder="e.g., Gold, Silver, Copper" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Additional Details</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Describe any unique features, known history, or concerns about the coin"
                        rows={4}
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => setVerificationStep(2)}>
                    Continue to Photo Upload
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {verificationStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Upload Photos</CardTitle>
                  <CardDescription>
                    Clear photos are essential for accurate authentication. Please upload high-resolution images of both sides of the coin.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                      <Upload className="h-10 w-10 text-gray-400 mb-3" />
                      <p className="text-sm text-gray-500 text-center mb-3">
                        Drag and drop or click to upload the <strong>obverse (front)</strong> of your coin
                      </p>
                      <Button variant="outline" size="sm">Select Image</Button>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                      <Upload className="h-10 w-10 text-gray-400 mb-3" />
                      <p className="text-sm text-gray-500 text-center mb-3">
                        Drag and drop or click to upload the <strong>reverse (back)</strong> of your coin
                      </p>
                      <Button variant="outline" size="sm">Select Image</Button>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <Info className="text-blue-500 mr-3 mt-1" size={20} />
                      <div>
                        <h4 className="text-sm font-medium text-blue-800">Photo Tips for Best Results</h4>
                        <ul className="mt-2 text-sm text-blue-700 list-disc pl-5 space-y-1">
                          <li>Use natural lighting without direct glare</li>
                          <li>Place the coin against a neutral background</li>
                          <li>Capture close-up shots that show details</li>
                          <li>Include any mint marks or special features</li>
                          <li>Avoid flash photography that can wash out details</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setVerificationStep(1)}>
                    Back
                  </Button>
                  <Button onClick={handleSubmission}>
                    Submit for Verification
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {verificationStep === 3 && (
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto my-6 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl">Verification Request Submitted</CardTitle>
                  <CardDescription>
                    Thank you for submitting your coin for expert verification.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-6">
                    Our team of numismatic experts will carefully examine your submission and provide a detailed report within 48 hours. 
                    You will receive an email notification when your verification is complete.
                  </p>
                  
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
                      <Award className="mr-2 text-gold" size={20} />
                      What happens next?
                    </h3>
                    <ul className="text-left text-gray-600 list-disc pl-5 space-y-2">
                      <li>Our experts review your submission</li>
                      <li>We'll email you with authentication results</li>
                      <li>You'll receive a detailed report on authenticity, condition, and estimated value</li>
                      <li>Options for certification and grading will be provided if desired</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setVerificationStep(1);
                      window.scrollTo(0, 0);
                    }}
                    className="mr-4"
                  >
                    Submit Another Coin
                  </Button>
                  <Button onClick={() => window.location.href = '/coins-market'}>
                    Browse Coin Market
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            <div className="mt-16">
              <h2 className="text-2xl font-semibold text-royal mb-6 text-center">Our Verification Process</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-royal/10 rounded-full flex items-center justify-center mb-4">
                    <Camera className="h-6 w-6 text-royal" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Visual Inspection</h3>
                  <p className="text-gray-600">
                    Our experts analyze high-resolution images using specialized equipment to examine mint marks, edge details, and surface characteristics.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-royal/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-royal font-bold text-lg">Au</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Material Analysis</h3>
                  <p className="text-gray-600">
                    Using non-invasive techniques, we verify metallic composition and weight against known standards for the coin's era.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-royal/10 rounded-full flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-royal" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Expert Certification</h3>
                  <p className="text-gray-600">
                    You'll receive a detailed report with authentication status, condition assessment, and estimated market value.
                  </p>
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

<<<<<<< HEAD
export default VerifyCoins; 
=======
export default VerifyCoins;
>>>>>>> 813d0fd0065b6f839cbd5b9921e4616d9d2a780c

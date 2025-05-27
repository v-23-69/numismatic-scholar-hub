import { useState, useEffect } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Info, Award, CheckCircle, Plus, Minus, AlertCircle, QrCode, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import supabase from '@/lib/supabaseClient';

interface FormData {
  coin_name: string;
  phone: string;
  description: string;
  coinImages: Record<number, { front?: File, back?: File }>;
}

const VerifyCoins = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [verificationStep, setVerificationStep] = useState(1);
  const [coinCount, setCoinCount] = useState(1);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const [formData, setFormData] = useState<FormData>({
    coin_name: '',
    phone: '',
    description: '',
    coinImages: {}
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const basePrice = 20;

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    getUser();
  }, []);
  
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.coin_name.trim()) newErrors.coin_name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length !== 10 || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    // Check if we have front and back images for the required number of coins
    const requiredCoins = hasFreeVerification ? coinCount + 1 : coinCount;
    for (let i = 1; i <= requiredCoins; i++) {
      if (!formData.coinImages[i]?.front) {
        newErrors[`coin${i}Front`] = `Coin ${i} front image is required`;
      }
      if (!formData.coinImages[i]?.back) {
        newErrors[`coin${i}Back`] = `Coin ${i} back image is required`;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (verificationStep === 1 && validateStep1()) {
      setVerificationStep(2);
    } else if (verificationStep === 2 && validateStep2()) {
      setVerificationStep(3);
    }
  };

  const handleStepClick = (step: number) => {
    if (step === 1 || (step === 2 && validateStep1()) || (step === 3 && validateStep1() && validateStep2())) {
      setVerificationStep(step);
    }
  };

  const handleFileUpload = (file: File | undefined, coinNumber: number, side: 'front' | 'back') => {
    if (!file) return;
    
    setFormData(prev => ({
      ...prev,
      coinImages: {
        ...prev.coinImages,
        [coinNumber]: {
          ...prev.coinImages[coinNumber],
          [side]: file
        }
      }
    }));
    
    // Clear any existing errors for this field
    const newErrors = {...errors};
    delete newErrors[`coin${coinNumber}${side === 'front' ? 'Front' : 'Back'}`];
    setErrors(newErrors);
  };

  const uploadToSupabase = async (file: File, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('coin_images')
        .upload(fileName, file);
      
      if (error) throw error;
      
      const { data: { publicUrl } } = supabase.storage
        .from('coin_images')
        .getPublicUrl(data.path);
      
      return publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const handlePayment = async () => {
    if (!validateStep1() || !validateStep2()) {
      toast({
        title: "Please complete all required fields",
        description: "Fill in all mandatory information to proceed.",
        variant: "destructive"
      });
      return;
    }
    
    setShowQRModal(true);
  };

  const handlePaymentSuccess = async () => {
    setShowQRModal(false);
    setIsSubmitting(true);
    
    try {
      // Upload only the first coin's images for now
      let frontImageUrl = '';
      let backImageUrl = '';
      
      if (formData.coinImages[1]?.front) {
        const frontFileName = `front_${Date.now()}_${formData.coinImages[1].front.name}`;
        frontImageUrl = await uploadToSupabase(formData.coinImages[1].front, frontFileName);
      }
      
      if (formData.coinImages[1]?.back) {
        const backFileName = `back_${Date.now()}_${formData.coinImages[1].back.name}`;
        backImageUrl = await uploadToSupabase(formData.coinImages[1].back, backFileName);
      }

      // Create verification record
      const { data: verification, error: verificationError } = await supabase
        .from('coin_verification')
        .insert({
          user_id: user?.id,
          coin_name: formData.coin_name,
          phone: formData.phone,
          description: formData.description || 'General verification request',
          front_image_url: frontImageUrl,
          back_image_url: backImageUrl,
          num_coins: coinCount,
          payment_status: 'completed',
          paid: true,
          status: 'pending'
        })
        .select()
        .single();

      if (verificationError) throw verificationError;

      // Add free verification credit if applicable
      if (hasFreeVerification && user?.id) {
        await supabase
          .from('verification_credits')
          .insert({
            user_id: user.id,
            credits: 1,
            reason: 'Free verification for 5+ coins upload'
          });
      }

      setShowSuccessModal(true);
      
      setTimeout(() => {
        setShowSuccessModal(false);
        setShowAgentModal(true);
      }, 2000);
      
    } catch (error: any) {
      console.error('Submission error:', error);
      toast({
        title: "Submission failed",
        description: error.message || "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const incrementCoinCount = () => {
    setCoinCount(prev => Math.min(prev + 1, 6));
  };

  const decrementCoinCount = () => {
    setCoinCount(prev => Math.max(1, prev - 1));
  };

  const totalPrice = coinCount * basePrice;
  const hasFreeVerification = coinCount >= 5;
  const totalCoinsToUpload = hasFreeVerification ? coinCount + 1 : coinCount;
  
  const renderCoinUploadBlocks = () => {
    const blocks = [];
    for (let i = 1; i <= totalCoinsToUpload; i++) {
      const isFreeBonus = i > coinCount;
      blocks.push(
        <div key={i} className={`mb-6 p-4 border rounded-xl ${isFreeBonus ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
          {isFreeBonus && (
            <div className="text-center mb-3">
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                🎁 FREE BONUS COIN
              </span>
            </div>
          )}
          <h4 className="font-semibold text-gray-700 mb-3">Coin {i}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Front Side */}
            <div className={`border-2 border-dashed ${errors[`coin${i}Front`] ? 'border-red-300' : 'border-gray-300'} rounded-xl p-6 flex flex-col items-center justify-center hover:border-blue-400 transition-colors`}>
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 text-center mb-3">
                <strong>Coin {i} - Front Side</strong>
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files?.[0], i, 'front')}
                className="hidden"
                id={`coin${i}-front-upload`}
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="border-royal text-royal hover:bg-blue-50 rounded-xl"
                onClick={() => document.getElementById(`coin${i}-front-upload`)?.click()}
              >
                Select Image
              </Button>
              {formData.coinImages[i]?.front && (
                <p className="text-sm text-green-600 mt-2">✓ Image selected</p>
              )}
              {errors[`coin${i}Front`] && <p className="text-red-500 text-xs mt-2 flex items-center"><AlertCircle className="h-3 w-3 mr-1" />{errors[`coin${i}Front`]}</p>}
            </div>

            {/* Back Side */}
            <div className={`border-2 border-dashed ${errors[`coin${i}Back`] ? 'border-red-300' : 'border-gray-300'} rounded-xl p-6 flex flex-col items-center justify-center hover:border-blue-400 transition-colors`}>
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 text-center mb-3">
                <strong>Coin {i} - Back Side</strong>
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files?.[0], i, 'back')}
                className="hidden"
                id={`coin${i}-back-upload`}
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="border-royal text-royal hover:bg-blue-50 rounded-xl"
                onClick={() => document.getElementById(`coin${i}-back-upload`)?.click()}
              >
                Select Image
              </Button>
              {formData.coinImages[i]?.back && (
                <p className="text-sm text-green-600 mt-2">✓ Image selected</p>
              )}
              {errors[`coin${i}Back`] && <p className="text-red-500 text-xs mt-2 flex items-center"><AlertCircle className="h-3 w-3 mr-1" />{errors[`coin${i}Back`]}</p>}
            </div>
          </div>
        </div>
      );
    }
    return blocks;
  };
  
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
                <button 
                  onClick={() => handleStepClick(1)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${verificationStep >= 1 ? 'bg-royal text-white' : 'bg-gray-200'} transition-colors hover:opacity-80`}
                >
                  1
                </button>
                <span className="mt-2 text-sm font-medium">Details</span>
              </div>
              <div className="flex-1 mx-4">
                <div className={`h-1 ${verificationStep >= 2 ? 'bg-royal' : 'bg-gray-200'} rounded-full`}></div>
              </div>
              <div className={`flex flex-col items-center ${verificationStep >= 2 ? 'text-royal' : 'text-gray-400'}`}>
                <button 
                  onClick={() => handleStepClick(2)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${verificationStep >= 2 ? 'bg-royal text-white' : 'bg-gray-200'} transition-colors hover:opacity-80`}
                >
                  2
                </button>
                <span className="mt-2 text-sm font-medium">Upload</span>
              </div>
              <div className="flex-1 mx-4">
                <div className={`h-1 ${verificationStep >= 3 ? 'bg-royal' : 'bg-gray-200'} rounded-full`}></div>
              </div>
              <div className={`flex flex-col items-center ${verificationStep >= 3 ? 'text-royal' : 'text-gray-400'}`}>
                <button 
                  onClick={() => handleStepClick(3)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${verificationStep >= 3 ? 'bg-royal text-white' : 'bg-gray-200'} transition-colors hover:opacity-80`}
                >
                  3
                </button>
                <span className="mt-2 text-sm font-medium">Payment</span>
              </div>
            </div>
            
            {verificationStep === 1 && (
              <Card className="border-2 border-blue-100 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-royal">Your Details</CardTitle>
                  <CardDescription>
                    Please provide your basic information for verification updates.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="coin_name">Full Name *</Label>
                      <Input 
                        id="coin_name" 
                        placeholder="Enter your full name" 
                        value={formData.coin_name}
                        onChange={(e) => setFormData({...formData, coin_name: e.target.value})}
                        className={`rounded-xl ${errors.coin_name ? 'border-red-500' : ''}`}
                        required 
                      />
                      {errors.coin_name && <p className="text-red-500 text-sm flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.coin_name}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (10 digits) *</Label>
                      <Input 
                        id="phone" 
                        placeholder="9876543210" 
                        value={formData.phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setFormData({...formData, phone: value});
                        }}
                        className={`rounded-xl ${errors.phone ? 'border-red-500' : ''}`}
                        maxLength={10}
                        required 
                      />
                      {errors.phone && <p className="text-red-500 text-sm flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.phone}</p>}
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    onClick={handleNextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                  >
                    Continue to Upload
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {verificationStep === 2 && (
              <Card className="border-2 border-blue-100 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-royal">Upload Your Coins</CardTitle>
                  <CardDescription>
                    Select how many coins you want to verify and upload clear photos of both sides.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Coin Count Selection */}
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-lg font-semibold text-royal mb-4">How many coins do you want to verify?</h3>
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={decrementCoinCount}
                        disabled={coinCount <= 1}
                        className="rounded-xl"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-2xl font-bold text-royal px-6">{coinCount}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={incrementCoinCount}
                        disabled={coinCount >= 6}
                        className="rounded-xl"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-royal">
                        {coinCount} coin{coinCount > 1 ? 's' : ''} = ₹{totalPrice}
                      </p>
                      <p className="text-sm text-gray-600">₹20 per coin verification</p>
                      {hasFreeVerification && (
                        <div className="mt-3 p-3 bg-green-100 rounded-xl border border-green-200">
                          <p className="text-sm font-medium text-green-800">
                            🎁 Special Offer: Get 1 coin verification FREE! (Total: {totalCoinsToUpload} coins)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dynamic Coin Upload Blocks */}
                  <div className="space-y-4">
                    {renderCoinUploadBlocks()}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">What would you like to know about your coin? (Optional)</Label>
                    <Textarea 
                      id="description" 
                      placeholder="e.g., Is this coin authentic? What's its estimated value? What year is it from? Any specific details you want verified..."
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="resize-none rounded-xl"
                    />
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
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
                  <Button variant="outline" onClick={() => setVerificationStep(1)} className="rounded-xl">
                    Back
                  </Button>
                  <Button onClick={handleNextStep} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                    Proceed to Payment
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {verificationStep === 3 && (
              <Card className="border-2 border-blue-100 rounded-xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-royal">Complete Your Payment</CardTitle>
                  <CardDescription>
                    Secure payment for your coin verification service
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-lg font-semibold text-royal mb-4">Verification Summary</h3>
                    <div className="space-y-2 mb-4">
                      <p><strong>Coins to verify:</strong> {totalCoinsToUpload} ({coinCount} paid + {hasFreeVerification ? '1 free' : '0 free'})</p>
                      <p><strong>Total price:</strong> ₹{totalPrice}</p>
                    </div>
                    
                    {hasFreeVerification && (
                      <div className="mb-4 p-3 bg-green-100 rounded-xl border border-green-200">
                        <p className="text-sm font-medium text-green-800">
                          🎁 You've earned 1 FREE coin verification!
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-700 mb-4 flex items-center justify-center">
                      <Award className="mr-2 text-gold" size={20} />
                      Our expert will analyze:
                    </h4>
                    <ul className="text-left text-gray-600 space-y-2 max-w-md mx-auto">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />🔍 Authenticity verification</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />💰 Current market price</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />🏭 Metal composition analysis</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />📈 Future valuation insights</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />📅 Era and historical context</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="justify-center space-x-4">
                  <Button variant="outline" onClick={() => setVerificationStep(2)} className="rounded-xl">
                    Back to Upload
                  </Button>
                  <Button 
                    onClick={handlePayment}
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 text-lg rounded-xl"
                  >
                    Pay ₹{totalPrice} & Submit
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      {/* QR Code Payment Modal */}
      <Dialog open={showQRModal} onOpenChange={setShowQRModal}>
        <DialogContent className="sm:max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-center text-royal">Complete Your Payment</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 p-6">
            <div className="bg-white p-4 rounded-xl border-2 border-gray-200">
              <QrCode className="h-32 w-32 text-gray-600" />
            </div>
            <p className="text-lg font-semibold">₹{totalPrice}</p>
            <p className="text-sm text-gray-600 text-center">
              Scan this QR code with any UPI app to complete payment
            </p>
            <Button 
              onClick={handlePaymentSuccess}
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl w-full"
            >
              Payment Completed
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md rounded-xl">
          <div className="flex flex-col items-center space-y-4 p-6">
            <CheckCircle className="h-16 w-16 text-green-600" />
            <h3 className="text-xl font-semibold text-green-800">Payment Successful!</h3>
            <p className="text-center text-gray-600">
              Connecting you to our expert team...
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Agent Support Modal */}
      <Dialog open={showAgentModal} onOpenChange={setShowAgentModal}>
        <DialogContent className="sm:max-w-lg rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-center text-royal">Live Agent Support</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-royal">Our expert is now ready to guide you!</h3>
            <p className="text-center text-gray-600">
              Your coin verification is in progress. Our numismatic expert will analyze your submission and provide detailed insights.
            </p>
            <div className="w-full bg-blue-50 p-4 rounded-xl">
              <h4 className="font-semibold text-blue-800 mb-2">What happens next:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Expert analysis begins immediately</li>
                <li>• You'll receive updates via phone/SMS</li>
                <li>• Detailed report ready within 24-48 hours</li>
                <li>• Live chat support available</li>
              </ul>
            </div>
            <div className="flex space-x-3 w-full">
              <Button 
                onClick={() => navigate('/verification-agent')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              >
                View Live Support
              </Button>
              <Button 
                onClick={() => setShowAgentModal(false)}
                variant="outline"
                className="flex-1 rounded-xl"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default VerifyCoins;

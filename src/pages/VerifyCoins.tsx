
import { useState, useEffect } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import supabase from '@/lib/supabaseClient';
import StepIndicator from '@/components/verify-coins/StepIndicator';
import UserDetailsStep from '@/components/verify-coins/UserDetailsStep';
import CoinUploadStep from '@/components/verify-coins/CoinUploadStep';
import PaymentStep from '@/components/verify-coins/PaymentStep';
import PaymentModal from '@/components/verify-coins/PaymentModal';
import SuccessModal from '@/components/verify-coins/SuccessModal';
import AgentModal from '@/components/verify-coins/AgentModal';

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
  
  const [formData, setFormData] = useState({
    coin_name: '',
    phone: '',
    description: '',
    coinImages: {} as Record<number, { front?: File, back?: File }>
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

  const canNavigateToStep = (step: number) => {
    if (step === 1) return true;
    if (step === 2) return validateStep1();
    if (step === 3) return validateStep1() && validateStep2();
    return false;
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

  const handleFormDataChange = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const totalPrice = coinCount * basePrice;
  const hasFreeVerification = coinCount >= 5;
  const totalCoinsToUpload = hasFreeVerification ? coinCount + 1 : coinCount;
  
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
            <StepIndicator 
              currentStep={verificationStep}
              onStepClick={handleStepClick}
              canNavigateToStep={canNavigateToStep}
            />
            
            {verificationStep === 1 && (
              <UserDetailsStep
                formData={formData}
                errors={errors}
                onFormDataChange={handleFormDataChange}
                onNext={handleNextStep}
              />
            )}
            
            {verificationStep === 2 && (
              <CoinUploadStep
                coinCount={coinCount}
                formData={formData}
                errors={errors}
                onCoinCountChange={setCoinCount}
                onFormDataChange={handleFormDataChange}
                onFileUpload={handleFileUpload}
                onNext={handleNextStep}
                onBack={() => setVerificationStep(1)}
              />
            )}
            
            {verificationStep === 3 && (
              <PaymentStep
                coinCount={coinCount}
                totalPrice={totalPrice}
                hasFreeVerification={hasFreeVerification}
                totalCoinsToUpload={totalCoinsToUpload}
                isSubmitting={isSubmitting}
                onPayment={handlePayment}
                onBack={() => setVerificationStep(2)}
              />
            )}
          </div>
        </div>
      </main>
      
      <PaymentModal
        isOpen={showQRModal}
        totalPrice={totalPrice}
        onClose={() => setShowQRModal(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      <AgentModal
        isOpen={showAgentModal}
        onClose={() => setShowAgentModal(false)}
        onViewLiveSupport={() => navigate('/verification-agent')}
      />
      
      <Footer />
    </div>
  );
};

export default VerifyCoins;

import { useState } from 'react';
import { Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PhoneLoginForm = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [errors, setErrors] = useState<{phone?: string; otp?: string}>({});
  
  const { isLoading, handlePhoneSignIn, handleVerifyOtp } = useSupabaseAuth();
  const { toast } = useToast();

  const validatePhone = () => {
    if (!phone) {
      setErrors({phone: 'Phone number is required'});
      return false;
    }
    if (!/^\+[1-9]\d{1,14}$/.test(phone)) {
      setErrors({phone: 'Please include country code (e.g., +1)'});
      return false;
    }
    setErrors({});
    return true;
  };

  const validateOtp = () => {
    if (!otp || otp.length !== 6) {
      setErrors({otp: 'Please enter the 6-digit code'});
      return false;
    }
    setErrors({});
    return true;
  };

  const checkExistingPhoneUser = async (phone: string) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('id')
        .eq('phone', phone)
        .single();
      
      return !!data;
    } catch (error) {
      return false;
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhone()) return;
    
    // Check if this is for signup and phone already exists
    if (isSignUp) {
      const phoneExists = await checkExistingPhoneUser(phone);
      if (phoneExists) {
        toast({
          title: "Account already exists",
          description: "An account with this phone number already exists. Please sign in instead.",
          variant: "destructive"
        });
        setIsSignUp(false);
        return;
      }
    }
    
    const success = await handlePhoneSignIn(phone);
    if (success) {
      setIsOtpSent(true);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateOtp()) return;
    
    const success = await handleVerifyOtp(phone, otp);
    if (!success) {
      setOtp('');
    }
  };

  return (
    <div className="space-y-4">
      {!isOtpSent ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <Input
              id="phone-number"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors({...errors, phone: undefined});
              }}
              placeholder="+1 (555) 555-5555"
              disabled={isLoading}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            <p className="mt-1 text-xs text-gray-500">
              Include country code (e.g., +1 for US)
            </p>
          </div>
          
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              id="signup-mode"
              checked={isSignUp}
              onChange={(e) => setIsSignUp(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="signup-mode" className="text-sm text-gray-600">
              New user (Sign up)
            </label>
          </div>
          
          <Button type="submit" className="w-full bg-royal hover:bg-royal/90 text-white rounded-lg" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Verification Code"}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="space-y-4">
          <div>
            <label htmlFor="otp-code" className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <div className="flex justify-center mb-2">
              <InputOTP
                value={otp}
                onChange={(value) => {
                  setOtp(value);
                  if (errors.otp) setErrors({...errors, otp: undefined});
                }}
                maxLength={6}
                disabled={isLoading}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
            <p className="text-xs text-gray-500 text-center">
              Enter the 6-digit code sent to {phone}
            </p>
          </div>
          
          <Button type="submit" className="w-full bg-royal hover:bg-royal/90 text-white rounded-lg" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify Code"}
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            className="w-full rounded-lg" 
            onClick={() => {
              setIsOtpSent(false);
              setOtp('');
              setErrors({});
            }}
            disabled={isLoading}
          >
            Change Phone Number
          </Button>
        </form>
      )}
      
      <div className="flex items-center justify-center space-x-2 mt-4">
        <Phone className="h-5 w-5 text-royal" />
        <p className="text-sm text-gray-600">
          {isOtpSent ? "Code sent to your phone" : "We'll send a one-time code to your phone"}
        </p>
      </div>
    </div>
  );
};

export default PhoneLoginForm;

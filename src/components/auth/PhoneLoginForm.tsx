
import { useState } from 'react';
import { Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface PhoneLoginFormProps {
  supabaseClient: any | null;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const PhoneLoginForm = ({ supabaseClient, isLoading, setIsLoading }: PhoneLoginFormProps) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supabaseClient) {
      toast({
        title: "Authentication Error",
        description: "Authentication service is not available.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    if (!isOtpSent) {
      // Send OTP
      try {
        const { data, error } = await supabaseClient.auth.signInWithOtp({
          phone,
        });
        
        if (error) throw error;
        
        setIsOtpSent(true);
        toast({
          title: "OTP sent",
          description: "Please check your phone for the verification code.",
        });
      } catch (error: any) {
        toast({
          title: "Failed to send OTP",
          description: error.message || "Please check your phone number and try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // Verify OTP
      try {
        const { data, error } = await supabaseClient.auth.verifyOtp({
          phone,
          token: otp,
          type: 'sms'
        });
        
        if (error) throw error;
        
        toast({
          title: "Phone verification successful!",
          description: "You are now logged in.",
        });
        
        navigate('/profile');
      } catch (error: any) {
        toast({
          title: "Verification failed",
          description: error.message || "Invalid code. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handlePhoneLogin} className="space-y-4">
      <div>
        <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <Input
          id="phone-number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1 (555) 555-5555"
          required
          disabled={isLoading || isOtpSent}
        />
        <p className="mt-1 text-xs text-gray-500">
          Include country code (e.g., +1 for US)
        </p>
      </div>
      
      {isOtpSent && (
        <div>
          <label htmlFor="otp-code" className="block text-sm font-medium text-gray-700 mb-1">
            Verification Code
          </label>
          <Input
            id="otp-code"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="123456"
            required
            disabled={isLoading}
            maxLength={6}
          />
        </div>
      )}
      
      <Button type="submit" className="w-full bg-royal hover:bg-royal-light text-white" disabled={isLoading}>
        {isLoading ? "Processing..." : isOtpSent ? "Verify Code" : "Send Verification Code"}
      </Button>
      
      {isOtpSent && (
        <Button 
          type="button" 
          variant="outline" 
          className="w-full mt-2" 
          onClick={() => setIsOtpSent(false)}
          disabled={isLoading}
        >
          Change Phone Number
        </Button>
      )}
      
      <div className="flex items-center justify-center space-x-2 mt-4">
        <Phone className="h-5 w-5 text-royal" />
        <p className="text-sm text-gray-600">
          We'll send a one-time code to your phone
        </p>
      </div>
    </form>
  );
};

export default PhoneLoginForm;

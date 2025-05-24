
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
        
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user || null);
        });
        
        return () => {
          authListener.subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        toast({
          title: "Authentication Error",
          description: "Could not connect to authentication service.",
          variant: "destructive"
        });
      }
    };
    
    initializeAuth();
  }, [toast]);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/profile`
        }
      });
      
      if (error) throw error;
      
    } catch (error: any) {
      toast({
        title: "Google sign in failed",
        description: error.message || "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Login successful!",
        description: "Welcome back to NumismaticScholar.",
      });
      
      navigate('/profile');
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async (email: string, password: string, fullName: string, phone: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone,
          },
        },
      });
      
      if (error) throw error;
      
      toast({
        title: "Registration successful!",
        description: "Please check your email for verification.",
      });
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Please check your information and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSignIn = async (phone: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithOtp({
        phone,
      });
      
      if (error) throw error;
      
      toast({
        title: "OTP sent",
        description: "Please check your phone for the verification code.",
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Failed to send OTP",
        description: error.message || "Please check your phone number and try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (phone: string, otp: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.verifyOtp({
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
      return true;
    } catch (error: any) {
      toast({
        title: "Verification failed",
        description: error.message || "Invalid code. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    user,
    isLoading, 
    setIsLoading,
    handleGoogleSignIn,
    handleEmailSignIn,
    handleEmailSignUp,
    handlePhoneSignIn,
    handleVerifyOtp
  };
};


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Initialize auth state with better session handling
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        
        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
        }
        
        console.log('Initial session:', session?.user?.email);
        setUser(session?.user || null);
        setIsInitialized(true);
        
        // Listen to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log('Auth state changed:', event, session?.user?.email);
          
          // Handle different auth events
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            setUser(session?.user || null);
            if (session?.user && event === 'SIGNED_IN') {
              await ensureProfileExists(session.user);
            }
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
          }
        });
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        toast({
          title: "Authentication Error",
          description: "Could not connect to authentication service.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeAuth();
  }, [toast]);

  // Ensure user profile exists in profiles table
  const ensureProfileExists = async (user: any) => {
    try {
      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (!existingProfile) {
        // Create new profile
        const { error } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email,
            phone: user.phone,
            full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
            avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
          });

        if (error) {
          console.error('Error creating profile:', error);
        }
      }
    } catch (error) {
      console.error('Error ensuring profile exists:', error);
    }
  };

  // Check for existing user by email or phone
  const checkExistingUser = async (email: string, phone?: string) => {
    try {
      const { data: emailExists } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

      if (emailExists) {
        return { exists: true, type: 'email' };
      }

      if (phone) {
        const { data: phoneExists } = await supabase
          .from('profiles')
          .select('id')
          .eq('phone', phone)
          .single();

        if (phoneExists) {
          return { exists: true, type: 'phone' };
        }
      }

      return { exists: false, type: null };
    } catch (error) {
      // If no records found, that's expected
      return { exists: false, type: null };
    }
  };

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
        title: "Welcome back!",
        description: "You have successfully signed in.",
        className: "bg-green-50 border-green-200 text-green-800"
      });
      
      navigate('/profile');
    } catch (error: any) {
      toast({
        title: "Sign in failed",
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
      
      // Check for existing user
      const existingUser = await checkExistingUser(email, phone);
      if (existingUser.exists) {
        const fieldType = existingUser.type === 'email' ? 'email address' : 'phone number';
        toast({
          title: "Account already exists",
          description: `An account with this ${fieldType} already exists. Please sign in instead.`,
          variant: "destructive"
        });
        return;
      }

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
        className: "bg-green-50 border-green-200 text-green-800"
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
        title: "Verification code sent",
        description: "Please check your phone for the OTP code.",
        className: "bg-blue-50 border-blue-200 text-blue-800"
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Failed to send code",
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
        title: "Welcome!",
        description: "You have successfully signed in with your phone.",
        className: "bg-green-50 border-green-200 text-green-800"
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
    isInitialized,
    setIsLoading,
    handleGoogleSignIn,
    handleEmailSignIn,
    handleEmailSignUp,
    handlePhoneSignIn,
    handleVerifyOtp
  };
};

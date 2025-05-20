
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { ConfigContext } from "@/App";

export const useSupabaseAuth = () => {
  const [supabaseClient, setSupabaseClient] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { supabaseConfigured } = useContext(ConfigContext);
  
  // Initialize Supabase client
  useEffect(() => {
    const initializeSupabase = async () => {
      if (supabaseConfigured) {
        try {
          const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
          const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
          
          if (!supabaseUrl || !supabaseAnonKey) {
            throw new Error("Supabase environment variables are not set");
          }
          
          const { createClient } = await import('@supabase/supabase-js');
          const supabase = createClient(supabaseUrl, supabaseAnonKey);
          setSupabaseClient(supabase);
          
          // Check if user is already logged in
          const { data } = await supabase.auth.getSession();
          if (data.session) {
            navigate('/profile');
          }
        } catch (error) {
          console.error("Failed to initialize Supabase:", error);
          toast({
            title: "Connection Error",
            description: "Could not connect to authentication service.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Configuration Error",
          description: "Authentication service is not properly configured.",
          variant: "destructive"
        });
      }
    };
    
    initializeSupabase();
  }, [navigate, toast, supabaseConfigured]);

  const handleGoogleSignIn = async () => {
    if (!supabaseClient) {
      toast({
        title: "Authentication Error",
        description: "Authentication service is not available.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const { data, error } = await supabaseClient.auth.signInWithOAuth({
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
    }
  };

  return { 
    supabaseClient, 
    isLoading, 
    setIsLoading, 
    supabaseConfigured,
    handleGoogleSignIn
  };
};

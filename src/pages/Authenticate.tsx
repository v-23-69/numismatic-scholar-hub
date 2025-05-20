import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, GitHub, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { ConfigContext } from "@/App";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Initialize Supabase client only if environment variables are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const Authenticate = () => {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [supabaseClient, setSupabaseClient] = useState<any>(null);
  
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
  
  const handleLogin = async (e: React.FormEvent) => {
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
    
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
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
  
  const handleRegister = async (e: React.FormEvent) => {
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
    
    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
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
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-royal/5 to-white">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-xl shadow-lg border border-gold/20 overflow-hidden">
            {!supabaseConfigured && (
              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold text-royal mb-2">Authentication Not Available</h2>
                <p className="text-gray-600 mb-4">
                  The authentication service is not properly configured. Please set the required Supabase environment variables.
                </p>
                <Link to="/">
                  <Button variant="outline">Return to Home</Button>
                </Link>
              </div>
            )}
            
            {supabaseConfigured && !supabaseClient && (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-royal mx-auto mb-4"></div>
                <p className="text-gray-600">Connecting to authentication service...</p>
              </div>
            )}
            
            {supabaseClient && (
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid grid-cols-3 h-14">
                  <TabsTrigger value="login" className="text-lg">Sign In</TabsTrigger>
                  <TabsTrigger value="register" className="text-lg">Register</TabsTrigger>
                  <TabsTrigger value="phone" className="text-lg">Phone</TabsTrigger>
                </TabsList>
                
                {/* Login Form */}
                <TabsContent value="login" className="p-6">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Input
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
                          Password
                        </label>
                        <Link to="/forgot-password" className="text-xs text-royal hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="remember-me" 
                        checked={rememberMe} 
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        disabled={isLoading}
                      />
                      <label htmlFor="remember-me" className="text-sm text-gray-600">
                        Remember me
                      </label>
                    </div>
                    
                    <Button type="submit" className="w-full bg-royal hover:bg-royal-light text-white" disabled={isLoading}>
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                    
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button type="button" variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
                        <Mail className="h-5 w-5 mr-2" />
                        Google
                      </Button>
                      <Button type="button" variant="outline" className="w-full" disabled={isLoading}>
                        <Github className="h-5 w-5 mr-2" />
                        GitHub
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                {/* Register Form */}
                <TabsContent value="register" className="p-6">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label htmlFor="register-username" className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <Input
                        id="register-username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="johndoe"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Input
                        id="register-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          minLength={8}
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Password must be at least 8 characters
                      </p>
                    </div>
                    
                    <Button type="submit" className="w-full bg-royal hover:bg-royal-light text-white" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                    
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or register with</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button type="button" variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
                        <Mail className="h-5 w-5 mr-2" />
                        Google
                      </Button>
                      <Button type="button" variant="outline" className="w-full" disabled={isLoading}>
                        <Github className="h-5 w-5 mr-2" />
                        GitHub
                      </Button>
                    </div>
                    
                    <p className="text-xs text-center text-gray-500 mt-4">
                      By registering, you agree to our{" "}
                      <Link to="/terms" className="text-royal hover:underline">Terms of Service</Link> and{" "}
                      <Link to="/privacy" className="text-royal hover:underline">Privacy Policy</Link>.
                    </p>
                  </form>
                </TabsContent>
                
                {/* Phone Login Form */}
                <TabsContent value="phone" className="p-6">
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
                </TabsContent>
              </Tabs>
            )}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Authenticate;

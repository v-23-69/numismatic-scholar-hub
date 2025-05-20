
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ConfigContext } from "@/App";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import PhoneLoginForm from '@/components/auth/PhoneLoginForm';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

const Authenticate = () => {
  const { 
    supabaseClient, 
    isLoading, 
    setIsLoading, 
    supabaseConfigured,
    handleGoogleSignIn 
  } = useSupabaseAuth();

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
                  <LoginForm 
                    supabaseClient={supabaseClient}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                </TabsContent>
                
                {/* Register Form */}
                <TabsContent value="register" className="p-6">
                  <RegisterForm 
                    supabaseClient={supabaseClient}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    handleGoogleSignIn={handleGoogleSignIn}
                  />
                </TabsContent>
                
                {/* Phone Login Form */}
                <TabsContent value="phone" className="p-6">
                  <PhoneLoginForm 
                    supabaseClient={supabaseClient}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
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

<<<<<<< HEAD
=======

>>>>>>> 813d0fd0065b6f839cbd5b9921e4616d9d2a780c
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import PhoneLoginForm from '@/components/auth/PhoneLoginForm';

const Authenticate = () => {
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
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid grid-cols-3 h-14 bg-gray-50">
                <TabsTrigger value="login" className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-royal">Sign In</TabsTrigger>
                <TabsTrigger value="register" className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-royal">Register</TabsTrigger>
                <TabsTrigger value="phone" className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-royal">Phone</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="p-6">
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-bold text-royal font-playfair">Welcome Back</h2>
                  <p className="text-gray-600 mt-2">Sign in to your NumismaticScholar account</p>
                </div>
                <LoginForm />
              </TabsContent>
              
              <TabsContent value="register" className="p-6">
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-bold text-royal font-playfair">Join Us</h2>
                  <p className="text-gray-600 mt-2">Create your NumismaticScholar account</p>
                </div>
                <RegisterForm />
              </TabsContent>
              
              <TabsContent value="phone" className="p-6">
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-bold text-royal font-playfair">Phone Login</h2>
                  <p className="text-gray-600 mt-2">Sign in with your mobile number</p>
                </div>
                <PhoneLoginForm />
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Authenticate;

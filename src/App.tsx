<<<<<<< HEAD
=======

>>>>>>> 813d0fd0065b6f839cbd5b9921e4616d9d2a780c
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
<<<<<<< HEAD
import CoinsMarket from "./pages/Marketplace";
import VerifyCoins from "./pages/VerifyCoins";
=======
import CoinsMarket from "./pages/Marketplace"; // Renamed from Marketplace
import VerifyCoins from "./pages/VerifyCoins"; // New page
>>>>>>> 813d0fd0065b6f839cbd5b9921e4616d9d2a780c
import Community from "./pages/Community";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Authenticate from "./pages/Authenticate";
import NotFound from "./pages/NotFound";
import WelcomeModal from "./components/WelcomeModal";
<<<<<<< HEAD
=======
import { createClient } from '@supabase/supabase-js';
>>>>>>> 813d0fd0065b6f839cbd5b9921e4616d9d2a780c
import LegalPage from "./pages/LegalPage";
import Mentors from "./pages/Mentors";
import Articles from "./pages/Articles";
import Wishlist from "./pages/Wishlist";
import Purchases from "./pages/Purchases";
import { WishlistProvider } from "./context/WishlistContext";
<<<<<<< HEAD
import supabase from '@/lib/supabaseClient';
=======
>>>>>>> 813d0fd0065b6f839cbd5b9921e4616d9d2a780c

// Create a context to indicate if Supabase is properly configured
export const ConfigContext = createContext({
  supabaseConfigured: false,
  supabaseClient: null as any,
});

const App = () => {
  // Create a new QueryClient instance inside the component
  const [queryClient] = useState(() => new QueryClient());
  
  // Check if Supabase environment variables are available
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
<<<<<<< HEAD

  return (
    <ConfigContext.Provider value={{ supabaseConfigured, supabaseClient: supabase }}>
=======
  
  // Initialize Supabase client if configured
  const [supabaseClient] = useState(() => {
    if (supabaseConfigured) {
      return createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        }
      });
    }
    return null;
  });

  return (
    <ConfigContext.Provider value={{ supabaseConfigured, supabaseClient }}>
>>>>>>> 813d0fd0065b6f839cbd5b9921e4616d9d2a780c
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WishlistProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <WelcomeModal />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:courseId" element={<Courses />} />
                <Route path="/coins-market" element={<CoinsMarket />} />
                <Route path="/coins-market/:coinId" element={<CoinsMarket />} />
                <Route path="/verify-coins" element={<VerifyCoins />} />
                <Route path="/community" element={<Community />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/authenticate" element={<Authenticate />} />
                <Route path="/login" element={<Authenticate />} />
                <Route path="/mentors" element={<Mentors />} />
                <Route path="/mentors/:mentorId" element={<Mentors />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/articles/:articleId" element={<Articles />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/purchases" element={<Purchases />} />
                
                {/* Legal Pages */}
                <Route path="/legal/privacy-policy" element={<LegalPage type="privacy" />} />
                <Route path="/legal/terms-of-service" element={<LegalPage type="terms" />} />
                <Route path="/legal/refund-policy" element={<LegalPage type="refund" />} />
                <Route path="/legal/verification-process" element={<LegalPage type="verification" />} />
                <Route path="/legal/cookie-policy" element={<LegalPage type="cookie" />} />
                
                {/* Search Results */}
                <Route path="/search" element={<Index />} />
                
                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </WishlistProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ConfigContext.Provider>
  );
};

export default App;


import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "@/context/WishlistContext";

const queryClient = new QueryClient();

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Courses = lazy(() => import("./pages/Courses"));
const Articles = lazy(() => import("./pages/Articles"));
const Community = lazy(() => import("./pages/Community"));
const Mentors = lazy(() => import("./pages/Mentors"));
const Profile = lazy(() => import("./pages/Profile"));
const Authenticate = lazy(() => import("./pages/Authenticate"));
const Login = lazy(() => import("./pages/Login"));
const VerifyCoins = lazy(() => import("./pages/VerifyCoins"));
const VerificationProcess = lazy(() => import("./pages/VerificationProcess"));
const VerificationAgent = lazy(() => import("./pages/VerificationAgent"));
const AgentSupport = lazy(() => import("./pages/AgentSupport"));
const LiveSupport = lazy(() => import("./pages/LiveSupport"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const Purchases = lazy(() => import("./pages/Purchases"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const CoinDetails = lazy(() => import("./pages/CoinDetails"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WishlistProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal"></div>
          </div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/community" element={<Community />} />
              <Route path="/mentors" element={<Mentors />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/authenticate" element={<Authenticate />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify-coins" element={<VerifyCoins />} />
              <Route path="/verification-process" element={<VerificationProcess />} />
              <Route path="/verification-agent" element={<VerificationAgent />} />
              <Route path="/agent-support" element={<AgentSupport />} />
              <Route path="/live-support" element={<LiveSupport />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/legal" element={<LegalPage />} />
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/coins-market" element={<Marketplace />} />
              <Route path="/coins-market/:coinId" element={<CoinDetails />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </WishlistProvider>
  </QueryClientProvider>
);

export default App;

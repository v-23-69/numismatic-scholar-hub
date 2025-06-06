import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import WelcomeModal from "./components/WelcomeModal";
import PromotionalPopup from "./components/PromotionalPopup";

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal"></div>
  </div>
);

// Error fallback for route-level errors
const RouteErrorFallback = ({ error }: { error: Error }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-xl font-bold text-red-600 mb-2">Page Error</h2>
      <p className="text-gray-600">Unable to load this page</p>
      <button 
        onClick={() => window.location.href = '/'} 
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Go Home
      </button>
    </div>
  </div>
);

// Lazy load pages with error boundaries
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
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const SellerDashboard = lazy(() => import("./pages/SellerDashboard"));
const BuyerDashboard = lazy(() => import("./pages/BuyerDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Orders = lazy(() => import("./pages/Orders"));

const App = () => {
  return (
    <>
      <Toaster />
      <Sonner />
      <WelcomeModal />
      <PromotionalPopup />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<Courses />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:articleId" element={<Articles />} />
          <Route path="/community" element={<Community />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/mentors/:mentorId" element={<Mentors />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-coins" element={<VerifyCoins />} />
          <Route path="/verification-process" element={<VerificationProcess />} />
          <Route path="/verification-agent" element={<VerificationAgent />} />
          <Route path="/agent-support" element={<AgentSupport />} />
          <Route path="/live-support" element={<LiveSupport />} />
          
          {/* Legal Pages - New individual pages */}
          <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/legal/terms-of-service" element={<TermsOfService />} />
          <Route path="/legal/refund-policy" element={<RefundPolicy />} />
          <Route path="/legal/verification-process" element={<VerificationProcess />} />
          <Route path="/legal/cookie-policy" element={<CookiePolicy />} />
          
          {/* Legacy Legal Pages - Keep existing LegalPage for backwards compatibility */}
          <Route path="/legal/privacy" element={<LegalPage type="privacy" />} />
          <Route path="/legal/terms" element={<LegalPage type="terms" />} />
          <Route path="/legal/refund" element={<LegalPage type="refund" />} />
          <Route path="/legal/verification" element={<LegalPage type="verification" />} />
          <Route path="/legal/cookie" element={<LegalPage type="cookie" />} />
          
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/coins-market" element={<Marketplace />} />
          <Route path="/coins-market/:coinId" element={<CoinDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/confirmation" element={<OrderConfirmation />} />
          <Route path="/orders" element={<Orders />} />
          
          {/* Dashboard Routes */}
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          
          {/* Search Results */}
          <Route path="/search" element={<Index />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;

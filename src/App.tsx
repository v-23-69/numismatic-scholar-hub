
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WishlistProvider } from './context/WishlistContext';
import { Toaster } from "@/components/ui/toaster";

// Pages
import Index from './pages/Index';
import About from './pages/About';
import Courses from './pages/Courses';
import Marketplace from './pages/Marketplace';
import Community from './pages/Community';
import Articles from './pages/Articles';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Wishlist from './pages/Wishlist';
import Purchases from './pages/Purchases';
import Mentors from './pages/Mentors';
import Authenticate from './pages/Authenticate';
import VerifyCoins from './pages/VerifyCoins';
import VerificationProcess from './pages/VerificationProcess';
import VerificationAgent from './pages/VerificationAgent';
import AgentSupport from './pages/AgentSupport';
import LiveSupport from './pages/LiveSupport';
import LegalPage from './pages/LegalPage';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import CookiePolicy from './pages/CookiePolicy';
import NotFound from './pages/NotFound';

// Components
import PromotionalPopup from './components/PromotionalPopup';
import WelcomeModal from './components/WelcomeModal';
import FloatingActionButton from './components/FloatingActionButton';

import './App.css';

const queryClient = new QueryClient();

// Helper function to scroll to top
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <WishlistProvider>
          <div className="App">
            <Toaster />
            <PromotionalPopup />
            <WelcomeModal />
            <FloatingActionButton />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/community" element={<Community />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/mentors" element={<Mentors />} />
              <Route path="/authenticate" element={<Authenticate />} />
              <Route path="/verify-coins" element={<VerifyCoins />} />
              <Route path="/verification-process" element={<VerificationProcess />} />
              <Route path="/verification-agent" element={<VerificationAgent />} />
              <Route path="/agent-support" element={<AgentSupport />} />
              <Route path="/live-support" element={<LiveSupport />} />
              <Route path="/legal" element={<LegalPage />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/refund" element={<RefundPolicy />} />
              <Route path="/cookies" element={<CookiePolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </WishlistProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

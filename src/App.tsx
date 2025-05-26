import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { WishlistProvider } from '@/context/WishlistContext';
import Index from '@/pages/Index';
import About from '@/pages/About';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import RefundPolicy from '@/pages/RefundPolicy';
import FloatingActionButton from "@/components/FloatingActionButton";

function App() {
  return (
    <WishlistProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
        </Routes>
        <Toaster />
        <FloatingActionButton />
      </Router>
    </WishlistProvider>
  );
}

export default App;

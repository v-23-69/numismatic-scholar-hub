
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import Marketplace from "./pages/Marketplace";
import Community from "./pages/Community";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Authenticate from "./pages/Authenticate";
import NotFound from "./pages/NotFound";

// Create a context to indicate if Supabase is properly configured
export const ConfigContext = createContext({
  supabaseConfigured: false,
});

const App = () => {
  // Create a new QueryClient instance inside the component
  const [queryClient] = useState(() => new QueryClient());
  
  // Check if Supabase environment variables are available
  const supabaseConfigured = Boolean(
    import.meta.env.VITE_SUPABASE_URL && 
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  return (
    <ConfigContext.Provider value={{ supabaseConfigured }}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/community" element={<Community />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/authenticate" element={<Authenticate />} />
              <Route path="/login" element={<Authenticate />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ConfigContext.Provider>
  );
};

export default App;

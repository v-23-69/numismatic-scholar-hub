import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TooltipProvider } from "@/components/ui/tooltip"
import { WishlistProvider } from "@/context/WishlistContext"
import { ConfigContext } from "@/context/ConfigContext"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import supabase from '@/lib/supabaseClient'
import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

// Check if Supabase environment variables are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ErrorBoundary>
      <ConfigContext.Provider value={{ supabaseConfigured, supabaseClient: supabase }}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </ConfigContext.Provider>
    </ErrorBoundary>
  </BrowserRouter>
);

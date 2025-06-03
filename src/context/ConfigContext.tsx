import { createContext } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import supabase from '@/lib/supabaseClient';

interface ConfigContextType {
  supabaseClient: SupabaseClient;
  supabaseConfigured: boolean;
}

export const ConfigContext = createContext<ConfigContextType>({
  supabaseClient: supabase,
  supabaseConfigured: false,
}); 
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/integrations/supabase/types' // <-- correct path

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)

export default supabase

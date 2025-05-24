import { SupabaseClient } from '@supabase/supabase-js';

export const getUserProfile = async (userId: string, supabaseClient: SupabaseClient) => {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return data;
};
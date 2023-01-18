import { Database } from "@/Interface/Supabase";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export const useSupabase = () => {
  const supabase = useSupabaseClient<Database>();

  return supabase;
};

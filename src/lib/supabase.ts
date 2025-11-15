import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase environment variables are missing. Running in offline mode.'
  );
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

export interface Database {
  public: {
    Tables: {
      supplements: {
        Row: {
          id: string;
          name: string;
          category: string;
          description: string;
          created_at: string;
        };
      };
      medications: {
        Row: {
          id: string;
          name: string;
          category: string;
          description: string;
          created_at: string;
        };
      };
      interactions: {
        Row: {
          id: string;
          supplement_id: string;
          medication_id: string;
          severity: 'low' | 'moderate' | 'high' | 'severe';
          description: string;
          recommendation: string;
          created_at: string;
        };
      };
    };
  };
}

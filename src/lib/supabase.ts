import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase configuration missing', { supabaseUrl, supabaseAnonKey });
  throw new Error('Supabase configuration missing');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

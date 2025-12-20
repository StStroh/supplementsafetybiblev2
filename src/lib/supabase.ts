/// <reference types="vite/client" />
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { getEnv } from './env';

type Client = SupabaseClient<any, "public", any>;

declare global {
  var __ssb_supabase_client: Client | undefined;
}

let supabase: Client;

const { url, anon, ok } = getEnv();

if (ok) {
  if (globalThis.__ssb_supabase_client) {
    console.error('[SUPABASE SINGLETON VIOLATION] Attempted to create second Supabase client instance.');
    console.error('[SUPABASE SINGLETON VIOLATION] Stack trace:', new Error().stack);
    supabase = globalThis.__ssb_supabase_client;
  } else {
    console.log('[SUPABASE SINGLETON] First initialization:', { url, storageKey: 'sb-auth-token' });
    supabase = createClient(url, anon, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    }) as Client;
    globalThis.__ssb_supabase_client = supabase;
  }
} else {
  const fail = new Proxy({} as Client, {
    get() {
      throw new Error("Supabase configuration missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
    },
  }) as Client;
  supabase = fail;
}

export { supabase };

export type Database = {
  public: {
    Tables: {
      supplements: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          created_at?: string;
        };
      };
      medications: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          created_at?: string;
        };
      };
      interactions: {
        Row: {
          id: string;
          supplement_id: string;
          medication_id: string;
          severity: string;
          description: string;
          recommendation: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          supplement_id: string;
          medication_id: string;
          severity: string;
          description: string;
          recommendation: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          supplement_id?: string;
          medication_id?: string;
          severity?: string;
          description?: string;
          recommendation?: string;
          created_at?: string;
        };
      };
      supplement_synonyms: {
        Row: {
          synonym_key: string;
          canonical_key: string;
          created_at: string;
        };
        Insert: {
          synonym_key: string;
          canonical_key: string;
          created_at?: string;
        };
        Update: {
          synonym_key?: string;
          canonical_key?: string;
          created_at?: string;
        };
      };
      medication_synonyms: {
        Row: {
          synonym_key: string;
          canonical_key: string;
          created_at: string;
        };
        Insert: {
          synonym_key: string;
          canonical_key: string;
          created_at?: string;
        };
        Update: {
          synonym_key?: string;
          canonical_key?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      v_supp_keys: {
        Row: {
          key: string;
          canonical: string;
        };
      };
      v_med_keys: {
        Row: {
          key: string;
          canonical: string;
        };
      };
    };
  };
};

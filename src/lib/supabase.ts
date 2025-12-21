/*
 * ⚠️ PRODUCTION-CRITICAL: Supabase Client Singleton
 *
 * This creates THE ONLY Supabase client instance for the entire app.
 * Multiple clients cause auth conflicts and session corruption.
 *
 * STORAGE_KEY must match production Supabase project ID.
 * See: OPERATIONS.md → Auth Failures
 */
/// <reference types="vite/client" />
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { getEnv } from './env';

type Client = SupabaseClient<any, "public", any>;

const STORAGE_KEY = 'sb-cyxfxjoadzxhxwxjqkez-auth-token';

declare global {
  var __ssb_supabase_client: Client | undefined;
  var __ssb_init_count: number | undefined;
}

if (!globalThis.__ssb_init_count) {
  globalThis.__ssb_init_count = 0;
}

let supabase: Client;

const { url, anon, ok } = getEnv();

if (ok) {
  if (globalThis.__ssb_supabase_client) {
    globalThis.__ssb_init_count++;
    console.warn(`[SSB] Reusing existing client (init attempt #${globalThis.__ssb_init_count})`);
    supabase = globalThis.__ssb_supabase_client;
  } else {
    globalThis.__ssb_init_count++;
    console.log(`[SSB] Creating first client instance with storage key: ${STORAGE_KEY}`);
    supabase = createClient(url, anon, {
      auth: {
        storageKey: STORAGE_KEY,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storage: window.localStorage
      }
    }) as Client;
    globalThis.__ssb_supabase_client = supabase;
    console.log('[SSB] ✅ Singleton established');
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

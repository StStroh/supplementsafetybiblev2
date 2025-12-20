/// <reference types="vite/client" />
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { getEnv } from './env';

type Client = SupabaseClient<any, "public", any>;

declare global {
  interface Window {
    __ssb_supabase_client?: Client;
    __ssb_supabase_initializing?: boolean;
    __ssb_init_count?: number;
  }
}

let clientInstance: Client | undefined;

function initSupabaseClient(): Client {
  const global = typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : undefined);

  if (global) {
    if (global.__ssb_supabase_client) {
      console.error('[SUPABASE] createClient() SECOND init attempt — STACK TRACE:');
      console.trace();
      return global.__ssb_supabase_client;
    }

    if (global.__ssb_supabase_initializing) {
      throw new Error('Supabase client is already initializing. This should not happen.');
    }

    global.__ssb_supabase_initializing = true;
    global.__ssb_init_count = (global.__ssb_init_count || 0) + 1;
  }

  const { url, anon, ok } = getEnv();

  const storageKey = `sb-${url?.split('//')[1]?.split('.')[0] || 'unknown'}-auth-token`;

  let client: Client;

  if (ok) {
    console.info('[SUPABASE] createClient() FIRST init', { url, storageKey });

    client = createClient(url, anon, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storageKey
      }
    }) as Client;
  } else {
    client = new Proxy({} as Client, {
      get() {
        throw new Error("Supabase configuration missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      },
    }) as Client;
  }

  if (global) {
    global.__ssb_supabase_client = client;
    global.__ssb_supabase_initializing = false;
  }

  return client;
}

function getSupabaseClient(): Client {
  if (!clientInstance) {
    clientInstance = initSupabaseClient();
  }
  return clientInstance;
}

export function getSupabase(): Client {
  return getSupabaseClient();
}

export const supabase = new Proxy({} as Client, {
  get(_, prop) {
    return getSupabaseClient()[prop as keyof Client];
  }
});

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

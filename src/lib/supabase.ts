/// <reference types="vite/client" />
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { getEnv } from './env';

type Client = SupabaseClient<any, "public", any>;

declare global {
  interface Window {
    __supabase_client?: Client;
    __supabase_initializing?: boolean;
  }
}

let clientInstance: Client | undefined;

function initSupabaseClient(): Client {
  if (typeof window !== 'undefined') {
    if (window.__supabase_client) {
      return window.__supabase_client;
    }

    if (window.__supabase_initializing) {
      throw new Error('Supabase client is already initializing. This should not happen.');
    }

    window.__supabase_initializing = true;
  }

  const { url, anon, ok } = getEnv();

  let client: Client;

  if (ok) {
    client = createClient(url, anon, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    }) as Client;
  } else {
    client = new Proxy({} as Client, {
      get() {
        throw new Error("Supabase configuration missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      },
    }) as Client;
  }

  if (typeof window !== 'undefined') {
    window.__supabase_client = client;
    window.__supabase_initializing = false;
  }

  return client;
}

function getSupabaseClient(): Client {
  if (!clientInstance) {
    clientInstance = initSupabaseClient();
  }
  return clientInstance;
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

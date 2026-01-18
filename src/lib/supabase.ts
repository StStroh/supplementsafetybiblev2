/*
 * ⚠️ PRODUCTION-CRITICAL: Supabase Client Singleton
 *
 * This creates THE ONLY Supabase client instance for the entire app.
 * Multiple clients cause auth conflicts and session corruption.
 *
 * STORAGE_KEY is dynamically derived from the current project URL.
 * Stale auth keys from other projects are automatically cleaned up.
 * See: OPERATIONS.md → Auth Failures
 */
/// <reference types="vite/client" />
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { getEnv } from './env';

type Client = SupabaseClient<any, "public", any>;

declare global {
  var __ssb_supabase_client: Client | undefined;
  var __ssb_init_count: number | undefined;
}

if (!globalThis.__ssb_init_count) {
  globalThis.__ssb_init_count = 0;
}

/**
 * Clean up stale Supabase auth keys from other project refs.
 * This prevents project mismatch errors when switching between Supabase projects.
 */
function cleanupStaleSupabaseAuth(currentProjectRef: string): void {
  if (typeof window === 'undefined' || !window.localStorage) return;

  const keysToRemove: string[] = [];

  // Scan all localStorage keys
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;

    // Match Supabase auth keys: sb-*-auth-token or sb-auth-*
    const isSupabaseAuthKey = key.startsWith('sb-') && (
      key.includes('-auth-token') ||
      key.startsWith('sb-auth-')
    );

    if (isSupabaseAuthKey) {
      // Extract the project ref from the key
      const keyProjectRef = key.match(/sb-([^-]+)-/)?.[1] || key.match(/sb-auth-([^-]+)/)?.[1];

      // If this key belongs to a different project, mark for removal
      if (keyProjectRef && keyProjectRef !== currentProjectRef) {
        keysToRemove.push(key);
      }
    }
  }

  // Remove stale keys
  if (keysToRemove.length > 0) {
    console.log(`[SSB] 🧹 Cleaning up ${keysToRemove.length} stale auth key(s) from other projects`);
    keysToRemove.forEach(key => {
      const maskedKey = key.replace(/sb-([^-]+)-/, 'sb-***-');
      console.log(`[SSB]   Removing: ${maskedKey}`);
      localStorage.removeItem(key);
    });
  }
}

let supabase: Client;

const { url, anon, ok } = getEnv();

if (ok) {
  // Extract project ref from URL
  const projectRef = url.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1] || 'unknown';

  // Build deterministic storage key based on current project
  const STORAGE_KEY = `sb-${projectRef}-auth-token`;

  if (globalThis.__ssb_supabase_client) {
    globalThis.__ssb_init_count++;
    console.warn(`[SSB] Reusing existing client (init attempt #${globalThis.__ssb_init_count})`);
    supabase = globalThis.__ssb_supabase_client;
  } else {
    globalThis.__ssb_init_count++;

    // Clean up stale auth keys from other projects BEFORE creating client
    cleanupStaleSupabaseAuth(projectRef);

    console.log(`[SSB] Creating first client instance`);
    console.log(`[SSB] Project ref: ${projectRef}`);
    console.log(`[SSB] Storage key: ${STORAGE_KEY}`);

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
    console.log('[SSB] ✅ Singleton established with deterministic storage key');
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

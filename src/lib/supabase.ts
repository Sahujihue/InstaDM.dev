import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ostskxaxeccubwnduyss.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_a038knHK5HlnzweVKJslmA_MdLnIa4L';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zdHNreGF4ZWNjdWJ3bmR1eXNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ1MTE4OTIsImV4cCI6MjExMDA4Nzg5Mn0.7nK24R_jJbrz-X3_qgETQozgUmGoc3Z9LoW3Mqht-lY';
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

let supabaseInstance: SupabaseClient | null = null;
let supabaseAdminInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;

  const url = SUPABASE_PROJECT_URL;
  let key = SUPABASE_PUBLISHABLE_KEY || SUPABASE_ANON_KEY;

  if (typeof window !== 'undefined') {
    try {
      const storedKey = localStorage.getItem('instadm_supabase_anon_key');
      if (storedKey) key = storedKey;
    } catch {}
  }

  if (url && key) {
    try {
      supabaseInstance = createClient(url, key, {
        auth: {
          persistSession: true,
          autoRefreshToken: true
        }
      });
      return supabaseInstance;
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
    }
  }

  return null;
}

export function getSupabaseAdminClient(): SupabaseClient | null {
  if (supabaseAdminInstance) return supabaseAdminInstance;

  const url = SUPABASE_PROJECT_URL;
  const key = SUPABASE_SECRET_KEY;

  if (url && key) {
    try {
      supabaseAdminInstance = createClient(url, key, {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        }
      });
      return supabaseAdminInstance;
    } catch (err) {
      console.warn('Failed to initialize Supabase admin client:', err);
    }
  }

  return null;
}

export const isSupabaseConfigured = (): boolean => {
  return Boolean(SUPABASE_PROJECT_URL && (SUPABASE_PUBLISHABLE_KEY || SUPABASE_ANON_KEY));
};

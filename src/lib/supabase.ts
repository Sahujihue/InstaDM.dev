import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ostskxaxeccubwnduyss.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zdHNreGF4ZWNjdWJ3bmR1eXNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ1MTE4OTIsImV4cCI6MjExMDA4Nzg5Mn0.7nK24R_jJbrz-X3_qgETQozgUmGoc3Z9LoW3Mqht-lY';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;

  const url = SUPABASE_PROJECT_URL;
  let key = SUPABASE_ANON_KEY;

  if (!key && typeof window !== 'undefined') {
    try {
      key = localStorage.getItem('instadm_supabase_anon_key') || '';
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

export const isSupabaseConfigured = (): boolean => {
  if (typeof window !== 'undefined') {
    const localKey = localStorage.getItem('instadm_supabase_anon_key');
    if (localKey) return true;
  }
  return Boolean(SUPABASE_PROJECT_URL && SUPABASE_ANON_KEY);
};

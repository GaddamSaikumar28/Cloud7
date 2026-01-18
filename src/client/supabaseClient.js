import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// Fallback for when environment variables are not set
// PLEASE REPLACE these with your actual Supabase URL and Anon Key
// Or better, set them in a .env.local file
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase URL or Anon Key is missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.local file.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'YOUR_SUPABASE_URL',
  supabaseAnonKey || 'YOUR_SUPABASE_ANON_KEY'
);
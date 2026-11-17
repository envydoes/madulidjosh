import { createClient } from '@supabase/supabase-js';

// Cookie-less anon client for public reads, so pages can be cached.
export const publicClient = () =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });

import { createClient } from '@supabase/supabase-js';

// Service-role client: bypasses RLS. Server-only (API routes). Never import into a client component.
export const createServiceClient = () =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

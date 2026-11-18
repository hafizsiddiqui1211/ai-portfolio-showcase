-- Keep Supabase migrations self-contained. Earlier versions created this schema
-- only through Drizzle; IF NOT EXISTS also supports those existing deployments.
ALTER TABLE public.contact_rate_limits
  ADD COLUMN IF NOT EXISTS purpose text NOT NULL DEFAULT 'contact';

CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.contact_submissions FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.contact_submissions TO service_role;
GRANT ALL ON public.contact_rate_limits TO service_role;

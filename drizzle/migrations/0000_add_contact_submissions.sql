ALTER TABLE public.contact_rate_limits ADD COLUMN IF NOT EXISTS purpose text NOT NULL DEFAULT 'contact';

CREATE TABLE public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

GRANT ALL ON public.contact_submissions TO service_role;

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- No anon/auth policies: submissions are written and read only by edge functions (service_role).
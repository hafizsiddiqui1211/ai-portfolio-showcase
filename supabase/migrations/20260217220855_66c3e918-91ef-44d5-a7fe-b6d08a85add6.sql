
-- Create rate limiting table for contact form
CREATE TABLE IF NOT EXISTS public.contact_rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_rate_limits ENABLE ROW LEVEL SECURITY;

-- Only service role can access this table (edge function uses service role key)
CREATE POLICY "Service role only" ON public.contact_rate_limits
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- Index for efficient IP + time lookups
CREATE INDEX IF NOT EXISTS idx_contact_rate_limits_ip_created ON public.contact_rate_limits(ip, created_at);

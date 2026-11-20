-- Harden rate-limit storage: purpose index, retention helper, and explicit lock-down.
CREATE INDEX IF NOT EXISTS idx_contact_rate_limits_ip_purpose_created
  ON public.contact_rate_limits (ip, purpose, created_at DESC);

-- Retention: drop rows older than 24h (call from pg_cron or let the edge functions purge).
CREATE OR REPLACE FUNCTION public.purge_contact_rate_limits()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.contact_rate_limits WHERE created_at < now() - interval '24 hours';
$$;

REVOKE ALL ON FUNCTION public.purge_contact_rate_limits() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.purge_contact_rate_limits() TO service_role;

-- Defence in depth: browser roles can never touch these tables.
REVOKE ALL ON public.contact_rate_limits FROM anon, authenticated;
REVOKE ALL ON public.contact_submissions FROM anon, authenticated;

-- Basic input constraints at the database level.
ALTER TABLE public.contact_submissions
  ADD CONSTRAINT contact_submissions_len_chk CHECK (
    char_length(name) <= 100 AND char_length(email) <= 254 AND
    char_length(subject) <= 200 AND char_length(message) <= 2000
  ) NOT VALID;

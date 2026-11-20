-- Serialize each quota with a transaction-scoped advisory lock. A failed quota
-- check does not insert a row, so denied traffic cannot grow this table forever.
CREATE OR REPLACE FUNCTION public.consume_portfolio_rate_limit(
  p_identity text, p_purpose text, p_limit integer, p_window_seconds integer
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  request_count bigint;
BEGIN
  IF p_identity IS NULL OR length(p_identity) > 128 OR
     p_purpose IS NULL OR length(p_purpose) > 32 OR
     p_limit IS NULL OR p_limit < 1 OR p_limit > 10000 OR
     p_window_seconds IS NULL OR p_window_seconds < 1 OR p_window_seconds > 86400 THEN
    RAISE EXCEPTION 'Invalid rate limit parameters';
  END IF;

  PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_purpose || ':' || p_identity, 0));
  SELECT count(*) INTO request_count FROM public.contact_rate_limits
    WHERE ip = p_identity AND purpose = p_purpose
      AND created_at > clock_timestamp() - make_interval(secs => p_window_seconds);
  IF request_count >= p_limit THEN RETURN false; END IF;

  INSERT INTO public.contact_rate_limits (ip, purpose) VALUES (p_identity, p_purpose);
  -- Retention happens inside the same transaction; no detached edge tasks.
  DELETE FROM public.contact_rate_limits WHERE created_at < now() - interval '24 hours';
  RETURN true;
END;
$$;
REVOKE ALL ON FUNCTION public.consume_portfolio_rate_limit(text, text, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_portfolio_rate_limit(text, text, integer, integer) TO service_role;

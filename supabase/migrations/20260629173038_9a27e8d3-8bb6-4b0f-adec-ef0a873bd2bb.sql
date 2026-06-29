
CREATE TYPE public.support_type AS ENUM ('personal','organizational');
CREATE TYPE public.support_request_type AS ENUM ('sponsorship','partnership');

CREATE TABLE public.support_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  organization_name TEXT,
  support_type public.support_type NOT NULL,
  request_type public.support_request_type NOT NULL,
  amount NUMERIC(12,2),
  message TEXT,
  status public.application_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.support_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.support_requests TO authenticated;
GRANT ALL ON public.support_requests TO service_role;

ALTER TABLE public.support_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit support request"
  ON public.support_requests FOR INSERT
  WITH CHECK (
    length(btrim(full_name)) BETWEEN 1 AND 200
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(btrim(phone)) BETWEEN 1 AND 50
    AND status = 'pending'
  );

CREATE POLICY "Admins view support requests"
  ON public.support_requests FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins update support requests"
  ON public.support_requests FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins delete support requests"
  ON public.support_requests FOR DELETE
  USING (public.is_admin(auth.uid()));

CREATE TRIGGER trg_support_requests_updated
  BEFORE UPDATE ON public.support_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

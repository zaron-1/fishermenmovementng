
-- 1) Profiles: restrict SELECT to owner/admin
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Users view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR public.is_admin(auth.uid()));

-- 2) Audit logs: remove authenticated insert (only service_role/SECURITY DEFINER may write)
DROP POLICY IF EXISTS "Authenticated insert audit" ON public.audit_logs;

-- 3) Volunteer-files storage: admin update/delete
DROP POLICY IF EXISTS "Admins update volunteer files" ON storage.objects;
DROP POLICY IF EXISTS "Admins delete volunteer files" ON storage.objects;
CREATE POLICY "Admins update volunteer files" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'volunteer-files' AND public.is_admin(auth.uid()))
  WITH CHECK (bucket_id = 'volunteer-files' AND public.is_admin(auth.uid()));
CREATE POLICY "Admins delete volunteer files" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'volunteer-files' AND public.is_admin(auth.uid()));

-- 4) Lock down SECURITY DEFINER helpers from direct API execution
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, public;
-- get_public_stats remains callable for homepage stats
GRANT EXECUTE ON FUNCTION public.get_public_stats() TO anon, authenticated;

-- 5) Replace permissive INSERT policies (WITH CHECK true) with minimal content validation
DROP POLICY IF EXISTS "Anyone can submit sponsor application" ON public.sponsors;
CREATE POLICY "Anyone can submit sponsor application" ON public.sponsors
  FOR INSERT WITH CHECK (
    length(btrim(organization_name)) BETWEEN 1 AND 200
    AND length(btrim(contact_person)) BETWEEN 1 AND 200
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND status = 'pending'
  );

DROP POLICY IF EXISTS "Anyone can apply as volunteer" ON public.volunteers;
CREATE POLICY "Anyone can apply as volunteer" ON public.volunteers
  FOR INSERT WITH CHECK (
    length(btrim(full_name)) BETWEEN 1 AND 200
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND status = 'pending'
    AND (user_id IS NULL OR user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Anyone can submit partnership" ON public.partnership_requests;
CREATE POLICY "Anyone can submit partnership" ON public.partnership_requests
  FOR INSERT WITH CHECK (
    length(btrim(organization_name)) BETWEEN 1 AND 200
    AND length(btrim(contact_person)) BETWEEN 1 AND 200
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND status = 'pending'
  );

DROP POLICY IF EXISTS "Anyone can record donation" ON public.donations;
CREATE POLICY "Anyone can record donation" ON public.donations
  FOR INSERT WITH CHECK (
    amount > 0
    AND length(btrim(provider)) BETWEEN 1 AND 100
    AND status = 'pending'
  );

DROP POLICY IF EXISTS "Anyone can submit message" ON public.contact_messages;
CREATE POLICY "Anyone can submit message" ON public.contact_messages
  FOR INSERT WITH CHECK (
    length(btrim(full_name)) BETWEEN 1 AND 200
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(btrim(message)) BETWEEN 1 AND 5000
  );

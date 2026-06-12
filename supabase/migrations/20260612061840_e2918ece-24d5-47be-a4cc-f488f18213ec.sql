
-- volunteer-files: users upload to a folder named by their user id
CREATE POLICY "Auth users upload own volunteer file" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'volunteer-files' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Anon upload volunteer file public folder" ON storage.objects FOR INSERT TO anon
  WITH CHECK (bucket_id = 'volunteer-files' AND (storage.foldername(name))[1] = 'public');
CREATE POLICY "Owner read volunteer file" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'volunteer-files' AND ((storage.foldername(name))[1] = auth.uid()::text OR public.is_admin(auth.uid())));

-- gallery
CREATE POLICY "Admins manage gallery storage" ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'gallery' AND public.is_admin(auth.uid()))
  WITH CHECK (bucket_id = 'gallery' AND public.is_admin(auth.uid()));
CREATE POLICY "Anyone read gallery via signed" ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery');

-- news
CREATE POLICY "Admins manage news storage" ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'news' AND public.is_admin(auth.uid()))
  WITH CHECK (bucket_id = 'news' AND public.is_admin(auth.uid()));
CREATE POLICY "Anyone read news media" ON storage.objects FOR SELECT
  USING (bucket_id = 'news');

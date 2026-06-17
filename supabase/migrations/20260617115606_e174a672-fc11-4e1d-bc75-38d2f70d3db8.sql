
-- Page views table for visitor analytics
CREATE TABLE public.page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  visitor_id text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  referrer text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.page_views TO anon, authenticated;
GRANT SELECT ON public.page_views TO authenticated;
GRANT ALL ON public.page_views TO service_role;

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can record page views"
  ON public.page_views FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins view page views"
  ON public.page_views FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE INDEX idx_page_views_created_at ON public.page_views (created_at DESC);
CREATE INDEX idx_page_views_visitor ON public.page_views (visitor_id);

-- Allow authenticated users to insert their own audit log entries
CREATE POLICY "Users insert own audit logs"
  ON public.audit_logs FOR INSERT
  TO authenticated
  WITH CHECK (actor_id = auth.uid());

-- RPC: list users with profile + roles (admin only)
CREATE OR REPLACE FUNCTION public.admin_list_users()
RETURNS TABLE (
  id uuid,
  email text,
  full_name text,
  created_at timestamptz,
  last_sign_in_at timestamptz,
  roles text[]
)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;

  RETURN QUERY
  SELECT
    u.id,
    u.email::text,
    COALESCE(p.full_name, '')::text AS full_name,
    u.created_at,
    u.last_sign_in_at,
    COALESCE(ARRAY_AGG(ur.role::text) FILTER (WHERE ur.role IS NOT NULL), '{}')::text[] AS roles
  FROM auth.users u
  LEFT JOIN public.profiles p ON p.id = u.id
  LEFT JOIN public.user_roles ur ON ur.user_id = u.id
  GROUP BY u.id, u.email, p.full_name, u.created_at, u.last_sign_in_at
  ORDER BY u.created_at DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION public.admin_list_users() TO authenticated;

-- RPC: grant or revoke a role (super_admin only for safety)
CREATE OR REPLACE FUNCTION public.admin_set_user_role(_user_id uuid, _role app_role, _grant boolean)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'super_admin') THEN
    RAISE EXCEPTION 'Only super admins can modify roles';
  END IF;

  IF _grant THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (_user_id, _role)
    ON CONFLICT (user_id, role) DO NOTHING;
  ELSE
    DELETE FROM public.user_roles WHERE user_id = _user_id AND role = _role;
  END IF;

  INSERT INTO public.audit_logs (actor_id, action, target_table, target_id, details)
  VALUES (
    auth.uid(),
    CASE WHEN _grant THEN 'role_granted' ELSE 'role_revoked' END,
    'user_roles',
    _user_id,
    jsonb_build_object('role', _role)
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.admin_set_user_role(uuid, app_role, boolean) TO authenticated;

-- RPC: visitor stats summary (admin only)
CREATE OR REPLACE FUNCTION public.admin_visitor_stats(_days int DEFAULT 30)
RETURNS json
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result json;
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;

  SELECT json_build_object(
    'total_views', (SELECT COUNT(*) FROM public.page_views WHERE created_at >= now() - (_days || ' days')::interval),
    'unique_visitors', (SELECT COUNT(DISTINCT visitor_id) FROM public.page_views WHERE created_at >= now() - (_days || ' days')::interval),
    'views_today', (SELECT COUNT(*) FROM public.page_views WHERE created_at >= date_trunc('day', now())),
    'unique_today', (SELECT COUNT(DISTINCT visitor_id) FROM public.page_views WHERE created_at >= date_trunc('day', now())),
    'top_pages', (
      SELECT COALESCE(json_agg(t), '[]'::json) FROM (
        SELECT path, COUNT(*) AS views, COUNT(DISTINCT visitor_id) AS visitors
        FROM public.page_views
        WHERE created_at >= now() - (_days || ' days')::interval
        GROUP BY path
        ORDER BY views DESC
        LIMIT 10
      ) t
    ),
    'daily', (
      SELECT COALESCE(json_agg(t ORDER BY day), '[]'::json) FROM (
        SELECT date_trunc('day', created_at)::date AS day,
               COUNT(*) AS views,
               COUNT(DISTINCT visitor_id) AS visitors
        FROM public.page_views
        WHERE created_at >= now() - (_days || ' days')::interval
        GROUP BY day
      ) t
    )
  ) INTO result;

  RETURN result;
END;
$$;

GRANT EXECUTE ON FUNCTION public.admin_visitor_stats(int) TO authenticated;

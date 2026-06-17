import { supabase } from "@/integrations/supabase/client";

function getVisitorId(): string {
  if (typeof window === "undefined") return "ssr";
  const KEY = "fm_visitor_id";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}

let lastPath: string | null = null;

export async function recordPageView(path: string) {
  if (typeof window === "undefined") return;
  if (path === lastPath) return;
  lastPath = path;
  const { data: userData } = await supabase.auth.getSession();
  const userId = userData.session?.user.id ?? null;
  await supabase.from("page_views").insert({
    path,
    visitor_id: getVisitorId(),
    user_id: userId,
    referrer: document.referrer || null,
    user_agent: navigator.userAgent,
  });
}

export async function logAuditEvent(action: string, details: Record<string, unknown> = {}) {
  const { data } = await supabase.auth.getSession();
  const uid = data.session?.user.id;
  if (!uid) return;
  await supabase.from("audit_logs").insert({
    actor_id: uid,
    action,
    details: details as never,
  });
}

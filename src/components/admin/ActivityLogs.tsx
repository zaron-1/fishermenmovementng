import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type LogRow = {
  id: string;
  actor_id: string | null;
  action: string;
  target_table: string | null;
  target_id: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
};

export function ActivityLogs() {
  const [rows, setRows] = useState<LogRow[]>([]);
  const [emails, setEmails] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("audit_logs")
        .select("id,actor_id,action,target_table,target_id,details,created_at")
        .order("created_at", { ascending: false })
        .limit(200);
      setRows((data || []) as LogRow[]);

      const { data: users } = await supabase.rpc("admin_list_users");
      const map: Record<string, string> = {};
      (users || []).forEach((u: { id: string; email: string; full_name: string }) => {
        map[u.id] = u.full_name || u.email;
      });
      setEmails(map);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
      <h2 className="font-display text-lg font-bold">User activity log</h2>
      <p className="text-sm text-muted-foreground">Recent actions taken by signed-in users.</p>

      <div className="mt-4 overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center py-10 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : rows.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">No activity recorded yet</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-3 font-medium">When</th>
                <th className="py-2 pr-3 font-medium">User</th>
                <th className="py-2 pr-3 font-medium">Action</th>
                <th className="py-2 pr-3 font-medium">Target</th>
                <th className="py-2 pr-3 font-medium">Details</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-border/50 last:border-0 align-top">
                  <td className="py-2.5 pr-3 text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(r.created_at).toLocaleString()}
                  </td>
                  <td className="py-2.5 pr-3">{r.actor_id ? (emails[r.actor_id] || r.actor_id.slice(0, 8)) : "—"}</td>
                  <td className="py-2.5 pr-3">
                    <span className="inline-flex rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">{r.action}</span>
                  </td>
                  <td className="py-2.5 pr-3 text-xs text-muted-foreground">{r.target_table || "—"}</td>
                  <td className="py-2.5 pr-3 text-xs text-muted-foreground">
                    {r.details ? <code className="text-[11px]">{JSON.stringify(r.details)}</code> : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

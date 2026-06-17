import { useEffect, useState } from "react";
import { Eye, Users as UsersIcon, Calendar, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";

type Stats = {
  total_views: number;
  unique_visitors: number;
  views_today: number;
  unique_today: number;
  top_pages: { path: string; views: number; visitors: number }[];
  daily: { day: string; views: number; visitors: number }[];
};

type RecentRow = { id: string; path: string; visitor_id: string; created_at: string; referrer: string | null };

export function VisitorAnalytics() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<RecentRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [{ data: s }, { data: r }] = await Promise.all([
        supabase.rpc("admin_visitor_stats", { _days: 30 }),
        supabase.from("page_views").select("id,path,visitor_id,created_at,referrer").order("created_at", { ascending: false }).limit(50),
      ]);
      setStats(s as Stats);
      setRecent((r || []) as RecentRow[]);
      setLoading(false);
    })();
  }, []);

  if (loading || !stats) {
    return (
      <div className="rounded-3xl border border-border bg-card p-10 text-center text-muted-foreground shadow-card">
        <Loader2 className="mx-auto h-5 w-5 animate-spin" />
      </div>
    );
  }

  const maxDaily = Math.max(1, ...stats.daily.map((d) => d.views));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile icon={Eye} label="Views (30d)" value={stats.total_views} />
        <StatTile icon={UsersIcon} label="Unique visitors (30d)" value={stats.unique_visitors} />
        <StatTile icon={Calendar} label="Views today" value={stats.views_today} />
        <StatTile icon={UsersIcon} label="Unique today" value={stats.unique_today} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
          <h3 className="font-display text-lg font-bold">Daily traffic (last 30 days)</h3>
          <div className="mt-4 flex h-40 items-end gap-1">
            {stats.daily.length === 0 ? (
              <p className="m-auto text-sm text-muted-foreground">No data yet</p>
            ) : stats.daily.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-1" title={`${d.day}: ${d.views} views, ${d.visitors} visitors`}>
                <div
                  className="w-full rounded-t bg-primary/70 transition-all hover:bg-primary"
                  style={{ height: `${(d.views / maxDaily) * 100}%`, minHeight: "2px" }}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
            <span>{stats.daily[0]?.day}</span>
            <span>{stats.daily[stats.daily.length - 1]?.day}</span>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
          <h3 className="font-display text-lg font-bold">Top pages (30d)</h3>
          <div className="mt-4">
            {stats.top_pages.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">No data yet</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="py-2 pr-3 font-medium">Path</th>
                    <th className="py-2 pr-3 font-medium text-right">Views</th>
                    <th className="py-2 pr-3 font-medium text-right">Visitors</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.top_pages.map((p) => (
                    <tr key={p.path} className="border-b border-border/50 last:border-0">
                      <td className="py-2 pr-3 font-mono text-xs">{p.path}</td>
                      <td className="py-2 pr-3 text-right">{p.views}</td>
                      <td className="py-2 pr-3 text-right">{p.visitors}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
        <h3 className="font-display text-lg font-bold">Recent visits</h3>
        <div className="mt-4 overflow-x-auto">
          {recent.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">No visits recorded yet</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-2 pr-3 font-medium">Time</th>
                  <th className="py-2 pr-3 font-medium">Path</th>
                  <th className="py-2 pr-3 font-medium">Visitor</th>
                  <th className="py-2 pr-3 font-medium">Referrer</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r) => (
                  <tr key={r.id} className="border-b border-border/50 last:border-0">
                    <td className="py-2 pr-3 text-xs text-muted-foreground whitespace-nowrap">{new Date(r.created_at).toLocaleString()}</td>
                    <td className="py-2 pr-3 font-mono text-xs">{r.path}</td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{r.visitor_id.slice(0, 8)}</td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground truncate max-w-xs">{r.referrer || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

function StatTile({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number }) {
  return (
    <div className="hover-lift rounded-2xl border border-border bg-card p-5 shadow-card">
      <Icon className="mb-2 h-6 w-6 text-primary" />
      <div className="font-display text-3xl font-bold"><AnimatedCounter value={value} /></div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

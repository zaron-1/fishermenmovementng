import { createFileRoute, redirect } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Users, HeartHandshake, Mail, Building2, BookOpen, ImageIcon, Check, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";
import { FundingProgress } from "@/components/site/FundingProgress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagement } from "@/components/admin/UserManagement";
import { ActivityLogs } from "@/components/admin/ActivityLogs";
import { VisitorAnalytics } from "@/components/admin/VisitorAnalytics";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async ({ context }) => {
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", context.user.id);
    const roles = (data || []).map((r) => r.role as string);
    if (!roles.includes("admin") && !roles.includes("super_admin")) {
      throw redirect({ to: "/dashboard" });
    }
    return { roles };
  },
  head: () => ({ meta: [{ title: "Admin — Fishermen Movement" }] }),
  component: Admin,
});

type Counts = { volunteers: number; sponsors: number; partnerships: number; contacts: number; schools: number; gallery: number };
type Row = Record<string, any>;
type TableName = "volunteers" | "sponsors" | "partnership_requests";

function Admin() {
  const { roles } = Route.useRouteContext();
  const canManageRoles = roles.includes("super_admin");

  const [counts, setCounts] = useState<Counts>({ volunteers: 0, sponsors: 0, partnerships: 0, contacts: 0, schools: 0, gallery: 0 });
  const [vols, setVols] = useState<Row[]>([]);
  const [sponsors, setSponsors] = useState<Row[]>([]);
  const [partnerships, setPartnerships] = useState<Row[]>([]);
  const [busy, setBusy] = useState<string | null>(null);

  const refresh = useCallback(() => {
    Promise.all([
      supabase.from("volunteers").select("id", { count: "exact", head: true }),
      supabase.from("sponsors").select("id", { count: "exact", head: true }),
      supabase.from("partnership_requests").select("id", { count: "exact", head: true }),
      supabase.from("contact_messages").select("id", { count: "exact", head: true }),
      supabase.from("schools").select("id", { count: "exact", head: true }),
      supabase.from("gallery_media").select("id", { count: "exact", head: true }),
    ]).then(([v, s, p, c, sc, g]) => {
      setCounts({
        volunteers: v.count || 0, sponsors: s.count || 0, partnerships: p.count || 0,
        contacts: c.count || 0, schools: sc.count || 0, gallery: g.count || 0,
      });
    });
    supabase.from("volunteers").select("id,full_name,email,occupation,status,created_at").order("created_at", { ascending: false }).limit(10).then(({ data }) => setVols(data || []));
    supabase.from("sponsors").select("id,organization_name,contact_person,category,amount,status,created_at").order("created_at", { ascending: false }).limit(10).then(({ data }) => setSponsors(data || []));
    supabase.from("partnership_requests").select("id,organization_name,contact_person,partnership_type,status,created_at").order("created_at", { ascending: false }).limit(10).then(({ data }) => setPartnerships(data || []));
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const updateStatus = async (table: TableName, id: string, status: "approved" | "rejected") => {
    setBusy(id);
    const { error } = await supabase.from(table).update({ status }).eq("id", id);
    setBusy(null);
    if (error) { toast.error(error.message); return; }
    toast.success(`Marked ${status}`);
    refresh();
  };

  const tiles = [
    { Icon: Users, label: "Volunteers", value: counts.volunteers },
    { Icon: HeartHandshake, label: "Sponsors", value: counts.sponsors },
    { Icon: Building2, label: "Partnerships", value: counts.partnerships },
    { Icon: Mail, label: "Messages", value: counts.contacts },
    { Icon: BookOpen, label: "Schools", value: counts.schools },
    { Icon: ImageIcon, label: "Gallery items", value: counts.gallery },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-xs uppercase tracking-widest text-primary">Admin Panel</div>
      <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">Project Overview</h1>

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="flex flex-wrap h-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="activity">Activity Logs</TabsTrigger>
          <TabsTrigger value="visitors">Visitor Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <FundingProgress />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {tiles.map((t) => (
              <div key={t.label} className="hover-lift rounded-2xl border border-border bg-card p-5 shadow-card">
                <t.Icon className="mb-2 h-6 w-6 text-primary" />
                <div className="font-display text-3xl font-bold"><AnimatedCounter value={t.value} /></div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{t.label}</div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submissions" className="mt-6 grid gap-6">
          <ReviewSection
            title="Volunteer applications"
            head={["Name", "Email", "Role", "Status", "Actions"]}
            rows={vols}
            renderCells={(v) => [v.full_name, v.email, v.occupation || "—"]}
            table="volunteers"
            busy={busy}
            onAction={updateStatus}
          />
          <ReviewSection
            title="Sponsor submissions"
            head={["Organization", "Contact", "Tier", "Amount", "Status", "Actions"]}
            rows={sponsors}
            renderCells={(s) => [s.organization_name, s.contact_person, s.category, s.amount ? `₦${Number(s.amount).toLocaleString()}` : "—"]}
            table="sponsors"
            busy={busy}
            onAction={updateStatus}
          />
          <ReviewSection
            title="Partnership requests"
            head={["Organization", "Contact", "Type", "Status", "Actions"]}
            rows={partnerships}
            renderCells={(p) => [p.organization_name, p.contact_person, p.partnership_type || "—"]}
            table="partnership_requests"
            busy={busy}
            onAction={updateStatus}
          />
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <UserManagement canManageRoles={canManageRoles} />
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <ActivityLogs />
        </TabsContent>

        <TabsContent value="visitors" className="mt-6">
          <VisitorAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "approved" || status === "active" ? "bg-emerald-500/10 text-emerald-600 ring-emerald-500/30"
    : status === "rejected" ? "bg-rose-500/10 text-rose-600 ring-rose-500/30"
    : "bg-amber-500/10 text-amber-600 ring-amber-500/30";
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${tone}`}>{status}</span>;
}

function ReviewSection({
  title, head, rows, renderCells, table, busy, onAction,
}: {
  title: string;
  head: string[];
  rows: Row[];
  renderCells: (r: Row) => (string | number)[];
  table: TableName;
  busy: string | null;
  onAction: (table: TableName, id: string, status: "approved" | "rejected") => void;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
      <h2 className="font-display text-lg font-bold">{title}</h2>
      <div className="mt-4">
        {rows.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">No submissions yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  {head.map((h) => <th key={h} className="py-2 pr-3 font-medium">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const cells = renderCells(r);
                  const isBusy = busy === r.id;
                  const isPending = !["approved", "rejected", "active"].includes(r.status);
                  return (
                    <tr key={r.id} className="border-b border-border/50 last:border-0">
                      {cells.map((c, j) => <td key={j} className="py-2.5 pr-3">{c}</td>)}
                      <td className="py-2.5 pr-3"><StatusBadge status={r.status} /></td>
                      <td className="py-2.5 pr-3">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={isBusy || !isPending}
                            onClick={() => onAction(table, r.id, "approved")}
                          >
                            <Check className="h-3.5 w-3.5" /> Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={isBusy || !isPending}
                            onClick={() => onAction(table, r.id, "rejected")}
                          >
                            <X className="h-3.5 w-3.5" /> Reject
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

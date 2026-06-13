import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Users, HeartHandshake, Mail, Building2, BookOpen, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";
import { FundingProgress } from "@/components/site/FundingProgress";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async ({ context }) => {
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", context.user.id);
    const roles = (data || []).map((r) => r.role as string);
    if (!roles.includes("admin") && !roles.includes("super_admin")) {
      throw redirect({ to: "/dashboard" });
    }
  },
  head: () => ({ meta: [{ title: "Admin — Fishermen Movement" }] }),
  component: Admin,
});

type Counts = {
  volunteers: number;
  sponsors: number;
  partnerships: number;
  contacts: number;
  schools: number;
  gallery: number;
};

function Admin() {
  const [counts, setCounts] = useState<Counts>({ volunteers: 0, sponsors: 0, partnerships: 0, contacts: 0, schools: 0, gallery: 0 });
  const [recentVols, setRecentVols] = useState<any[]>([]);
  const [recentSponsors, setRecentSponsors] = useState<any[]>([]);

  useEffect(() => {
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
    supabase.from("volunteers").select("id,full_name,email,occupation,status,created_at").order("created_at", { ascending: false }).limit(8).then(({ data }) => setRecentVols(data || []));
    supabase.from("sponsors").select("id,organization_name,contact_person,category,amount,status,created_at").order("created_at", { ascending: false }).limit(8).then(({ data }) => setRecentSponsors(data || []));
  }, []);

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

      <div className="mt-8">
        <FundingProgress />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {tiles.map((t) => (
          <div key={t.label} className="hover-lift rounded-2xl border border-border bg-card p-5 shadow-card">
            <t.Icon className="mb-2 h-6 w-6 text-primary" />
            <div className="font-display text-3xl font-bold"><AnimatedCounter value={t.value} /></div>
            <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{t.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Section title="Recent volunteer applications">
          <Table
            head={["Name", "Email", "Role", "Status"]}
            rows={recentVols.map((v) => [v.full_name, v.email, v.occupation || "—", v.status])}
            empty="No applications yet"
          />
        </Section>
        <Section title="Recent sponsors">
          <Table
            head={["Organization", "Contact", "Tier", "Amount", "Status"]}
            rows={recentSponsors.map((s) => [s.organization_name, s.contact_person, s.category, s.amount ? `₦${Number(s.amount).toLocaleString()}` : "—", s.status])}
            empty="No sponsors yet"
          />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
      <h2 className="font-display text-lg font-bold">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Table({ head, rows, empty }: { head: string[]; rows: (string | number)[][]; empty: string }) {
  if (rows.length === 0) return <p className="py-10 text-center text-sm text-muted-foreground">{empty}</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
          {head.map((h) => <th key={h} className="py-2 pr-3 font-medium">{h}</th>)}
        </tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border/50 last:border-0">
              {r.map((c, j) => <td key={j} className="py-2.5 pr-3">{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

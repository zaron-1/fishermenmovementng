import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, Shield, Award, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Fishermen Movement" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = Route.useRouteContext();
  const [roles, setRoles] = useState<string[]>([]);
  const [profile, setProfile] = useState<{ full_name: string | null } | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    supabase.from("user_roles").select("role").eq("user_id", user.id).then(({ data }) => {
      setRoles((data || []).map((r) => r.role as string));
    });
    supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle().then(({ data }) => {
      setProfile(data);
    });
  }, [user.id]);

  const isAdmin = roles.includes("admin") || roles.includes("super_admin");

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-primary">Dashboard</div>
          <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">Welcome, {profile?.full_name || user.email}</h1>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {roles.map((r) => (
              <span key={r} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-wider">{r.replace("_", " ")}</span>
            ))}
          </div>
        </div>
        <Button variant="outline" onClick={signOut}><LogOut className="mr-2 h-4 w-4" />Sign out</Button>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/volunteer" className="hover-lift rounded-3xl border border-border bg-card p-6 shadow-card">
          <Shield className="mb-3 h-8 w-8 text-primary" />
          <h3 className="font-display text-lg font-bold">Volunteer Profile</h3>
          <p className="mt-1 text-sm text-muted-foreground">Apply or update your volunteer application.</p>
        </Link>
        <Link to="/sponsor" className="hover-lift rounded-3xl border border-border bg-card p-6 shadow-card">
          <Award className="mb-3 h-8 w-8 text-primary" />
          <h3 className="font-display text-lg font-bold">Sponsor Centre</h3>
          <p className="mt-1 text-sm text-muted-foreground">Manage your sponsorship and view impact.</p>
        </Link>
        <Link to="/contact" className="hover-lift rounded-3xl border border-border bg-card p-6 shadow-card">
          <User className="mb-3 h-8 w-8 text-primary" />
          <h3 className="font-display text-lg font-bold">Get Support</h3>
          <p className="mt-1 text-sm text-muted-foreground">Reach the team for help.</p>
        </Link>
        {isAdmin && (
          <Link to="/admin" className="hover-lift rounded-3xl bg-gradient-cyber p-6 text-white shadow-elegant">
            <Settings className="mb-3 h-8 w-8" />
            <h3 className="font-display text-lg font-bold">Admin Panel</h3>
            <p className="mt-1 text-sm opacity-90">Manage volunteers, sponsors, news, and analytics.</p>
          </Link>
        )}
      </div>
    </div>
  );
}

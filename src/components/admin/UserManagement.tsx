import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Shield, ShieldOff, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AdminUser = {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  last_sign_in_at: string | null;
  roles: string[];
};

const ROLE_OPTIONS = ["admin", "super_admin"] as const;

export function UserManagement({ canManageRoles }: { canManageRoles: boolean }) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc("admin_list_users");
    if (error) toast.error(error.message);
    else setUsers((data || []) as AdminUser[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleRole = async (userId: string, role: "admin" | "super_admin", grant: boolean) => {
    setBusy(`${userId}:${role}`);
    const { error } = await supabase.rpc("admin_set_user_role", {
      _user_id: userId,
      _role: role,
      _grant: grant,
    });
    setBusy(null);
    if (error) { toast.error(error.message); return; }
    toast.success(grant ? `Granted ${role}` : `Revoked ${role}`);
    load();
  };

  const filtered = users.filter((u) => {
    const s = q.trim().toLowerCase();
    if (!s) return true;
    return u.email.toLowerCase().includes(s) || (u.full_name || "").toLowerCase().includes(s);
  });

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold">User access management</h2>
          <p className="text-sm text-muted-foreground">All registered users and their roles.</p>
        </div>
        <Input
          placeholder="Search by name or email"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <div className="mt-4 overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center py-10 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">No users found</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-3 font-medium">User</th>
                <th className="py-2 pr-3 font-medium">Joined</th>
                <th className="py-2 pr-3 font-medium">Last sign-in</th>
                <th className="py-2 pr-3 font-medium">Roles</th>
                {canManageRoles && <th className="py-2 pr-3 font-medium">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-border/50 last:border-0 align-top">
                  <td className="py-3 pr-3">
                    <div className="font-medium">{u.full_name || "—"}</div>
                    <div className="text-xs text-muted-foreground">{u.email}</div>
                  </td>
                  <td className="py-3 pr-3 text-xs text-muted-foreground">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 pr-3 text-xs text-muted-foreground">
                    {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleString() : "Never"}
                  </td>
                  <td className="py-3 pr-3">
                    <div className="flex flex-wrap gap-1">
                      {u.roles.length === 0 ? (
                        <span className="text-xs text-muted-foreground">—</span>
                      ) : u.roles.map((r) => (
                        <span key={r} className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary ring-1 ring-primary/20">{r}</span>
                      ))}
                    </div>
                  </td>
                  {canManageRoles && (
                    <td className="py-3 pr-3">
                      <div className="flex flex-wrap gap-2">
                        {ROLE_OPTIONS.map((role) => {
                          const has = u.roles.includes(role);
                          const key = `${u.id}:${role}`;
                          return (
                            <Button
                              key={role}
                              size="sm"
                              variant="outline"
                              disabled={busy === key}
                              onClick={() => toggleRole(u.id, role, !has)}
                            >
                              {busy === key ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : has ? <ShieldOff className="h-3.5 w-3.5" /> : <Shield className="h-3.5 w-3.5" />}
                              {has ? `Revoke ${role}` : `Grant ${role}`}
                            </Button>
                          );
                        })}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {!canManageRoles && (
        <p className="mt-3 text-xs text-muted-foreground">Only super admins can change roles.</p>
      )}
    </div>
  );
}

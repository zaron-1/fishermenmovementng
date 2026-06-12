import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Shield, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Fishermen Movement" },
      { name: "description", content: "Sign in or create an account on the Fishermen Movement platform." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard" });
    });
  }, [navigate]);

  async function signInGoogle() {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/dashboard" });
    if (result.error) { toast.error("Google sign-in failed"); setLoading(false); }
    else if (!result.redirected) navigate({ to: "/dashboard" });
  }

  async function signIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(fd.get("email")),
      password: String(fd.get("password")),
    });
    setLoading(false);
    if (error) toast.error(error.message);
    else { toast.success("Welcome back!"); navigate({ to: "/dashboard" }); }
  }

  async function signUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: String(fd.get("email")),
      password: String(fd.get("password")),
      options: {
        emailRedirectTo: window.location.origin + "/dashboard",
        data: { full_name: String(fd.get("full_name") || "") },
      },
    });
    setLoading(false);
    if (error) toast.error(error.message);
    else { toast.success("Account created — check your email to confirm."); }
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="absolute inset-0 -z-10 gradient-hero opacity-95" />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-40" />
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center px-4 py-12">
        <div className="w-full">
          <div className="mb-6 text-center text-white">
            <Shield className="mx-auto h-10 w-10 text-accent" />
            <h1 className="mt-3 font-display text-3xl font-bold">Welcome</h1>
            <p className="mt-2 text-sm text-white/80">Sign in or create your Fishermen Movement account.</p>
          </div>

          <div className="rounded-3xl bg-card p-6 shadow-elegant">
            <Button onClick={signInGoogle} disabled={loading} variant="outline" className="w-full">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.8-2 13.3-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4-4 5.3l6.2 5.2C40.9 35.4 44 30.1 44 24c0-1.2-.1-2.3-.4-3.5z"/></svg>
              Continue with Google
            </Button>
            <div className="my-4 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
              <div className="h-px flex-1 bg-border" />or<div className="h-px flex-1 bg-border" />
            </div>

            <Tabs defaultValue="signin">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign in</TabsTrigger>
                <TabsTrigger value="signup">Sign up</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <form onSubmit={signIn} className="space-y-3">
                  <div><Label htmlFor="si-email">Email</Label><Input id="si-email" name="email" type="email" required /></div>
                  <div><Label htmlFor="si-pw">Password</Label><Input id="si-pw" name="password" type="password" required /></div>
                  <Button type="submit" disabled={loading} className="w-full gradient-primary text-primary-foreground">
                    <Lock className="mr-2 h-4 w-4" />Sign in
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={signUp} className="space-y-3">
                  <div><Label htmlFor="su-name">Full name</Label><Input id="su-name" name="full_name" required /></div>
                  <div><Label htmlFor="su-email">Email</Label><Input id="su-email" name="email" type="email" required /></div>
                  <div><Label htmlFor="su-pw">Password</Label><Input id="su-pw" name="password" type="password" required minLength={6} /></div>
                  <Button type="submit" disabled={loading} className="w-full gradient-primary text-primary-foreground">
                    <Mail className="mr-2 h-4 w-4" />Create account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

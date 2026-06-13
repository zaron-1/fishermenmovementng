import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { HeartHandshake, Award, Trophy, Medal, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { FundingProgress } from "@/components/site/FundingProgress";

export const Route = createFileRoute("/sponsor")({
  head: () => ({
    meta: [
      { title: "Become a Sponsor — Fishermen Movement" },
      { name: "description", content: "Sponsor at Platinum, Gold, Silver, Bronze or Community level and help us reach 9,600 students annually." },
    ],
  }),
  component: SponsorPage,
});

const tiers = [
  { value: "platinum", label: "Platinum", Icon: Trophy, amount: "₦5M+", color: "from-amber-500 to-yellow-300" },
  { value: "gold", label: "Gold", Icon: Award, amount: "₦2M+", color: "from-yellow-500 to-amber-400" },
  { value: "silver", label: "Silver", Icon: Medal, amount: "₦1M+", color: "from-slate-400 to-slate-200" },
  { value: "bronze", label: "Bronze", Icon: Medal, amount: "₦500K+", color: "from-orange-700 to-orange-500" },
  { value: "community", label: "Community", Icon: Users, amount: "Any", color: "from-blue-500 to-cyan-400" },
];

function SponsorPage() {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("community");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const { data: { user } } = await supabase.auth.getUser();
    const payload = {
      user_id: user?.id ?? null,
      organization_name: String(fd.get("organization_name") || "").slice(0, 200),
      contact_person: String(fd.get("contact_person") || "").slice(0, 200),
      email: String(fd.get("email") || "").slice(0, 200),
      phone: String(fd.get("phone") || "").slice(0, 50),
      website: String(fd.get("website") || "").slice(0, 500),
      organization_type: String(fd.get("organization_type") || "").slice(0, 100),
      category: category as "platinum"|"gold"|"silver"|"bronze"|"community",
      amount: Number(fd.get("amount")) || null,
      areas_of_interest: String(fd.get("areas_of_interest") || "").slice(0, 1000),
      message: String(fd.get("message") || "").slice(0, 4000),
    };
    const { error } = await supabase.from("sponsors").insert(payload);
    setLoading(false);
    if (error) toast.error(error.message);
    else { toast.success("Thank you! Our team will reach out within 48 hours."); (e.target as HTMLFormElement).reset(); }
  }

  return (
    <div>
      <section className="relative isolate overflow-hidden gradient-hero py-20 text-white">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <HeartHandshake className="mx-auto mb-3 h-10 w-10 text-accent" />
          <h1 className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl">Become a Sponsor</h1>
          <p className="mt-4 text-lg text-white/85">Power the next school visit. Every tier directly funds students.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <FundingProgress />
        </div>

        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {tiers.map((t) => (
            <button
              key={t.value}
              onClick={() => setCategory(t.value)}
              className={`group relative overflow-hidden rounded-2xl border-2 p-6 text-left transition-all ${
                category === t.value ? "border-primary shadow-glow scale-[1.03]" : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <div className={`absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-gradient-to-br ${t.color} opacity-20`} />
              <t.Icon className="mb-2 h-6 w-6 text-primary" />
              <div className="font-display text-lg font-bold">{t.label}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{t.amount}</div>
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="mx-auto max-w-3xl space-y-5 rounded-3xl border border-border bg-card p-8 shadow-card">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label htmlFor="organization_name">Organization name *</Label><Input id="organization_name" name="organization_name" required maxLength={200} /></div>
            <div><Label htmlFor="contact_person">Contact person *</Label><Input id="contact_person" name="contact_person" required maxLength={200} /></div>
            <div><Label htmlFor="email">Email *</Label><Input id="email" name="email" type="email" required maxLength={200} /></div>
            <div><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" maxLength={50} /></div>
            <div><Label htmlFor="website">Website</Label><Input id="website" name="website" type="url" maxLength={500} /></div>
            <div>
              <Label>Organization type</Label>
              <Select name="organization_type">
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  {["Corporate","NGO","Government","Educational","Foundation","Individual","Other"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div><Label htmlFor="amount">Sponsorship amount (₦)</Label><Input id="amount" name="amount" type="number" min={0} /></div>
            <div className="sm:col-span-2"><Label htmlFor="areas_of_interest">Areas of interest</Label><Input id="areas_of_interest" name="areas_of_interest" placeholder="e.g. School visits in Aba, curriculum development" maxLength={1000} /></div>
            <div className="sm:col-span-2"><Label htmlFor="message">Message</Label><Textarea id="message" name="message" rows={5} maxLength={4000} /></div>
          </div>
          <Button type="submit" disabled={loading} size="lg" className="w-full gradient-primary text-primary-foreground">
            {loading ? "Submitting..." : "Submit sponsorship interest"}
          </Button>
        </form>
      </section>
    </div>
  );
}

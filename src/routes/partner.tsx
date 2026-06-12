import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/partner")({
  head: () => ({
    meta: [
      { title: "Partner With Us — Fishermen Movement" },
      { name: "description", content: "Partner with the Fishermen Movement as a government agency, NGO, charity, corporate, educational institution, or technology company." },
    ],
  }),
  component: Partner,
});

const cats = [
  { value: "government", label: "Government Agency" },
  { value: "ngo", label: "NGO" },
  { value: "charity", label: "Charity" },
  { value: "corporate", label: "Corporate Organization" },
  { value: "educational", label: "Educational Institution" },
  { value: "technology", label: "Technology Company" },
];

function Partner() {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("ngo");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.from("partnership_requests").insert({
      organization_name: String(fd.get("organization_name") || "").slice(0, 200),
      contact_person: String(fd.get("contact_person") || "").slice(0, 200),
      email: String(fd.get("email") || "").slice(0, 200),
      phone: String(fd.get("phone") || "").slice(0, 50),
      website: String(fd.get("website") || "").slice(0, 500),
      category: category as "government"|"ngo"|"charity"|"corporate"|"educational"|"technology",
      message: String(fd.get("message") || "").slice(0, 4000),
    });
    setLoading(false);
    if (error) toast.error(error.message);
    else { toast.success("Partnership request received. Thank you!"); (e.target as HTMLFormElement).reset(); }
  }

  return (
    <div>
      <section className="relative isolate overflow-hidden gradient-hero py-20 text-white">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Building2 className="mx-auto mb-3 h-10 w-10 text-accent" />
          <h1 className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl">Partner With Us</h1>
          <p className="mt-4 text-lg text-white/85">Multiply our reach across Nigeria.</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-border bg-card p-8 shadow-card">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label htmlFor="organization_name">Organization *</Label><Input id="organization_name" name="organization_name" required maxLength={200} /></div>
            <div><Label htmlFor="contact_person">Contact person *</Label><Input id="contact_person" name="contact_person" required maxLength={200} /></div>
            <div><Label htmlFor="email">Email *</Label><Input id="email" name="email" type="email" required maxLength={200} /></div>
            <div><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" maxLength={50} /></div>
            <div className="sm:col-span-2"><Label htmlFor="website">Website</Label><Input id="website" name="website" type="url" maxLength={500} /></div>
            <div className="sm:col-span-2">
              <Label>Partner category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{cats.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2"><Label htmlFor="message">How would you like to partner?</Label><Textarea id="message" name="message" rows={6} maxLength={4000} /></div>
          </div>
          <Button type="submit" disabled={loading} size="lg" className="w-full gradient-primary text-primary-foreground">
            {loading ? "Submitting..." : "Submit partnership request"}
          </Button>
        </form>
      </section>
    </div>
  );
}

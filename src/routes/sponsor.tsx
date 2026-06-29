import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { HeartHandshake, Building2 } from "lucide-react";
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
      { title: "Sponsorship & Partnership — Fishermen Movement" },
      { name: "description", content: "Sponsor or partner with the Fishermen Movement to help us reach more students across Nigeria. No sign-in required." },
    ],
  }),
  component: SponsorPartnerPage,
});

function SponsorPartnerPage() {
  const [loading, setLoading] = useState(false);
  const [requestType, setRequestType] = useState<"sponsorship" | "partnership">("sponsorship");
  const [supportType, setSupportType] = useState<"personal" | "organizational">("organizational");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      full_name: String(fd.get("full_name") || "").trim().slice(0, 200),
      email: String(fd.get("email") || "").trim().slice(0, 200),
      phone: String(fd.get("phone") || "").trim().slice(0, 50),
      organization_name: supportType === "organizational"
        ? String(fd.get("organization_name") || "").trim().slice(0, 200) || null
        : null,
      support_type: supportType,
      request_type: requestType,
      amount: fd.get("amount") ? Number(fd.get("amount")) : null,
      message: String(fd.get("message") || "").slice(0, 4000) || null,
    };
    const { error } = await supabase.from("support_requests").insert(payload);
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Thank you! Your request has been received. Our team will reach out within 48 hours.");
    (e.target as HTMLFormElement).reset();
    setSupportType("organizational");
    setRequestType("sponsorship");
  }

  return (
    <div>
      <section className="relative isolate overflow-hidden gradient-hero py-20 text-white">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-3 inline-flex items-center gap-2">
            <HeartHandshake className="h-8 w-8 text-accent" />
            <Building2 className="h-8 w-8 text-accent" />
          </div>
          <h1 className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl">Sponsorship &amp; Partnership</h1>
          <p className="mt-4 text-lg text-white/85">
            Support our mission as a sponsor or partner. No sign-in required — submit your request below.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <FundingProgress />
        </div>

        <div className="mx-auto mb-8 grid max-w-3xl gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setRequestType("sponsorship")}
            className={`group relative overflow-hidden rounded-2xl border-2 p-6 text-left transition-all ${
              requestType === "sponsorship"
                ? "border-primary shadow-glow scale-[1.02]"
                : "border-border bg-card hover:border-primary/40"
            }`}
          >
            <HeartHandshake className="mb-2 h-6 w-6 text-primary" />
            <div className="font-display text-lg font-bold">Sponsorship</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
              Fund school visits & student outreach
            </div>
          </button>
          <button
            type="button"
            onClick={() => setRequestType("partnership")}
            className={`group relative overflow-hidden rounded-2xl border-2 p-6 text-left transition-all ${
              requestType === "partnership"
                ? "border-primary shadow-glow scale-[1.02]"
                : "border-border bg-card hover:border-primary/40"
            }`}
          >
            <Building2 className="mb-2 h-6 w-6 text-primary" />
            <div className="font-display text-lg font-bold">Partnership</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
              Collaborate as an organization or institution
            </div>
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="mx-auto max-w-3xl space-y-5 rounded-3xl border border-border bg-card p-8 shadow-card"
        >
          <input type="hidden" name="request_type" value={requestType} />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="full_name">Full name *</Label>
              <Input id="full_name" name="full_name" required maxLength={200} />
            </div>
            <div>
              <Label htmlFor="phone">Phone number *</Label>
              <Input id="phone" name="phone" required maxLength={50} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="email">Email address *</Label>
              <Input id="email" name="email" type="email" required maxLength={200} />
            </div>

            <div className="sm:col-span-2">
              <Label>Support type *</Label>
              <Select value={supportType} onValueChange={(v) => setSupportType(v as "personal" | "organizational")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal (Individual)</SelectItem>
                  <SelectItem value="organizational">Organizational</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {supportType === "organizational" && (
              <div className="sm:col-span-2">
                <Label htmlFor="organization_name">Organization name</Label>
                <Input id="organization_name" name="organization_name" maxLength={200} />
              </div>
            )}

            <div className="sm:col-span-2">
              <Label htmlFor="amount">
                {requestType === "sponsorship" ? "Sponsorship amount (₦)" : "Support amount (₦, optional)"}
              </Label>
              <Input id="amount" name="amount" type="number" min={0} step="0.01" />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="message">Additional message</Label>
              <Textarea id="message" name="message" rows={5} maxLength={4000} placeholder="Tell us how you'd like to support or partner with us..." />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            size="lg"
            className="w-full gradient-primary text-primary-foreground"
          >
            {loading ? "Submitting..." : `Submit ${requestType} request`}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            No account required. Your submission will be reviewed by our team.
          </p>
        </form>
      </section>
    </div>
  );
}

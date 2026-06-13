import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Heart, CreditCard, Building, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { FundingProgress } from "@/components/site/FundingProgress";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Fishermen Movement" },
      { name: "description", content: "Donate via Paystack, Flutterwave or bank transfer. Help us reach the ₦305,000 pilot funding goal." },
    ],
  }),
  component: Donate,
});

const presets = [2000, 5000, 10000, 25000, 50000];

function Donate() {
  const [amount, setAmount] = useState(5000);
  const [provider, setProvider] = useState<"paystack"|"flutterwave"|"bank">("paystack");
  const [loading, setLoading] = useState(false);

  async function onPledge(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      donor_name: String(fd.get("donor_name") || "").slice(0, 200),
      donor_email: String(fd.get("donor_email") || "").slice(0, 200),
      amount,
      provider,
      currency: "NGN",
      status: "pending" as const,
      message: String(fd.get("message") || "").slice(0, 1000),
    };
    const { error } = await supabase.from("donations").insert(payload);
    setLoading(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Pledge recorded! Payment integration coming soon — we'll email instructions.");
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <div>
      <section className="relative isolate overflow-hidden gradient-hero py-20 text-white">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Heart className="mx-auto mb-3 h-10 w-10 text-accent" />
          <h1 className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl">Donate</h1>
          <p className="mt-4 text-lg text-white/85">Help us reach the ₦305,000 pilot goal. Every contribution funds a student session.</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <FundingProgress />
        </div>

        <form onSubmit={onPledge} className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-5 rounded-3xl border border-border bg-card p-8 shadow-card">
            <div>
              <Label>Amount (₦)</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {presets.map(p => (
                  <button key={p} type="button" onClick={() => setAmount(p)}
                    className={`rounded-full px-4 py-2 text-sm font-medium ${amount === p ? "gradient-primary text-primary-foreground shadow-glow" : "border border-border bg-background hover:bg-secondary"}`}>
                    ₦{p.toLocaleString()}
                  </button>
                ))}
              </div>
              <Input type="number" min={100} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="mt-3" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div><Label htmlFor="donor_name">Name</Label><Input id="donor_name" name="donor_name" maxLength={200} /></div>
              <div><Label htmlFor="donor_email">Email</Label><Input id="donor_email" name="donor_email" type="email" maxLength={200} /></div>
            </div>
            <div><Label htmlFor="message">Message (optional)</Label><Input id="message" name="message" maxLength={1000} /></div>

            <div>
              <Label>Payment method</Label>
              <div className="mt-2 grid gap-3 sm:grid-cols-3">
                {[
                  { v: "paystack", l: "Paystack", Icon: CreditCard },
                  { v: "flutterwave", l: "Flutterwave", Icon: Sparkles },
                  { v: "bank", l: "Bank Transfer", Icon: Building },
                ].map(p => (
                  <button key={p.v} type="button" onClick={() => setProvider(p.v as typeof provider)}
                    className={`flex items-center gap-2 rounded-xl border-2 p-4 text-sm font-medium transition ${provider === p.v ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                    <p.Icon className="h-4 w-4" /> {p.l}
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" size="lg" disabled={loading} className="w-full gradient-primary text-primary-foreground">
              <Heart className="mr-2 h-4 w-4" />
              {loading ? "Processing..." : `Donate ₦${amount.toLocaleString()}`}
            </Button>
            <p className="text-xs text-muted-foreground">
              Live payment processing (Paystack & Flutterwave) will activate once gateway credentials are added.
              Bank-transfer pledges receive account details by email.
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-cyber p-8 text-white shadow-elegant">
            <h3 className="font-display text-xl font-bold">Your donation funds</h3>
            <ul className="mt-5 space-y-4">
              {[
                { amt: "₦2,000", impact: "Printed handouts for several students" },
                { amt: "₦10,000", impact: "Internet & communication for a school visit" },
                { amt: "₦30,000", impact: "Projector rental for the pilot phase" },
                { amt: "₦80,000", impact: "Full transportation to all 4 pilot schools" },
              ].map(i => (
                <li key={i.amt} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-white" />
                  <div><div className="font-bold">{i.amt}</div><div className="text-sm opacity-90">{i.impact}</div></div>
                </li>
              ))}
            </ul>
          </div>
        </form>
      </section>
    </div>
  );
}

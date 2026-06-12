import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Fishermen Movement" },
      { name: "description", content: "Reach the Fishermen Movement team. Office in Aba, Abia State, Nigeria." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      full_name: String(fd.get("full_name") || "").trim().slice(0, 200),
      email: String(fd.get("email") || "").trim().slice(0, 200),
      subject: String(fd.get("subject") || "").trim().slice(0, 200),
      message: String(fd.get("message") || "").trim().slice(0, 4000),
    };
    if (!payload.full_name || !payload.email || !payload.message) {
      toast.error("Please fill in name, email, and message.");
      setLoading(false);
      return;
    }
    const { error } = await supabase.from("contact_messages").insert(payload);
    setLoading(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Message sent. We'll get back to you shortly.");
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <div>
      <section className="relative isolate overflow-hidden gradient-hero py-20 text-white">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl">Get in touch</h1>
          <p className="mt-4 text-lg text-white/85">Questions, partnerships, or media inquiries — we'd love to hear from you.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-border bg-card p-8 shadow-card">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="full_name">Full name</Label>
                <Input id="full_name" name="full_name" required maxLength={200} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required maxLength={200} className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" maxLength={200} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" required rows={6} maxLength={4000} className="mt-1.5" />
            </div>
            <Button type="submit" disabled={loading} size="lg" className="w-full gradient-primary text-primary-foreground">
              <Send className="mr-2 h-4 w-4" /> {loading ? "Sending..." : "Send message"}
            </Button>
          </form>

          <div className="space-y-4">
            {[
              { Icon: MapPin, label: "Office", value: SITE.address },
              { Icon: Mail, label: "Email", value: SITE.email },
              { Icon: Phone, label: "Phone", value: SITE.phone },
            ].map((c) => (
              <div key={c.label} className="hover-lift rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-primary-foreground">
                  <c.Icon className="h-5 w-5" />
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</div>
                <div className="mt-1 font-medium">{c.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

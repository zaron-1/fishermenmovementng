import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Shield, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/volunteer")({
  head: () => ({
    meta: [
      { title: "Become a Volunteer — Fishermen Movement" },
      { name: "description", content: "Apply to volunteer as a cybersecurity professional, ethical hacker, IT professional, teacher, or community volunteer." },
    ],
  }),
  component: VolunteerPage,
});

const occupations = ["Cybersecurity Professional", "Ethical Hacker", "IT Professional", "Teacher", "Trainer", "Student", "Community Volunteer"];

function VolunteerPage() {
  const [loading, setLoading] = useState(false);
  const [cv, setCv] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [occupation, setOccupation] = useState("");

  async function uploadOptional(file: File | null, folder: string) {
    if (!file) return null;
    if (file.size > 5 * 1024 * 1024) { toast.error(`${file.name} exceeds 5MB`); throw new Error("file too large"); }
    const { data: { user } } = await supabase.auth.getUser();
    const path = `${user?.id || "public"}/${folder}/${crypto.randomUUID()}-${file.name}`;
    const { error } = await supabase.storage.from("volunteer-files").upload(path, file);
    if (error) throw error;
    return path;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData(e.currentTarget);
      const cv_url = await uploadOptional(cv, "cv");
      const photo_url = await uploadOptional(photo, "photo");
      const { data: { user } } = await supabase.auth.getUser();
      const payload = {
        user_id: user?.id ?? null,
        full_name: String(fd.get("full_name") || "").slice(0, 200),
        email: String(fd.get("email") || "").slice(0, 200),
        phone: String(fd.get("phone") || "").slice(0, 50),
        state: String(fd.get("state") || "").slice(0, 100),
        city: String(fd.get("city") || "").slice(0, 100),
        occupation,
        organization: String(fd.get("organization") || "").slice(0, 200),
        linkedin_url: String(fd.get("linkedin_url") || "").slice(0, 500),
        years_experience: Number(fd.get("years_experience")) || null,
        expertise: String(fd.get("expertise") || "").slice(0, 500),
        motivation: String(fd.get("motivation") || "").slice(0, 4000),
        cv_url,
        photo_url,
      };
      if (!payload.full_name || !payload.email) { toast.error("Name and email are required"); setLoading(false); return; }
      const { error } = await supabase.from("volunteers").insert(payload);
      if (error) throw error;
      toast.success("Application submitted. We'll be in touch shortly!");
      (e.target as HTMLFormElement).reset();
      setCv(null); setPhoto(null); setOccupation("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <section className="relative isolate overflow-hidden gradient-hero py-20 text-white">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Shield className="mx-auto mb-3 h-10 w-10 text-accent" />
          <h1 className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl">Become a Volunteer</h1>
          <p className="mt-4 text-lg text-white/85">Share your skills with the next generation of Nigerian students.</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <form onSubmit={onSubmit} className="space-y-6 rounded-3xl border border-border bg-card p-8 shadow-card">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label htmlFor="full_name">Full name *</Label><Input id="full_name" name="full_name" required maxLength={200} /></div>
            <div><Label htmlFor="email">Email *</Label><Input id="email" name="email" type="email" required maxLength={200} /></div>
            <div><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" maxLength={50} /></div>
            <div><Label htmlFor="state">State</Label><Input id="state" name="state" defaultValue="Abia" maxLength={100} /></div>
            <div><Label htmlFor="city">City</Label><Input id="city" name="city" defaultValue="Aba" maxLength={100} /></div>
            <div>
              <Label>Occupation</Label>
              <Select value={occupation} onValueChange={setOccupation}>
                <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                <SelectContent>{occupations.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label htmlFor="organization">Organization</Label><Input id="organization" name="organization" maxLength={200} /></div>
            <div><Label htmlFor="linkedin_url">LinkedIn URL</Label><Input id="linkedin_url" name="linkedin_url" type="url" maxLength={500} /></div>
            <div><Label htmlFor="years_experience">Years of experience</Label><Input id="years_experience" name="years_experience" type="number" min={0} max={60} /></div>
            <div className="sm:col-span-2"><Label htmlFor="expertise">Area of expertise</Label><Input id="expertise" name="expertise" placeholder="e.g. Network security, Ethical hacking, Awareness training" maxLength={500} /></div>
            <div className="sm:col-span-2">
              <Label htmlFor="motivation">Why do you want to join?</Label>
              <Textarea id="motivation" name="motivation" rows={5} maxLength={4000} />
            </div>
            <div>
              <Label>CV (PDF, ≤5MB)</Label>
              <label className="mt-1.5 flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-border bg-background text-sm hover:bg-secondary">
                <Upload className="h-4 w-4" />{cv?.name || "Upload CV"}
                <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => setCv(e.target.files?.[0] || null)} />
              </label>
            </div>
            <div>
              <Label>Profile photo (≤5MB)</Label>
              <label className="mt-1.5 flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-border bg-background text-sm hover:bg-secondary">
                <Upload className="h-4 w-4" />{photo?.name || "Upload photo"}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setPhoto(e.target.files?.[0] || null)} />
              </label>
            </div>
          </div>
          <Button type="submit" disabled={loading} size="lg" className="w-full gradient-primary text-primary-foreground">
            {loading ? "Submitting..." : "Submit application"}
          </Button>
        </form>
      </section>
    </div>
  );
}

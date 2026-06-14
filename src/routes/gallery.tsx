import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ImageOff } from "lucide-react";
import ict from "@/assets/students-ict.jpg";
import training from "@/assets/training-session.jpg";
import outreach from "@/assets/community-outreach.jpg";
import hero from "@/assets/hero-students.jpg";
import onitshaLab from "@/assets/gallery-onitsha-lab.jpg.asset.json";
import literacyClub from "@/assets/gallery-literacy-club.jpg.asset.json";
import ictLab from "@/assets/gallery-ict-lab.jpg.asset.json";
import cyberLab from "@/assets/gallery-cyber-lab.jpg.asset.json";
import studentCoding from "@/assets/gallery-student-coding.jpg.asset.json";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Fishermen Movement" },
      { name: "description", content: "Photos and videos from school visits, training sessions, workshops, volunteers, and community engagement." },
      { property: "og:title", content: "Gallery — Fishermen Movement" },
    ],
  }),
  component: Gallery,
});

type Item = { id: string; title: string | null; caption: string | null; category: string; media_url: string };

const fallback: Item[] = [
  { id: "a1", title: "Computer lab session", caption: "Students engaged in classroom ICT learning", category: "school_visits", media_url: onitshaLab.url },
  { id: "a2", title: "Digital Literacy Club", caption: "Peer learning during a club meeting", category: "training_sessions", media_url: literacyClub.url },
  { id: "a3", title: "ICT Lab outreach", caption: "Secondary school students at the workstations", category: "school_visits", media_url: ictLab.url },
  { id: "a4", title: "Cybersecurity training room", caption: "Threat-monitoring environment used during workshops", category: "workshops", media_url: cyberLab.url },
  { id: "a5", title: "Hands-on coding", caption: "Student practicing command-line tools", category: "training_sessions", media_url: studentCoding.url },
  { id: "1", title: "ICT lab session", caption: "Students learning password security", category: "training_sessions", media_url: ict },
  { id: "2", title: "Workshop in progress", caption: "Phishing demo with projector", category: "workshops", media_url: training },
  { id: "3", title: "Certificate day", caption: "Graduating cohort in Aba", category: "community_engagement", media_url: outreach },
  { id: "4", title: "Classroom session", caption: "Whiteboard cybersecurity diagrams", category: "school_visits", media_url: hero },
];

const categories = [
  { value: "all", label: "All" },
  { value: "school_visits", label: "School Visits" },
  { value: "training_sessions", label: "Training Sessions" },
  { value: "workshops", label: "Workshops" },
  { value: "volunteers", label: "Volunteers" },
  { value: "community_engagement", label: "Community" },
];

function Gallery() {
  const [items, setItems] = useState<Item[]>(fallback);
  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState<Item | null>(null);

  useEffect(() => {
    supabase.from("gallery_media").select("id,title,caption,category,media_url").order("created_at", { ascending: false }).then(({ data }) => {
      if (data && data.length) setItems(data as Item[]);
    });
  }, []);

  const filtered = active === "all" ? items : items.filter((i) => i.category === active);

  return (
    <div>
      <section className="relative isolate overflow-hidden gradient-hero py-20 text-white">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl">Project Gallery</h1>
          <p className="mt-4 text-lg text-white/85">Moments from the field — students, trainers, and communities.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setActive(c.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === c.value ? "gradient-primary text-primary-foreground shadow-glow" : "border border-border bg-card hover:bg-secondary"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-24 text-muted-foreground">
            <ImageOff className="h-12 w-12" />
            <p>No media in this category yet.</p>
          </div>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {filtered.map((it) => (
              <button
                key={it.id}
                onClick={() => setLightbox(it)}
                className="group block w-full overflow-hidden rounded-2xl bg-card text-left shadow-card transition-transform hover:scale-[1.02]"
              >
                <img src={it.media_url} alt={it.title || ""} className="w-full" loading="lazy" />
                {(it.title || it.caption) && (
                  <div className="p-4">
                    {it.title && <div className="font-semibold">{it.title}</div>}
                    {it.caption && <div className="text-xs text-muted-foreground">{it.caption}</div>}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </section>

      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <img src={lightbox.media_url} alt={lightbox.title || ""} className="max-h-[90vh] max-w-full rounded-2xl shadow-elegant" />
        </div>
      )}
    </div>
  );
}

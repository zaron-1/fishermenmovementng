import { createFileRoute } from "@tanstack/react-router";
import { Lock, ShieldAlert, Mail, Check } from "lucide-react";

export const Route = createFileRoute("/curriculum")({
  head: () => ({
    meta: [
      { title: "Programme Curriculum — Fishermen Movement" },
      { name: "description", content: "Three-module curriculum: Online Safety & Digital Footprint, Cybercrime Risks & Prevention, and Phishing Awareness & Prevention." },
      { property: "og:title", content: "Curriculum — Fishermen Movement" },
    ],
  }),
  component: Curriculum,
});

const modules = [
  {
    Icon: Lock,
    title: "Online Safety & Digital Footprint",
    color: "from-blue-500 to-cyan-500",
    topics: [
      "Personal information protection",
      "Password security",
      "Privacy settings",
      "Social media safety",
      "Responsible online behavior",
      "Digital reputation",
    ],
  },
  {
    Icon: ShieldAlert,
    title: "Cybercrime Risks & Prevention",
    color: "from-cyan-500 to-teal-500",
    topics: [
      "Common cybercrimes",
      "Online scams",
      "Ethical technology use",
      "Consequences of cybercrime",
    ],
  },
  {
    Icon: Mail,
    title: "Phishing Awareness & Prevention",
    color: "from-teal-500 to-blue-600",
    topics: [
      "Email phishing",
      "SMS phishing",
      "Social engineering",
      "Fake websites",
      "Suspicious links",
      "Reporting cyber incidents",
    ],
  },
];

function Curriculum() {
  return (
    <div>
      <section className="relative isolate overflow-hidden gradient-hero py-20 text-white">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">What students learn</div>
          <h1 className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl">Programme Curriculum</h1>
          <p className="mt-6 text-lg text-white/85">
            Three focused modules designed for Nigerian secondary school students. Practical, interactive,
            and rooted in real-world case studies.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {modules.map((m, i) => (
            <div key={m.title} className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${m.color} p-10 text-white shadow-elegant ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <div className="relative">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                    <m.Icon className="h-8 w-8" />
                  </div>
                  <div className="mt-6 text-xs font-semibold uppercase tracking-widest opacity-90">Section {i + 1}</div>
                  <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{m.title}</h2>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Topics covered</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {m.topics.map((t) => (
                    <li key={t} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-card hover-lift">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full gradient-primary text-primary-foreground">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-sm font-medium">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

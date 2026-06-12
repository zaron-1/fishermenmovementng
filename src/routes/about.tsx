import { createFileRoute } from "@tanstack/react-router";
import { FileText, Target, AlertTriangle, MapPin, Goal, Users, Heart, Coins, CalendarClock, BookOpen } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Project — Fishermen Movement" },
      { name: "description", content: "Full project proposal: background, justification, goals, beneficiaries, timeline and curriculum for the Fishermen Movement Cyber Safety Campaign." },
      { property: "og:title", content: "About — Fishermen Movement Cyber Safety Campaign" },
    ],
  }),
  component: About,
});

const sections = [
  {
    Icon: FileText,
    title: "Executive Summary",
    body: "The Fishermen Movement Cyber Safety, Anti-Phishing and Digital Responsibility Awareness Campaign is a community-driven initiative based in Aba, Abia State, dedicated to equipping Nigerian secondary school students with the knowledge and habits required to navigate today's digital world safely. Through hands-on classroom workshops, peer mentorship, and partnerships with schools and technology professionals, the programme aims to reach 4,800–9,600 students annually across Abia State.",
  },
  {
    Icon: BookOpen,
    title: "Project Background",
    body: "Nigerian secondary school students are increasingly exposed to digital tools — smartphones, social media, messaging apps and online learning — without the foundational training to use them safely. Phishing, online scams, identity theft, and exposure to harmful content are growing concerns. The Fishermen Movement was founded to bridge this gap with structured, age-appropriate cybersecurity education.",
  },
  {
    Icon: Target,
    title: "Project Justification",
    body: "While Nigeria has produced world-class technology talent, cyber safety education at the secondary school level remains nearly absent from mainstream curricula. Without early intervention, students become victims or unwitting participants in cybercrime. Aba — a fast-growing commercial hub — is the ideal launchpad for a model that can scale across Nigeria.",
  },
  {
    Icon: AlertTriangle,
    title: "Problem Statement",
    body: "Students lack awareness of basic online safety practices, can't recognise phishing attempts, frequently overshare personal information, and have limited understanding of the legal and ethical consequences of cybercrime. Schools rarely have qualified personnel to fill this gap.",
  },
  {
    Icon: MapPin,
    title: "Why Aba Needs This Initiative",
    body: "Aba has a young, mobile-first population and a thriving commercial culture, which together create high exposure to cyber-enabled fraud. Local secondary schools have expressed strong interest in cyber safety education but lack the curriculum and trainers. Aba's central location in southeastern Nigeria makes it an effective pilot site.",
  },
  {
    Icon: AlertTriangle,
    title: "Current Cybersecurity Challenges Facing Students",
    body: "Phishing emails and fake account login pages, social engineering through WhatsApp and Instagram, romance and investment scams, malware-laden cracked software, account takeover, exposure to predatory content, and pressure to participate in low-level cybercrime ('Yahoo Yahoo').",
  },
  {
    Icon: Goal,
    title: "Project Goal",
    body: "To build a digitally responsible generation of Nigerian students by delivering structured, recurring cyber safety training to secondary schools across Aba and the wider Abia State.",
  },
  {
    Icon: Target,
    title: "Project Objectives",
    body: "1) Deliver weekly cyber safety workshops in at least one secondary school per week. 2) Train 4,800–9,600 students annually. 3) Build a volunteer corps of cybersecurity, IT, and education professionals. 4) Establish school-based 'Cyber Safety Clubs' for peer mentorship. 5) Produce open educational resources adapted to the Nigerian context.",
  },
  {
    Icon: Users,
    title: "Target Beneficiaries",
    body: "Secondary school students aged 12–18 in Aba and Abia State; teachers and school administrators; parents and guardians; and the broader Abia community through awareness materials.",
  },
  {
    Icon: Heart,
    title: "Expected Impact",
    body: "Measurable reduction in phishing victimisation, increased reporting of suspicious activity, formation of student-led cyber safety clubs, and a documented curriculum that can be adopted by other Nigerian states.",
  },
  {
    Icon: Coins,
    title: "Funding Strategy",
    body: "A diversified funding mix: corporate sponsorships across Platinum, Gold, Silver, Bronze and Community tiers; partnerships with government agencies and educational institutions; individual donations through Paystack and Flutterwave; and in-kind support (training facilities, devices, logistics).",
  },
  {
    Icon: CalendarClock,
    title: "Pilot Programme",
    body: "A 12-week pilot in 12 secondary schools across Aba, refining curriculum delivery, measuring learning outcomes, and gathering feedback before expanding to the rest of Abia State.",
  },
  {
    Icon: CalendarClock,
    title: "Implementation Timeline",
    body: "Year 1 — Pilot in Aba (48 schools). Year 2 — Expand across Abia State and begin certifying student leaders. Year 3 — Replicate the model in 2 additional states.",
  },
  {
    Icon: BookOpen,
    title: "Curriculum",
    body: "Three modules delivered across short, interactive sessions: Online Safety & Digital Footprint; Cybercrime Risks & Prevention; Phishing Awareness & Prevention. Each module includes live demonstrations, real Nigerian case studies, and group exercises.",
  },
];

function About() {
  return (
    <div>
      <section className="relative isolate overflow-hidden gradient-hero py-20 text-white">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Project Proposal</div>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">About the Fishermen Movement</h1>
          <p className="mt-6 text-lg text-white/85">
            A comprehensive cyber safety, anti-phishing and digital responsibility programme for secondary
            school students in Aba and Abia State.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {sections.map((s, i) => (
            <div key={s.title} className="grid gap-6 md:grid-cols-[auto_1fr] animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl gradient-primary text-primary-foreground shadow-glow">
                <s.Icon className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h2 className="font-display text-2xl font-bold sm:text-3xl">{s.title}</h2>
                <p className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

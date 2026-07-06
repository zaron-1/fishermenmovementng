import { createFileRoute } from "@tanstack/react-router";
import {
  FileText, BookOpen, Target, AlertTriangle, MapPin, Goal, Users, GraduationCap,
  CalendarClock, Wrench, ListChecks, TrendingUp, FlaskConical, ShieldAlert, Coins,
  Wallet, CheckCircle2, Lock, Mail
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Project Proposal — Fishermen Movement Cyber Safety Campaign" },
      { name: "description", content: "Full project proposal: Cyber Safety, Anti-Phishing and Digital Responsibility Awareness Campaign for secondary schools in Aba, Abia State. Pilot phase: late June 2026." },
      { property: "og:title", content: "Project Proposal — Fishermen Movement" },
      { property: "og:description", content: "Cyber Safety, Anti-Phishing and Digital Responsibility Awareness Campaign for secondary schools in Aba, Abia State." },
    ],
  }),
  component: About,
});

type Section = {
  Icon: typeof FileText;
  title: string;
  body?: string;
  bullets?: string[];
  groups?: { heading: string; items: string[] }[];
};

const sections: Section[] = [
  {
    Icon: FileText,
    title: "Executive Summary",
    body:
      "The Fishermen Movement proposes the implementation of a Cyber Safety, Anti-Phishing and Digital Responsibility Awareness Campaign for Secondary School Students in Aba, Abia State.\n\n" +
      "The project seeks to address the growing exposure of young people to cyber threats such as phishing attacks, online scams, cyberbullying, identity theft, misinformation, social engineering attacks, sextortion, and other forms of online exploitation.\n\n" +
      "With increasing smartphone ownership and internet access among Nigerian youths, many students are now active internet users without adequate knowledge of online safety practices. As a result, they are vulnerable to becoming victims of cybercrime and online manipulation.\n\n" +
      "The project will provide practical cybersecurity awareness education to Senior Secondary School students (SS1–SS3) through structured sensitization sessions conducted directly within schools.\n\n" +
      "The pilot phase will commence in late June 2026 and target one secondary school per week, reaching approximately four schools during the pilot period.",
  },
  {
    Icon: BookOpen,
    title: "Project Background",
    body:
      "Technology has become an integral part of everyday life for young people. Students now use smartphones, social media platforms, messaging applications, online gaming platforms, and digital learning resources daily.\n\n" +
      "While these technologies provide educational and economic opportunities, they also expose young people to increasing cyber risks. In recent years, cybercriminals have shifted focus toward younger internet users because they are often less aware of online threats and more likely to trust suspicious messages, links, and offers.\n\n" +
      "Students frequently encounter:",
    bullets: [
      "Phishing messages",
      "Fake scholarship offers",
      "Social media scams",
      "Identity theft",
      "Online fraud",
      "Cyberbullying",
      "Sextortion",
      "Misinformation and fake news",
      "Recruitment into cybercrime activities",
    ],
  },
  {
    Icon: Target,
    title: "Project Justification",
    body:
      "The need for this project is strongly supported by current realities in Nigeria.\n\n" +
      "Nigeria is one of Africa's largest digital markets, with approximately 142 million active internet subscriptions as of April 2025, according to data from the Nigerian Communications Commission (NCC). Internet penetration in Nigeria stood at about 45.4% of the population in 2025, demonstrating the rapid growth of digital access among young people and students.\n\n" +
      "Research conducted by Adeola O. Opesade and Abiodun O. Adetona (2020) among 400 secondary school students in Ibadan, Nigeria, found that students were regular internet users and were exposed to considerable cyber risks, including cyberbullying and online sexual solicitation. The researchers concluded that internet safety education should be intentionally integrated into school programs to help students navigate online spaces safely.\n\n" +
      "A more recent study by Munachimso B. Oguine, Ozioma C. Oguine, Karla Badillo-Urquiola, and Oluwasogo A. Okunade (2025) surveyed 409 secondary school adolescents in the Federal Capital Territory (FCT), Nigeria. The study found that adolescents who encountered online risks frequently reported exposure to online scams and inappropriate content. The researchers recommended increased awareness campaigns, digital safety education, stronger parental guidance, and improved online safety tools to protect young people.\n\n" +
      "Concerns about unhealthy internet use are also increasing. A study published in Computers in Human Behavior (2022) by researchers examining 741 secondary school students in Lagos found evidence of problematic internet use among adolescents and linked it to negative outcomes such as aggression and dissatisfaction with family life.\n\n" +
      "Further evidence comes from a 2025 study in Calabar Municipality, Nigeria, which reported that 62.6% of surveyed in-school adolescents exhibited problematic internet use (PIU). The researchers identified significant associations between problematic internet use and factors such as loneliness, low self-esteem, and other psychosocial challenges, highlighting the urgent need for digital literacy and responsible online behavior interventions.\n\n" +
      "Cybercrime has also become a major national concern. The Chairman of the Economic and Financial Crimes Commission (EFCC), Ola Olukoyede, warned in 2023 about the growing involvement of young people in internet-related fraud and called for greater public enlightenment and preventive education to address the trend.\n\n" +
      "Taken together, these findings demonstrate a clear need for structured digital literacy, cyber safety, and responsible internet-use programs targeted at Nigerian adolescents. Such interventions can help reduce exposure to online scams, cyberbullying, harmful content, problematic internet use, and recruitment into cybercrime activities while equipping young people with the knowledge and skills required for safe participation in the digital economy.",
    groups: [
      {
        heading: "Key Statistics",
        items: [
          "Active internet subscriptions in Nigeria (2025): 141.5 million+ — NCC (2025)",
          "Internet penetration rate (2025): 45.4% — Statista (2025)",
          "Secondary school students surveyed in Ibadan cyber-risk study: 400 — Opesade & Adetona (2020)",
          "Adolescents surveyed in FCT online safety study: 409 — Oguine et al. (2025)",
          "Lagos adolescents surveyed on problematic internet use: 741 — Computers in Human Behavior (2022)",
          "Problematic internet use among adolescents in Calabar: 62.6% — Calabar Municipality study (2025)",
        ],
      },
    ],
  },
  {
    Icon: MapPin,
    title: "Why Aba?",
    body:
      "Aba is one of Nigeria's most active commercial cities with widespread access to smartphones, internet services, social media platforms, and digital technologies.\n\n" +
      "Many students in Aba own smartphones or have regular access to internet-enabled devices. However, there are limited structured school-based programmes dedicated specifically to cybersecurity awareness, phishing prevention, digital responsibility, and online safety. This project seeks to fill that gap.",
  },
  {
    Icon: Goal,
    title: "Project Goal",
    body:
      "To increase cybersecurity awareness and digital responsibility among at least 200–400 secondary school students across four selected secondary schools in Aba, Abia State, through structured 30–45 minute cyber safety and anti-phishing sensitization sessions conducted within one month of implementation, thereby improving students' ability to identify common cyber threats, practice safer online behavior, and make responsible digital decisions.",
  },
  {
    Icon: ListChecks,
    title: "Project Objectives",
    body: "The project aims to:",
    bullets: [
      "Increase awareness of cyber threats among students.",
      "Educate students on online safety best practices.",
      "Teach students how to identify and avoid phishing attacks.",
      "Promote responsible social media behavior.",
      "Educate students on digital footprints and online reputation.",
      "Discourage youth involvement in cybercrime.",
      "Encourage ethical and responsible technology use.",
      "Build a culture of digital responsibility among young people.",
    ],
  },
  {
    Icon: Users,
    title: "Target Beneficiaries",
    body:
      "Primary Target Group: Senior Secondary School Students (SS1–SS3).\n\n" +
      "Rationale: Students within this age group are among the most active internet users and are more likely to encounter cyber threats through social media, email, messaging platforms, and online communities.",
  },
  {
    Icon: BookOpen,
    title: "Project Curriculum",
    groups: [
      {
        heading: "Module 1 — Online Safety and Digital Footprint",
        items: [
          "Personal information protection",
          "Password security",
          "Privacy settings",
          "Safe social media use",
          "Responsible online behavior",
          "Building a positive digital reputation",
        ],
      },
      {
        heading: "Module 2 — Cybercrime Risks and Prevention",
        items: [
          "Common cybercrime techniques",
          "Online scams",
          "Internet fraud awareness",
          "Consequences of cybercrime",
          "Ethical technology use",
        ],
      },
      {
        heading: "Module 3 — Phishing Awareness and Prevention",
        items: [
          "What phishing is",
          "Types of phishing attacks",
          "Email phishing",
          "SMS phishing",
          "Social media scams",
          "Fake websites",
          "Suspicious links",
          "Reporting cyber incidents",
        ],
      },
    ],
  },
  {
    Icon: CalendarClock,
    title: "Project Implementation Plan",
    body:
      "Pilot Phase: Mid–Late September to Late October 2026 (one-month milestone).\n\n" +
      "Frequency: One school per week.\n" +
      "Session duration: 30–45 minutes.\n" +
      "Coverage: 4 schools during the pilot phase.\n" +
      "Estimated reach: 50–100 students per school (200–400 students during pilot phase).\n\n" +
      "Annual Projection: Subject to funding and programme expansion, additional schools across Aba and other communities within Abia State may be reached.",
  },
  {
    Icon: Wrench,
    title: "Programme Inputs",
    groups: [
      {
        heading: "Human Resources",
        items: [
          "Project Coordinator",
          "Volunteer Facilitators",
          "Cybersecurity Professionals",
          "ICT Specialists",
          "School Liaison Officers",
          "Administrative Support Team",
        ],
      },
      {
        heading: "Equipment and Materials",
        items: [
          "Laptop Computers",
          "Multimedia Projector",
          "Television Screens",
          "Public Address System",
          "Presentation Slides",
          "Educational Flyers",
          "Attendance Registers",
          "Internet Connectivity",
        ],
      },
    ],
  },
  {
    Icon: CheckCircle2,
    title: "Programme Outputs (Pilot)",
    bullets: [
      "Four schools sensitized",
      "Four awareness sessions conducted",
      "200–400 students trained",
      "Educational materials distributed",
      "Improved awareness of cyber threats and online safety practices",
    ],
  },
  {
    Icon: TrendingUp,
    title: "Expected Outcomes",
    groups: [
      {
        heading: "Short-Term Outcomes",
        items: [
          "Increased cybersecurity awareness",
          "Better understanding of phishing threats",
          "Improved online behavior",
          "Safer social media practices",
        ],
      },
      {
        heading: "Long-Term Outcomes",
        items: [
          "Reduced susceptibility to online scams",
          "Reduction in youth participation in cybercrime",
          "Improved digital literacy",
          "Development of responsible digital citizens",
          "Safer online communities",
        ],
      },
    ],
  },
  {
    Icon: FlaskConical,
    title: "Pilot Programme",
    body: "The pilot phase will serve as a proof-of-concept for future expansion. Objectives of the pilot:",
    bullets: [
      "Test programme effectiveness",
      "Measure student engagement",
      "Gather stakeholder feedback",
      "Improve delivery methods",
      "Develop a scalable model for wider implementation",
    ],
  },
  {
    Icon: ShieldAlert,
    title: "Risks and Mitigation",
    groups: [
      { heading: "Limited Funding", items: ["Partnerships, sponsorships, donations, and volunteer support."] },
      { heading: "School Scheduling Challenges", items: ["Early engagement with school administrators."] },
      { heading: "Equipment Failure", items: ["Backup equipment and printed materials."] },
      { heading: "Low Participation", items: ["Stakeholder engagement and awareness campaigns."] },
    ],
  },
  {
    Icon: Coins,
    title: "Funding Strategy",
    groups: [
      {
        heading: "Current Sources",
        items: [
          "Personal contributions from members of the Fishermen Movement",
          "Volunteer support",
        ],
      },
      {
        heading: "Proposed Sources",
        items: [
          "Government agencies",
          "Educational institutions",
          "NGOs",
          "Charitable organizations",
          "Corporate sponsors",
          "Community leaders",
          "Philanthropists",
          "Technology organizations",
          "RAD5 Tech Hub",
        ],
      },
    ],
    body: "Formal partnership requests, sponsorship letters, and funding proposals will be submitted immediately following approval of the project framework.",
  },
  {
    Icon: Wallet,
    title: "Revised Pilot Project Budget (1 Month)",
    groups: [
      {
        heading: "Line Items",
        items: [
          "Educational Materials, Flyers, Handouts, Banners, Publicity Materials, Stationery and Documentation — ₦100,000",
          "Projector Rental / Maintenance — ₦30,000",
          "Transportation to Schools — ₦80,000",
          "Internet and Communication — ₦15,000",
          "Volunteer Logistics and Refreshments — ₦50,000",
          "Contingency — ₦30,000",
          "TOTAL ESTIMATED BUDGET — ₦305,000",
        ],
      },
      {
        heading: "Budget Notes",
        items: [
          "The project will leverage volunteer support and donated resources wherever possible.",
          "Existing equipment owned by volunteers and partners will significantly reduce implementation costs.",
          "School facilities will be utilized for programme delivery, eliminating venue expenses.",
          "Additional sponsorship and partnerships will allow expansion beyond the pilot phase.",
          "Budget figures may be reviewed periodically based on project growth and stakeholder support.",
        ],
      },
    ],
  },
  {
    Icon: AlertTriangle,
    title: "Conclusion",
    body:
      "Every successful phishing attack, online scam, cyberbullying incident, or recruitment into cybercrime begins with a lack of awareness.\n\n" +
      "This project seeks to address the problem at its root by educating young people before they become victims or participants.\n\n" +
      "By investing in this initiative, partners will contribute to raising a generation of digitally responsible students who can safely and productively participate in the digital economy.",
  },
];

const meta = [
  { Icon: CalendarClock, label: "Proposed Start", value: "September 2026" },
  { Icon: MapPin, label: "Location", value: "Aba, Abia State, Nigeria" },
  { Icon: GraduationCap, label: "Pilot Duration", value: "1 Month — 4 Schools" },
  { Icon: Users, label: "Pilot Reach", value: "200–400 Students (SS1–SS3)" },
];

function About() {
  return (
    <div>
      <section className="relative isolate overflow-hidden gradient-hero py-24 text-white">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Project Proposal</div>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Cyber Safety, Anti-Phishing & Digital Responsibility
          </h1>
          <p className="mt-4 text-base font-medium uppercase tracking-widest text-white/80">
            Awareness Campaign for Secondary Schools in Aba, Abia State
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/85">
            Implementing Organization: <strong>Fishermen Movement</strong>. A pilot programme reaching SS1–SS3
            students with practical cybersecurity education, beginning September 2026.
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="rounded-2xl border border-white/15 bg-white/10 p-4 text-left backdrop-blur-md">
                <m.Icon className="mb-2 h-5 w-5 text-accent" />
                <div className="text-[10px] uppercase tracking-widest text-white/60">{m.label}</div>
                <div className="mt-0.5 text-sm font-semibold">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-14">
          {sections.map((s, i) => (
            <article
              key={s.title}
              className="grid gap-6 md:grid-cols-[auto_1fr] animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl gradient-primary text-primary-foreground shadow-glow">
                <s.Icon className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h2 className="font-display text-2xl font-bold sm:text-3xl">{s.title}</h2>
                {s.body && (
                  <p className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">{s.body}</p>
                )}
                {s.bullets && (
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.groups && (
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {s.groups.map((g) => (
                      <div key={g.heading} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                        <div className="font-display text-base font-bold">{g.heading}</div>
                        <ul className="mt-3 space-y-1.5">
                          {g.items.map((it) => (
                            <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 rounded-3xl gradient-hero p-8 text-center text-white shadow-elegant sm:p-12">
          <Lock className="mx-auto mb-3 h-7 w-7 text-accent" />
          <h3 className="font-display text-2xl font-bold sm:text-3xl">Partner with the Fishermen Movement</h3>
          <p className="mx-auto mt-3 max-w-2xl text-white/85">
            Sponsorship, donations, equipment, or volunteer hours — every contribution helps protect a
            Nigerian student from cybercrime.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm backdrop-blur-md">
            <Mail className="h-4 w-4 text-accent" />
            <span>fishermenmovement@gmail.com</span>
          </div>
        </div>
      </section>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";
import { CalendarDays, Calendar, CalendarRange, Users } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Project Impact — Fishermen Movement" },
      { name: "description", content: "Reaching 75 students weekly, 300 monthly, and 3,900 students annually across Abia State." },
      { property: "og:title", content: "Impact — Fishermen Movement" },
    ],
  }),
  component: Impact,
});

const WEEKLY = 75;
const MONTHLY = WEEKLY * 4; // 300
const QUARTERLY = MONTHLY * 3; // 900
const ANNUAL = 3900;

const cadence = [
  { Icon: Calendar, value: WEEKLY, label: "Students per week" },
  { Icon: CalendarDays, value: MONTHLY, label: "Students per month" },
  { Icon: CalendarRange, value: QUARTERLY, label: "Students per quarter" },
  { Icon: Users, value: ANNUAL, label: "Students per year" },
];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const projection = MONTHS.map((m, i) => ({
  month: m,
  students: Math.round(((i + 1) / 12) * ANNUAL),
}));

const breakdown = [
  { quarter: "Q1", students: QUARTERLY },
  { quarter: "Q2", students: QUARTERLY },
  { quarter: "Q3", students: QUARTERLY },
  { quarter: "Q4", students: ANNUAL - QUARTERLY * 3 },
];

function Impact() {
  return (
    <div>
      <section className="relative isolate overflow-hidden gradient-hero py-20 text-white">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Reach & Outcomes</div>
          <h1 className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl">Project Impact</h1>
          <p className="mt-6 text-lg text-white/85">
            A consistent weekly cadence compounds into transformative annual reach across Aba and Abia State.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cadence.map((c) => (
            <div key={c.label} className="hover-lift rounded-3xl border border-border bg-card p-8 text-center shadow-card">
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary text-primary-foreground shadow-glow">
                <c.Icon className="h-6 w-6" />
              </div>
              <div className="font-display text-5xl font-bold text-gradient">
                <AnimatedCounter value={c.value} />
              </div>
              <div className="mt-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">{c.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl bg-gradient-cyber p-1 shadow-elegant">
          <div className="rounded-[calc(1.5rem-4px)] bg-card p-8 text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">Estimated Annual Reach</div>
            <div className="mt-2 font-display text-5xl font-bold sm:text-6xl">
              <AnimatedCounter value={ANNUAL} /> Students
            </div>
            <p className="mt-2 text-muted-foreground">Reached every single year across Abia State secondary schools.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-display text-lg font-bold">Cumulative students reached (year 1)</h3>
            <div className="mt-6 h-72">
              <ResponsiveContainer>
                <AreaChart data={projection}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.42 0.18 254)" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="oklch(0.42 0.18 254)" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="students" stroke="oklch(0.42 0.18 254)" fill="url(#g1)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-display text-lg font-bold">Quarterly student reach (min–max)</h3>
            <div className="mt-6 h-72">
              <ResponsiveContainer>
                <BarChart data={breakdown}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="quarter" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="min" fill="oklch(0.42 0.18 254)" radius={[8,8,0,0]} />
                  <Bar dataKey="max" fill="oklch(0.65 0.2 175)" radius={[8,8,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

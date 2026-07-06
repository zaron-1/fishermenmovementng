import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shield, Mail, ShieldAlert, Lock, Users, Building2, HeartHandshake, ArrowRight, GraduationCap, MapPin, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";
import { FundingProgress } from "@/components/site/FundingProgress";
import { supabase } from "@/integrations/supabase/client";
import hero from "@/assets/hero-students.jpg";

import training from "@/assets/training-session.jpg";
import outreach from "@/assets/community-outreach.jpg";
import cyberLab from "@/assets/gallery-cyber-lab.jpg.asset.json";
import studentCoding from "@/assets/gallery-student-coding.jpg.asset.json";
import rad5AbiaStartup from "@/assets/gallery-rad5-abia-startup.jpg.asset.json";
import rad5Team from "@/assets/gallery-rad5-team.jpg.asset.json";
import { Pioneers } from "@/components/site/Pioneers";
import rad5FullLogo from "@/assets/rad5-full-logo.jpeg.asset.json";



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fishermen Movement — Protecting Young Minds in the Digital Age" },
      { name: "description", content: "Cyber Safety, Anti-Phishing and Digital Responsibility Awareness Campaign for Nigerian secondary school students in Aba and Abia State." },
      { property: "og:title", content: "Fishermen Movement — Cyber Safety Campaign" },
      { property: "og:description", content: "Empowering Nigerian students with digital safety education." },
    ],
  }),
  component: Home,
});

type Stats = {
  schools_reached: number;
  students_trained: number;
  volunteers: number;
  sponsors: number;
  funds_raised: number;
};

function Home() {
  const [stats, setStats] = useState<Stats>({
    schools_reached: 0,
    students_trained: 0,
    volunteers: 0,
    sponsors: 0,
    funds_raised: 0,
  });

  const heroSlides = [
    { src: hero, alt: "Nigerian students learning cybersecurity in an Aba classroom" },
    { src: training, alt: "Cybersecurity training session in progress" },
    { src: outreach, alt: "Community outreach with students" },
    { src: cyberLab.url, alt: "Cybersecurity lab environment" },
    { src: studentCoding.url, alt: "Student practicing hands-on coding" },
    { src: rad5AbiaStartup.url, alt: "RAD5 team at Abia Startup Round Table" },
    { src: rad5Team.url, alt: "RAD5 delegation" },
  ];
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    supabase.rpc("get_public_stats").then(({ data }) => {
      if (data) setStats(data as Stats);
    });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(id);
  }, [heroSlides.length]);


  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative isolate min-h-[88vh] overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {heroSlides.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${i === slideIndex ? "opacity-100" : "opacity-0"}`}
              width={1920}
              height={1080}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}
          <div className="absolute inset-0 gradient-hero opacity-60" />
          <div className="absolute inset-0 grid-pattern opacity-30" />
        </div>


        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span>Aba, Abia State • Nigeria</span>
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-7xl">
              Protecting Young Minds
              <span className="block text-gradient bg-gradient-to-r from-accent via-cyber to-primary-glow bg-clip-text">
                in the Digital Age
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
              Empowering secondary school students across Aba and Abia State with cyber safety,
              anti-phishing, and digital responsibility education.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-glow hover:scale-105">
                <Link to="/volunteer"><Users className="mr-2 h-5 w-5" />Become a Volunteer</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white">
                <Link to="/sponsor"><HeartHandshake className="mr-2 h-5 w-5" />Sponsorship & Partnership</Link>
              </Button>
            </div>
          </div>

          <ChevronDown className="absolute bottom-8 left-1/2 h-6 w-6 -translate-x-1/2 animate-bounce text-white/70" />
        </div>
      </section>

      {/* STATS */}
      <section className="relative -mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="glass grid grid-cols-2 gap-px rounded-3xl bg-border/50 shadow-elegant md:grid-cols-5 overflow-hidden">
            {[
              { label: "Schools Reached", value: stats.schools_reached, icon: GraduationCap },
              { label: "Students Trained", value: stats.students_trained, icon: Users },
              { label: "Volunteers", value: stats.volunteers, icon: Shield },
              { label: "Sponsors", value: stats.sponsors, icon: HeartHandshake },
              { label: "Funds Raised", value: stats.funds_raised, icon: Sparkles, prefix: "₦" },
            ].map((s) => (
              <div key={s.label} className="bg-card p-6 text-center">
                <s.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                <div className="font-display text-2xl font-bold sm:text-3xl">
                  <AnimatedCounter value={s.value || 0} prefix={s.prefix} />
                  {s.value > 0 ? "" : "+"}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <FundingProgress />
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="animate-fade-up">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Our Mission</div>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              A generation that knows how to <span className="text-gradient">stay safe online.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Cybercrime, phishing, and online exploitation are growing threats to young Nigerians.
              The Fishermen Movement equips secondary school students with the skills, awareness,
              and ethical foundation to navigate the internet safely and responsibly.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { Icon: Lock, title: "Online Safety", desc: "Privacy, passwords, digital footprint." },
                { Icon: ShieldAlert, title: "Cybercrime Prevention", desc: "Scams, social engineering, ethics." },
                { Icon: Mail, title: "Anti-Phishing", desc: "Email, SMS, fake site detection." },
                { Icon: GraduationCap, title: "Student-First", desc: "Built for Nigerian secondary school students." },
              ].map((f) => (
                <div key={f.title} className="hover-lift rounded-2xl border border-border bg-card p-5 shadow-card">
                  <f.Icon className="mb-3 h-6 w-6 text-primary" />
                  <div className="font-semibold">{f.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{f.desc}</div>
                </div>
              ))}
            </div>
            <Button asChild className="mt-8 gradient-primary text-primary-foreground" size="lg">
              <Link to="/about">Read the full project <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="relative grid grid-cols-2 gap-4">
            <img src={hero} alt="Students in ICT lab" className="aspect-[4/5] rounded-3xl object-cover shadow-elegant hover-lift" loading="lazy" width={1280} height={896} />
            <div className="space-y-4 pt-12">
              <img src={training} alt="Training session" className="aspect-square rounded-3xl object-cover shadow-card hover-lift" loading="lazy" width={1280} height={896} />
              <img src={outreach} alt="Community outreach" className="aspect-square rounded-3xl object-cover shadow-card hover-lift" loading="lazy" width={1280} height={896} />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-gradient-cyber p-5 text-white shadow-glow md:block">
              <div className="text-3xl font-bold">3,900</div>
              <div className="text-xs uppercase tracking-wider opacity-90">Students / year</div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Curriculum Pillars</div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">What we teach</h2>
            <p className="mt-4 text-muted-foreground">Three focused modules delivered through interactive workshops in classrooms across Abia State.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { Icon: Lock, title: "Online Safety & Digital Footprint", desc: "Personal information protection, password security, privacy settings, social media safety, responsible behaviour, digital reputation." },
              { Icon: ShieldAlert, title: "Cybercrime Risks & Prevention", desc: "Common cybercrimes, online scams, ethical technology use, consequences of cybercrime in Nigeria and beyond." },
              { Icon: Mail, title: "Phishing Awareness & Prevention", desc: "Email & SMS phishing, social engineering, fake websites, suspicious links, reporting cyber incidents." },
            ].map((p) => (
              <div key={p.title} className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-card transition-all hover:-translate-y-2 hover:shadow-elegant">
                <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gradient-cyber opacity-10 transition-opacity group-hover:opacity-20" />
                <div className="relative">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary text-primary-foreground shadow-glow">
                    <p.Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  <Link to="/curriculum" className="mt-5 inline-flex items-center text-sm font-medium text-primary hover:gap-2">
                    Explore module <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Pioneers />

      {/* RAD5 UMBRELLA */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              Our Umbrella
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              Fishermen Movement is an initiative under RAD5
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              We operate as a community-impact arm of RAD5 Tech Hub — bringing world-class cybersecurity,
              software engineering, and innovation expertise directly to Nigerian secondary schools.
            </p>
          </div>

          <a
            href="https://rad5.com.ng/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-3xl border border-border bg-[#0b0b12] shadow-elegant transition-all hover:-translate-y-1 hover:shadow-glow"
            aria-label="Visit RAD5 Tech Hub at rad5.com.ng"
          >
            <img
              src={rad5FullLogo.url}
              alt="RAD5 Tech Hub — Innovation at the Speed of Light"
              className="mx-auto w-full max-w-4xl object-contain transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="flex items-center justify-center gap-2 bg-black/60 py-4 text-sm font-semibold uppercase tracking-widest text-white backdrop-blur">
              Visit rad5.com.ng
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </a>
        </div>
      </section>


      {/* CTA */}
      <section className="relative my-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] gradient-hero p-12 shadow-elegant sm:p-16 lg:p-20">
            <div className="absolute inset-0 grid-pattern opacity-40" />
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-primary-glow/30 blur-3xl" />
            <div className="relative mx-auto max-w-3xl text-center text-white">
              <MapPin className="mx-auto mb-4 h-6 w-6 text-accent" />
              <h2 className="font-display text-3xl font-bold sm:text-5xl">Join the movement.</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
                Whether you teach, code, sponsor, or simply care — there's a place for you in protecting Nigeria's next generation.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Link to="/volunteer">Volunteer today</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                  <Link to="/sponsor">Sponsor / Partner</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

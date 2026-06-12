import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { SITE, NAV_LINKS } from "@/lib/site";
import logoAsset from "@/assets/fishermen-logo.png.asset.json";
const logo = logoAsset.url;

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-foreground text-background">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo} alt="" className="h-10 w-10 object-contain" width={40} height={40} />
              <div>
                <div className="font-display text-lg font-bold">{SITE.name}</div>
                <div className="text-xs uppercase tracking-widest text-background/60">{SITE.tagline}</div>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-background/70">
              Empowering Nigerian secondary school students across Aba and Abia State with cyber safety,
              anti-phishing, and digital responsibility education.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Twitter, href: SITE.social.twitter },
                { Icon: Facebook, href: SITE.social.facebook },
                { Icon: Instagram, href: SITE.social.instagram },
                { Icon: Linkedin, href: SITE.social.linkedin },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} className="rounded-full bg-background/10 p-2.5 transition-colors hover:bg-primary">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-sm text-background/70">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-background">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Get involved</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/volunteer" className="hover:text-background">Volunteer</Link></li>
              <li><Link to="/sponsor" className="hover:text-background">Sponsor</Link></li>
              <li><Link to="/partner" className="hover:text-background">Partner</Link></li>
              <li><Link to="/donate" className="hover:text-background">Donate</Link></li>
            </ul>
            <div className="mt-6 space-y-2 text-xs text-background/70">
              <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{SITE.address}</div>
              <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" />{SITE.email}</div>
              <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{SITE.phone}</div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-background/10 pt-6 text-xs text-background/60 sm:flex-row">
          <div>© {new Date().getFullYear()} Fishermen Movement. All rights reserved.</div>
          <div>Made with purpose in {SITE.location}</div>
        </div>
      </div>
    </footer>
  );
}

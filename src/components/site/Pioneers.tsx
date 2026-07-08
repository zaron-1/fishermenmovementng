import jahawill from "@/assets/pioneer-jahawill.png.asset.json";
import ernest from "@/assets/pioneer-ernest.png.asset.json";
import parsley from "@/assets/pioneer-parsley.png.asset.json";
import kinsley from "@/assets/pioneer-kinsley.png.asset.json";
import amarachi from "@/assets/pioneer-amarachi.png.asset.json";
import edward from "@/assets/pioneer-edward.png.asset.json";
import solex from "@/assets/pioneer-solex.png.asset.json";

const PIONEERS: { name: string; bio: string; image: string; linkedin?: string }[] = [
  {
    name: "Solex Innocent",
    bio: "Cyber-security pentesting student at RAD5 Tech Hub.",
    image: solex.url,
    linkedin: "https://www.linkedin.com/in/solex-innocent-0526953b9?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    name: "Jah'swill David",
    bio: "Cyber-security pentesting student, RAD5 Tech Hub | Web Developer.",
    image: jahawill.url,
    linkedin: "https://www.linkedin.com/in/ikoh-jahswill?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    name: "Ernest Chidi",
    bio: "Cyber-security pentesting student, RAD5 Tech Hub | Web Developer.",
    image: ernest.url,
    linkedin: "https://www.linkedin.com/in/chidi-ernest-4bb323310?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    name: "Parsley Osimakwe",
    bio: "Cyber Security Intern at RAD5 Tech Hub | Mobile App Developer.",
    image: parsley.url,
    linkedin: "https://www.linkedin.com/in/parsley-osimakwe-60a141345?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },

  {
    name: "Kinsley Prince",
    bio: "Cyber Security Intern at RAD5 Tech Hub.",
    image: kinsley.url,
    linkedin: "https://www.linkedin.com/in/princekingsley?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    name: "Amarachi Wisdom",
    bio: "Cyber Security student at RAD5 Tech Hub.",
    image: amarachi.url,
    linkedin: "https://www.linkedin.com/in/wisdom-amarachi-6457063a7?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    name: "Edward Chidubem",
    bio: "Cyber-security student at RAD5 Tech Hub.",
    image: edward.url,
    linkedin: "https://www.linkedin.com/in/edward-jose-maria-3b47293a9?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
];

export function Pioneers() {
  return (
    <section className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            Fishermen Movement Pioneers
          </div>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Meet the founding voices
          </h2>
          <p className="mt-4 text-muted-foreground">
            The students and builders driving cyber safety awareness across Aba and beyond.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PIONEERS.map((p) => {
            const Wrapper: any = p.linkedin ? "a" : "div";
            const wrapperProps = p.linkedin
              ? { href: p.linkedin, target: "_blank", rel: "noopener noreferrer", "aria-label": `${p.name} on LinkedIn` }
              : {};
            return (
              <Wrapper
                key={p.name}
                {...wrapperProps}
                className="group block rounded-3xl border border-border bg-card p-6 text-center shadow-card transition-all hover:-translate-y-2 hover:shadow-elegant"
              >
                <div className="mx-auto mb-5 h-40 w-40 overflow-hidden rounded-full ring-4 ring-primary/20 transition-all group-hover:ring-primary/40">
                  <img
                    src={p.image}
                    alt={`${p.name} — Fishermen Movement pioneer`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    width={320}
                    height={320}
                  />
                </div>
                <h3 className="font-display text-xl font-bold">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.bio}</p>
                {p.linkedin && (
                  <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
                    View LinkedIn →
                  </span>
                )}
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

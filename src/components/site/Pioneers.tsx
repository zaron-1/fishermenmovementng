import jahawill from "@/assets/pioneer-jahawill.png.asset.json";
import ernest from "@/assets/pioneer-ernest.png.asset.json";
import parsley from "@/assets/pioneer-parsley.png.asset.json";
import kinsley from "@/assets/pioneer-kinsley.png.asset.json";
import amarachi from "@/assets/pioneer-amarachi.png.asset.json";
import edward from "@/assets/pioneer-edward.png.asset.json";
import solex from "@/assets/pioneer-solex.png.asset.json";

const PIONEERS = [
  {
    name: "Jah'swill David",
    bio: "Cyber-security pentesting student, RAD5 Tech Hub | Web Developer.",
    image: jahawill.url,
  },
  {
    name: "Ernest Chidi",
    bio: "Cyber-security pentesting student, RAD5 Tech Hub | Web Developer.",
    image: ernest.url,
  },
  {
    name: "Parsley Osimakwe",
    bio: "Cyber Security Intern at RAD5 Tech Hub | Mobile App Developer.",
    image: parsley.url,
  },
  {
    name: "Kinsley Prince",
    bio: "Cyber Security Intern at RAD5 Tech Hub.",
    image: kinsley.url,
  },
  {
    name: "Amarachi Wisdom",
    bio: "Cyber Security student at RAD5 Tech Hub.",
    image: amarachi.url,
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
          {PIONEERS.map((p) => (
            <div
              key={p.name}
              className="group rounded-3xl border border-border bg-card p-6 text-center shadow-card transition-all hover:-translate-y-2 hover:shadow-elegant"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

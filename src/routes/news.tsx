import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Newspaper, Calendar } from "lucide-react";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Updates — Fishermen Movement" },
      { name: "description", content: "Project updates, announcements, success stories, press releases and events from the Fishermen Movement." },
    ],
  }),
  component: News,
});

type Article = { id: string; slug: string; title: string; excerpt: string | null; cover_image_url: string | null; published_at: string | null };

function News() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("news_articles")
      .select("id,slug,title,excerpt,cover_image_url,published_at")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        setArticles((data || []) as Article[]);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <section className="relative isolate overflow-hidden gradient-hero py-20 text-white">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl">News & Updates</h1>
          <p className="mt-4 text-lg text-white/85">Stories from schools, milestones, and announcements.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1,2,3].map((i) => (
              <div key={i} className="h-80 animate-pulse rounded-3xl bg-secondary" />
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-24 text-muted-foreground">
            <Newspaper className="h-12 w-12" />
            <p>No articles published yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <article key={a.id} className="hover-lift overflow-hidden rounded-3xl border border-border bg-card shadow-card">
                {a.cover_image_url && <img src={a.cover_image_url} alt="" className="aspect-[16/10] w-full object-cover" loading="lazy" />}
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {a.published_at ? new Date(a.published_at).toLocaleDateString() : ""}
                  </div>
                  <h2 className="mt-3 font-display text-xl font-bold leading-snug">{a.title}</h2>
                  {a.excerpt && <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{a.excerpt}</p>}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

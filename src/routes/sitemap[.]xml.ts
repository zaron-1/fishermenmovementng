import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", priority: "1.0", changefreq: "weekly" },
          { path: "/about", priority: "0.9", changefreq: "monthly" },
          { path: "/curriculum", priority: "0.9", changefreq: "monthly" },
          { path: "/impact", priority: "0.8", changefreq: "monthly" },
          { path: "/gallery", priority: "0.7", changefreq: "weekly" },
          { path: "/news", priority: "0.8", changefreq: "weekly" },
          { path: "/contact", priority: "0.7", changefreq: "yearly" },
          { path: "/volunteer", priority: "0.9", changefreq: "monthly" },
          { path: "/sponsor", priority: "0.9", changefreq: "monthly" },
          { path: "/partner", priority: "0.8", changefreq: "monthly" },
          { path: "/donate", priority: "0.9", changefreq: "monthly" },
        ];
        const urls = entries.map(e => `  <url><loc>${BASE_URL}${e.path}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});

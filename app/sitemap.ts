import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lore.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/docs", "/privacy", "/terms", "/security", "/accessibility"];
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));
}

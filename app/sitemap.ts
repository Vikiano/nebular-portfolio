import type { MetadataRoute } from "next";
import { galleries, series } from "@/lib/photos";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio.nebular.art";
  const now = new Date();
  const staticRoutes = [
    "",
    "/galleries",
    "/about-nebular",
    "/licensing",
    "/pricing",
    "/coach-mode",
    "/contact-waitlist",
    "/legal/privacy",
    "/legal/terms",
    "/legal/licensing-terms",
    "/legal/accessibility",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const galleryRoutes = galleries.map((g) => ({
    url: `${base}/galleries/${g.slug}`,
    lastModified: new Date(g.published_at),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const seriesRoutes = series.map((s) => ({
    url: `${base}/series/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...galleryRoutes, ...seriesRoutes];
}

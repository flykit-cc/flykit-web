import type { MetadataRoute } from "next";
import { getMarketplace } from "@/lib/plugins";

const BASE_URL = "https://flykit.cc";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/docs`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/changelog`, lastModified, changeFrequency: "daily", priority: 0.6 },
    { url: `${BASE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  const marketplace = await getMarketplace();
  const pluginRoutes: MetadataRoute.Sitemap = marketplace.plugins.map((p) => ({
    url: `${BASE_URL}/plugins/${p.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...pluginRoutes];
}

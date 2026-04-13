import fallback from "./plugins-fallback.json";

export type Plugin = {
  slug: string;
  name: string;
  displayName: string;
  author: string;
  authorUrl: string;
  categories: string[];
  tagline: string;
  description: string;
  features: string[];
  useCases: string[];
  skills: { name: string; description: string }[];
  sources: { label: string; url: string }[];
  repo: string;
  license: string;
  stars: number;
};

export type Marketplace = {
  name: string;
  owner: { name: string; url: string };
  plugins: Plugin[];
};

const MARKETPLACE_URL =
  "https://raw.githubusercontent.com/flykit-cc/flykit/main/.claude-plugin/marketplace.json";

export async function getMarketplace(): Promise<Marketplace> {
  try {
    const res = await fetch(MARKETPLACE_URL, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`GitHub fetch failed: ${res.status}`);
    const remote = (await res.json()) as Partial<Marketplace>;
    // Merge minimally — if remote is missing fields we expect for rendering,
    // fall back to local data so the site still builds.
    if (!remote.plugins || remote.plugins.length === 0) {
      return fallback as Marketplace;
    }
    return remote as Marketplace;
  } catch {
    return fallback as Marketplace;
  }
}

export async function getPlugin(slug: string): Promise<Plugin | undefined> {
  const m = await getMarketplace();
  return m.plugins.find((p) => p.slug === slug);
}

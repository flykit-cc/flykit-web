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

type RawMarketplacePlugin = {
  name: string;
  description?: string;
  source?: string;
  version?: string;
  category?: string;
  keywords?: string[];
  license?: string;
};

type RawMarketplace = {
  name: string;
  description?: string;
  owner: { name: string; url?: string };
  plugins: RawMarketplacePlugin[];
};

type WebJson = Pick<
  Plugin,
  | "displayName"
  | "author"
  | "authorUrl"
  | "categories"
  | "tagline"
  | "description"
  | "features"
  | "useCases"
  | "skills"
  | "sources"
>;

const REPO = "flykit-cc/flykit";
const BASE_RAW = `https://raw.githubusercontent.com/${REPO}/main`;
const MARKETPLACE_URL = `${BASE_RAW}/.claude-plugin/marketplace.json`;
const GITHUB_API = `https://api.github.com/repos/${REPO}`;

async function fetchStars(): Promise<number> {
  try {
    const res = await fetch(GITHUB_API, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return 0;
    const data = (await res.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === "number" ? data.stargazers_count : 0;
  } catch {
    return 0;
  }
}

async function fetchWebJson(pluginName: string): Promise<WebJson | null> {
  try {
    const res = await fetch(`${BASE_RAW}/plugins/${pluginName}/web.json`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as WebJson;
  } catch {
    return null;
  }
}

function fallbackPluginByName(name: string): Plugin | undefined {
  return (fallback as Marketplace).plugins.find((p) => p.name === name);
}

export async function getMarketplace(): Promise<Marketplace> {
  try {
    const res = await fetch(MARKETPLACE_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`marketplace.json fetch failed: ${res.status}`);
    const remote = (await res.json()) as RawMarketplace;
    if (!remote?.plugins?.length) return fallback as Marketplace;

    const stars = await fetchStars();

    const plugins = await Promise.all(
      remote.plugins.map(async (mp) => {
        const web = await fetchWebJson(mp.name);
        if (!web) return fallbackPluginByName(mp.name);

        const plugin: Plugin = {
          slug: mp.name,
          name: mp.name,
          displayName: web.displayName,
          author: web.author,
          authorUrl: web.authorUrl,
          categories: web.categories,
          tagline: web.tagline,
          description: web.description,
          features: web.features,
          useCases: web.useCases,
          skills: web.skills,
          sources: web.sources,
          repo: `https://github.com/${REPO}`,
          license: mp.license ?? "MIT",
          stars,
        };
        return plugin;
      })
    );

    const resolved = plugins.filter((p): p is Plugin => Boolean(p));
    if (resolved.length === 0) return fallback as Marketplace;

    return {
      name: remote.name,
      owner: {
        name: remote.owner.name,
        url: remote.owner.url ?? `https://github.com/${remote.owner.name}`,
      },
      plugins: resolved,
    };
  } catch {
    return fallback as Marketplace;
  }
}

export async function getPlugin(slug: string): Promise<Plugin | undefined> {
  const m = await getMarketplace();
  return m.plugins.find((p) => p.slug === slug);
}

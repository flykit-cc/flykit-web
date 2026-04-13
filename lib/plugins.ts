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
  readme: string | null;
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

type FallbackPlugin = Omit<Plugin, "readme"> & { readme?: string | null };
type FallbackMarketplace = Omit<Marketplace, "plugins"> & {
  plugins: FallbackPlugin[];
};

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

async function fetchReadme(pluginName: string): Promise<string | null> {
  try {
    const res = await fetch(`${BASE_RAW}/plugins/${pluginName}/README.md`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function normalizeFallbackPlugin(p: FallbackPlugin): Plugin {
  return { ...p, readme: p.readme ?? null };
}

function normalizeFallback(): Marketplace {
  const raw = fallback as FallbackMarketplace;
  return {
    name: raw.name,
    owner: raw.owner,
    plugins: raw.plugins.map(normalizeFallbackPlugin),
  };
}

function fallbackPluginByName(name: string): Plugin | undefined {
  const match = (fallback as FallbackMarketplace).plugins.find(
    (p) => p.name === name
  );
  return match ? normalizeFallbackPlugin(match) : undefined;
}

export async function getMarketplace(): Promise<Marketplace> {
  try {
    const res = await fetch(MARKETPLACE_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`marketplace.json fetch failed: ${res.status}`);
    const remote = (await res.json()) as RawMarketplace;
    if (!remote?.plugins?.length) return normalizeFallback();

    const stars = await fetchStars();

    const plugins = await Promise.all(
      remote.plugins.map(async (mp) => {
        const [web, readme] = await Promise.all([
          fetchWebJson(mp.name),
          fetchReadme(mp.name),
        ]);
        if (!web) {
          const fb = fallbackPluginByName(mp.name);
          return fb ? { ...fb, readme: readme ?? fb.readme } : undefined;
        }

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
          readme,
        };
        return plugin;
      })
    );

    const resolved = plugins.filter((p): p is Plugin => Boolean(p));
    if (resolved.length === 0) return normalizeFallback();

    return {
      name: remote.name,
      owner: {
        name: remote.owner.name,
        url: remote.owner.url ?? `https://github.com/${remote.owner.name}`,
      },
      plugins: resolved,
    };
  } catch {
    return normalizeFallback();
  }
}

export async function getPlugin(slug: string): Promise<Plugin | undefined> {
  const m = await getMarketplace();
  return m.plugins.find((p) => p.slug === slug);
}

export type ChangelogEntry = {
  sha: string;
  date: string;
  message: string;
  author: { login: string; avatarUrl: string };
  url: string;
};

type RawCommit = {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author?: { name?: string; date?: string };
    committer?: { date?: string };
  };
  author: { login?: string; avatar_url?: string } | null;
};

export async function fetchChangelog(): Promise<ChangelogEntry[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/commits?path=plugins&per_page=30`,
      {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github+json" },
      }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as RawCommit[];
    return data.map((c) => {
      const firstLine = (c.commit?.message ?? "").split("\n")[0];
      const date =
        c.commit?.author?.date ?? c.commit?.committer?.date ?? "";
      return {
        sha: c.sha,
        date,
        message: firstLine,
        author: {
          login: c.author?.login ?? c.commit?.author?.name ?? "unknown",
          avatarUrl: c.author?.avatar_url ?? "",
        },
        url: c.html_url,
      };
    });
  } catch {
    return [];
  }
}

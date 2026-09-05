import announcement from "@/content/announcement.json";
import { getTools } from "./tools";
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
  /** Declared in the manifest; the number `/plugin update` compares against. */
  version?: string;
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
  source?: string | { source?: string; repo?: string };
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

/**
 * The manifest is a menu: each entry names the repo its plugin actually lives
 * in, so display copy, readme and stars are read from that repo rather than
 * from here.
 */
const MARKETPLACE_REPO = "flykit-cc/plugins";
const MARKETPLACE_URL = `https://raw.githubusercontent.com/${MARKETPLACE_REPO}/main/.claude-plugin/marketplace.json`;
const raw = (repo: string, path: string) =>
  `https://raw.githubusercontent.com/${repo}/main/${path}`;

export type Announcement = {
  text: string;
  href: string;
  label: string;
  id: string;
};

/** Site copy, so it lives in `content/` rather than behind a cross-repo fetch. */
export function fetchAnnouncement(): Announcement | null {
  const data = announcement as Partial<Announcement>;
  if (!data.text || !data.href || !data.label || !data.id) return null;
  return { text: data.text, href: data.href, label: data.label, id: data.id };
}

export async function fetchStars(repo: string): Promise<number> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
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

/** A manifest entry names its repo; a legacy relative source falls back to the manifest repo. */
function pluginRepo(mp: RawMarketplacePlugin): string {
  const src = mp.source;
  if (src !== undefined && typeof src === "object" && typeof src.repo === "string") return src.repo;
  return MARKETPLACE_REPO;
}

async function fetchWebJson(repo: string): Promise<WebJson | null> {
  try {
    const res = await fetch(raw(repo, "web.json"), {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as WebJson;
  } catch {
    return null;
  }
}

async function fetchReadme(repo: string): Promise<string | null> {
  try {
    const res = await fetch(raw(repo, "README.md"), {
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

    const plugins = await Promise.all(
      remote.plugins.map(async (mp) => {
        const repo = pluginRepo(mp);
        const [web, readme, stars] = await Promise.all([
          fetchWebJson(repo),
          fetchReadme(repo),
          fetchStars(repo),
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
          repo: `https://github.com/${repo}`,
          license: mp.license ?? "MIT",
          version: mp.version,
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
  /** Which repo the commit landed in; the feed spans all of them. */
  repo: string;
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

async function fetchCommits(repo: string): Promise<ChangelogEntry[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/commits?per_page=15`,
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
        repo: repo.split("/")[1] ?? repo,
      };
    });
  } catch {
    return [];
  }
}

/**
 * One feed across every flykit repo. Each product ships from its own repo now,
 * so a single-repo commit list would show almost nothing.
 */
export async function fetchChangelog(): Promise<ChangelogEntry[]> {
  const marketplace = await getMarketplace();
  const repos = [
    ...marketplace.plugins.map((p) => p.repo.replace("https://github.com/", "")),
    ...getTools().map((t) => t.repo.replace("https://github.com/", "")),
  ];
  const lists = await Promise.all([...new Set(repos)].map(fetchCommits));
  return lists
    .flat()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 30);
}

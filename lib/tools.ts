import fallback from "./tools-fallback.json";

const REPO = "flykit-cc/flykit";
const BASE_RAW = `https://raw.githubusercontent.com/${REPO}/main`;

export type Ecosystem = "claude-code" | "dsh";

export const ECOSYSTEM_LABELS: Record<Ecosystem, string> = {
  "claude-code": "Claude Code",
  dsh: "DeepSeek Harness",
};

export function ecosystemLabel(e: Ecosystem | undefined): string {
  return ECOSYSTEM_LABELS[e ?? "claude-code"] ?? "Claude Code";
}

export type Tool = {
  name: string;
  ecosystem?: Ecosystem;
  slug: string;
  description: string;
  repo: string;
  npm: string;
  install: string;
  category: string;
  keywords: string[];
  license: string;
  version: string;
  web: string;
};

export type ToolWeb = {
  displayName: string;
  author: string;
  authorUrl: string;
  categories: string[];
  tagline: string;
  description: string;
  install: string;
  externalRepo: string;
  features: string[];
  useCases: string[];
  screenshots: { label: string; file: string }[];
};

export type FullTool = Tool & { web: ToolWeb };

type FallbackData = {
  tools: Tool[];
  webByTool: Record<string, ToolWeb>;
};

async function fetchJSON<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getTools(): Promise<FullTool[]> {
  const fb = fallback as FallbackData;
  const manifest = await fetchJSON<{ tools: Tool[] }>(`${BASE_RAW}/tools.json`);
  const tools = manifest?.tools ?? fb.tools;

  const full = await Promise.all(
    tools.map(async (t) => {
      const webPath = t.web.replace(/^\.\//, "");
      const web = await fetchJSON<ToolWeb>(`${BASE_RAW}/${webPath}`);
      const resolved = web ?? fb.webByTool[t.slug];
      // web.json omits optional list fields; default them so consumers can just read .length
      return {
        ...t,
        web: resolved && {
          ...resolved,
          features: resolved.features ?? [],
          useCases: resolved.useCases ?? [],
          screenshots: resolved.screenshots ?? [],
        },
      };
    })
  );

  return full.filter((t): t is FullTool => Boolean(t.web));
}

export async function getTool(slug: string): Promise<FullTool | null> {
  const all = await getTools();
  return all.find((t) => t.slug === slug) ?? null;
}

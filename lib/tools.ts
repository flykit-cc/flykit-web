import manifest from "@/content/tools.json";
import dshClaudeLive from "@/content/tools/dsh-claude-live.json";
import dshFlykit from "@/content/tools/dsh-flykit.json";
import ghostcode from "@/content/tools/ghostcode.json";
import uisper from "@/content/tools/uisper.json";

export type Ecosystem = "claude-code" | "dsh" | "macos";

export const ECOSYSTEM_LABEL: Record<Ecosystem, string> = {
  "claude-code": "Claude Code",
  dsh: "DeepSeek Harness",
  macos: "macOS app",
};

/** An install that is a URL is a download, not a command to paste. */
export const isDownload = (install: string) => /^https?:\/\//.test(install);

export type Tool = {
  name: string;
  slug: string;
  description: string;
  repo: string;
  /** Absent for tools that install from GitHub rather than npm. */
  npm?: string;
  ecosystem?: Ecosystem;
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
  installNote?: string;
  externalRepo: string;
  features: string[];
  useCases: string[];
  screenshots?: { label: string; file: string }[];
};

export type FullTool = Tool & { web: ToolWeb };

/**
 * The catalog is local content, not a cross-repo fetch: this site is its only
 * reader, so the data lives beside the pages that render it and ships in the
 * build. Screenshots are served from `public/screenshots/<slug>/`.
 */
const WEB_BY_SLUG: Record<string, ToolWeb> = {
  "dsh-claude-live": dshClaudeLive as ToolWeb,
  "dsh-flykit": dshFlykit as ToolWeb,
  ghostcode: ghostcode as ToolWeb,
  uisper: uisper as ToolWeb,
};

export function getTools(): FullTool[] {
  return (manifest.tools as Tool[])
    .map((t) => ({ ...t, web: WEB_BY_SLUG[t.slug] }))
    .filter((t): t is FullTool => Boolean(t.web));
}

export function getTool(slug: string): FullTool | null {
  return getTools().find((t) => t.slug === slug) ?? null;
}

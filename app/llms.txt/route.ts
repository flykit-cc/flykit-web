import { getMarketplace } from "@/lib/plugins";
import { ECOSYSTEM_LABEL, getTools } from "@/lib/tools";

export const revalidate = 3600;

const BASE_URL = "https://flykit.cc";

export async function GET() {
  const m = await getMarketplace();
  const tools = await getTools();

  const lines: string[] = [];
  lines.push("# flykit");
  lines.push("");
  lines.push(
    "> Open-source tools and plugins for AI coding agents — Claude Code and DeepSeek Harness. Install, run, contribute.",
  );
  lines.push("");
  lines.push(
    "flykit is a community registry of tools and plugins for AI coding agents. Today that spans",
  );
  lines.push(
    "Claude Code (Anthropic's official CLI) and DeepSeek Harness (dsh). A Claude Code plugin adds",
  );
  lines.push(
    "skills, slash commands, subagents, or hooks; a dsh plugin extends the harness itself. Everything",
  );
  lines.push(
    "is MIT-licensed and lives at",
  );
  lines.push("https://github.com/flykit-cc/flykit.");
  lines.push("");
  lines.push("## Getting started");
  lines.push("");
  lines.push(`- [Install guide](${BASE_URL}/docs): step-by-step setup for both the Claude Code marketplace and DeepSeek Harness.`);
  lines.push("");
  lines.push("## Claude Code plugins");
  lines.push("");
  for (const p of m.plugins) {
    lines.push(`- [${p.displayName}](${BASE_URL}/plugins/${p.slug}): ${p.tagline}`);
  }
  lines.push("");
  lines.push("## Tools");
  lines.push("");
  for (const t of tools) {
    const eco = t.ecosystem ? ` (${ECOSYSTEM_LABEL[t.ecosystem]})` : "";
    lines.push(`- [${t.web.displayName}](${BASE_URL}/tools/${t.slug})${eco}: ${t.web.tagline}`);
  }
  lines.push("");
  lines.push("## Other");
  lines.push("");
  lines.push(`- [Changelog](${BASE_URL}/changelog): recent releases across the marketplace.`);
  lines.push(`- [Privacy](${BASE_URL}/privacy)`);
  lines.push(`- [Terms](${BASE_URL}/terms)`);
  lines.push(`- [Source](https://github.com/flykit-cc/flykit): the registry repo.`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600, must-revalidate",
    },
  });
}

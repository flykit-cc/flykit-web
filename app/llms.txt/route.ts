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
    "> An open-source cockpit for agentic development — Claude Code, Pi and Codex in one window, powered by DeepSeek Harness — plus the registry that fills it.",
  );
  lines.push("");
  lines.push(
    "flykit is two things. The cockpit (dsh-flykit) is a plugin for DeepSeek Harness that turns its",
  );
  lines.push(
    "web UI into a workspace for agentic development: Claude Code, Pi, Codex or a shell as real",
  );
  lines.push(
    "terminals beside a file explorer, a searchable model picker over every configured provider, and",
  );
  lines.push(
    "a status line. The registry carries the plugins and tools those agents use — Claude Code plugins",
  );
  lines.push(
    "add skills, slash commands, subagents and hooks; harness plugins extend the harness itself.",
  );
  lines.push(
    "Everything is MIT-licensed, runs on your own machine, and lives at",
  );
  lines.push("https://github.com/flykit-cc/flykit.");
  lines.push("");
  lines.push("## Getting started");
  lines.push("");
  lines.push(`- [Install guide](${BASE_URL}/docs): the cockpit on DeepSeek Harness first, then Claude Code plugins.`);
  lines.push("");
  lines.push("## The cockpit");
  lines.push("");
  lines.push(`- [dsh-flykit](${BASE_URL}/tools/dsh-flykit): the agent cockpit for DeepSeek Harness. \`dsh plugin --profile web add dsh-flykit\``);
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

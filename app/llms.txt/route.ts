import { getMarketplace } from "@/lib/plugins";

export const revalidate = 3600;

const BASE_URL = "https://flykit.cc";

export async function GET() {
  const m = await getMarketplace();

  const lines: string[] = [];
  lines.push("# flykit");
  lines.push("");
  lines.push(
    "> Open-source Claude Code plugins for real-world workflows. Install, run, contribute.",
  );
  lines.push("");
  lines.push(
    "flykit is a community marketplace of plugins for Claude Code, Anthropic's official CLI.",
  );
  lines.push(
    "Each plugin adds skills, slash commands, subagents, or hooks that solve a concrete workflow —",
  );
  lines.push(
    "from tax filing to multi-agent development. Plugins are MIT-licensed and live at",
  );
  lines.push("https://github.com/flykit-cc/flykit.");
  lines.push("");
  lines.push("## Getting started");
  lines.push("");
  lines.push(`- [Install guide](${BASE_URL}/docs): step-by-step setup, including how to add the marketplace and install a plugin.`);
  lines.push("");
  lines.push("## Plugins");
  lines.push("");
  for (const p of m.plugins) {
    lines.push(`- [${p.displayName}](${BASE_URL}/plugins/${p.slug}): ${p.tagline}`);
  }
  lines.push("");
  lines.push("## Other");
  lines.push("");
  lines.push(`- [Changelog](${BASE_URL}/changelog): recent releases across the marketplace.`);
  lines.push(`- [Privacy](${BASE_URL}/privacy)`);
  lines.push(`- [Terms](${BASE_URL}/terms)`);
  lines.push(`- [Source](https://github.com/flykit-cc/flykit): the marketplace repo.`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600, must-revalidate",
    },
  });
}

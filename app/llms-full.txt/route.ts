import { getMarketplace, getPlugin } from "@/lib/plugins";

export const revalidate = 3600;

const BASE_URL = "https://flykit.cc";

export async function GET() {
  const m = await getMarketplace();
  const plugins = await Promise.all(m.plugins.map((p) => getPlugin(p.slug)));

  const lines: string[] = [];
  lines.push("# flykit");
  lines.push("");
  lines.push(
    "> Open-source Claude Code plugins for real-world workflows. Install, run, contribute.",
  );
  lines.push("");
  lines.push(
    "This is the long-form LLM-friendly view of flykit. For a compact index, see /llms.txt.",
  );
  lines.push("");
  lines.push("## Install");
  lines.push("");
  lines.push("```");
  lines.push("claude /plugin marketplace add flykit-cc/flykit");
  lines.push("/plugin install <name>@flykit");
  lines.push("```");
  lines.push("");
  lines.push("Uninstall:");
  lines.push("");
  lines.push("```");
  lines.push("/plugin uninstall <name>@flykit");
  lines.push("/plugin marketplace remove flykit");
  lines.push("```");
  lines.push("");
  lines.push("## Plugins");
  lines.push("");

  for (const plugin of plugins) {
    if (!plugin) continue;
    lines.push(`### ${plugin.displayName}`);
    lines.push("");
    lines.push(`URL: ${BASE_URL}/plugins/${plugin.slug}`);
    lines.push(`Repository: ${plugin.repo}`);
    lines.push(`License: ${plugin.license}`);
    lines.push(`Author: ${plugin.author}`);
    if (plugin.categories?.length) {
      lines.push(`Categories: ${plugin.categories.join(", ")}`);
    }
    lines.push("");
    lines.push(`> ${plugin.tagline}`);
    lines.push("");
    lines.push(plugin.description);
    lines.push("");

    if (plugin.features?.length) {
      lines.push("**Features**");
      lines.push("");
      for (const f of plugin.features) lines.push(`- ${f}`);
      lines.push("");
    }

    if (plugin.useCases?.length) {
      lines.push("**Use cases**");
      lines.push("");
      for (const u of plugin.useCases) lines.push(`- ${u}`);
      lines.push("");
    }

    if (plugin.skills?.length) {
      lines.push("**Skills / commands**");
      lines.push("");
      for (const s of plugin.skills) lines.push(`- \`${s.name}\` — ${s.description}`);
      lines.push("");
    }

    if (plugin.sources?.length) {
      lines.push("**Sources**");
      lines.push("");
      for (const s of plugin.sources) lines.push(`- [${s.label}](${s.url})`);
      lines.push("");
    }

    if (plugin.readme) {
      lines.push("**README**");
      lines.push("");
      lines.push(plugin.readme.trim());
      lines.push("");
    }

    lines.push("---");
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600, must-revalidate",
    },
  });
}

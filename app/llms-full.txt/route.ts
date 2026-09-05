import { getMarketplace, getPlugin } from "@/lib/plugins";
import { ECOSYSTEM_LABEL, getTools, isDownload } from "@/lib/tools";

export const revalidate = 3600;

const BASE_URL = "https://flykit.cc";

export async function GET() {
  const m = await getMarketplace();
  const plugins = await Promise.all(m.plugins.map((p) => getPlugin(p.slug)));
  const tools = getTools();

  const lines: string[] = [];
  lines.push("# flykit");
  lines.push("");
  lines.push(
    "> Open-source tools and plugins for AI coding agents — Claude Code and DeepSeek Harness. Install, run, contribute.",
  );
  lines.push("");
  lines.push(
    "This is the long-form LLM-friendly view of flykit. For a compact index, see /llms.txt.",
  );
  lines.push("");
  lines.push("## Install (the cockpit)");
  lines.push("");
  lines.push("```");
  lines.push("npm install -g @deepseek-ai/dsh");
  lines.push("dsh plugin --profile web add dsh-flykit");
  lines.push("dsh web");
  lines.push("```");
  lines.push("");
  lines.push("## Install (Claude Code plugins)");
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
  lines.push("## Install (DeepSeek Harness plugins)");
  lines.push("");
  lines.push("No marketplace step — dsh installs plugins directly:");
  lines.push("");
  lines.push("```");
  lines.push("npm install -g @deepseek-ai/dsh");
  lines.push("dsh plugin --profile web add <name>");
  lines.push("dsh web");
  lines.push("```");
  lines.push("");
  lines.push("Uninstall:");
  lines.push("");
  lines.push("```");
  lines.push("dsh plugin --profile web remove <name>");
  lines.push("```");
  lines.push("");
  lines.push("## Claude Code plugins");
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

  lines.push("## Tools");
  lines.push("");

  for (const t of tools) {
    lines.push(`### ${t.web.displayName}`);
    lines.push("");
    lines.push(`URL: ${BASE_URL}/tools/${t.slug}`);
    if (t.ecosystem) lines.push(`Ecosystem: ${ECOSYSTEM_LABEL[t.ecosystem]}`);
    lines.push(`Repository: ${t.repo}`);
    lines.push(`License: ${t.license}`);
    lines.push(`Author: ${t.web.author}`);
    if (t.web.categories?.length) {
      lines.push(`Categories: ${t.web.categories.join(", ")}`);
    }
    lines.push(
      isDownload(t.web.install)
        ? `Download: ${t.web.install}`
        : `Install: \`${t.web.install}\``,
    );
    if (t.web.installNote) lines.push(`Install notes: ${t.web.installNote.replace(/\n/g, " ")}`);
    lines.push("");
    lines.push(`> ${t.web.tagline}`);
    lines.push("");
    lines.push(t.web.description);
    lines.push("");

    if (t.web.features?.length) {
      lines.push("**Features**");
      lines.push("");
      for (const f of t.web.features) lines.push(`- ${f}`);
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

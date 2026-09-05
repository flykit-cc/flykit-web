import Link from "next/link";
import { ArrowRight, Github, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { AgentRow } from "@/components/agent-row";
import { CodeBlock } from "@/components/code-block";
import { Shot } from "@/components/shot";
import { ToolCard } from "@/components/tool-card";
import { getMarketplace } from "@/lib/plugins";
import { getTools } from "@/lib/tools";

const H2 = { fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 500, letterSpacing: "-1px" } as const;

/** What the cockpit puts in the window, each with the shot that proves it. */
const CAPABILITIES = [
  {
    title: "Every agent in one window",
    body: "Claude Code, Pi, Codex or a plain shell as real PTY terminals in your workspace. A chime and a dot tell you which one finished. Claude subscription usage sits above its terminal.",
    shot: "/screenshots/dsh-flykit/agents.png",
    alt: "Agents tab: a live Claude Code terminal with subscription usage bars above it",
    w: 520,
    h: 900,
  },
  {
    title: "Your files, next to the conversation",
    body: "A file tree and a CodeMirror editor that saves to disk, with Markdown and SVG preview. A live watch dots what changed and reloads open files, keeping your unsaved edits.",
    shot: "/screenshots/dsh-flykit/explorer.png",
    alt: "Explorer tab with a TypeScript file open in the editor",
    w: 520,
    h: 900,
  },
  {
    title: "Agents and files at once",
    body: "Split the panel and a running agent sits above the file it is editing. Or maximise it and take the whole window.",
    shot: "/screenshots/dsh-flykit/split.png",
    alt: "Split mode: a live shell above, the Explorer and an open file below",
    w: 520,
    h: 900,
  },
];

const LANES = [
  {
    lane: "Get the cockpit",
    steps: [
      {
        title: "Install the harness",
        body: "The dsh CLI carries the agent, the web UI, and the plugin loader.",
        code: "npm install -g @deepseek-ai/dsh",
      },
      {
        title: "Add flykit",
        body: "A dsh plugin extends the harness itself — new panels, new tools, new routes.",
        code: "dsh plugin --profile web add dsh-flykit",
      },
      {
        title: "Open it",
        body: "Start the web UI. The panel is already loaded, no restart dance.",
        code: "dsh web",
      },
    ],
  },
  {
    lane: "Arm your agents",
    steps: [
      {
        title: "Add the marketplace",
        body: "Register flykit in Claude Code. One command, one time.",
        code: "claude /plugin marketplace add flykit-cc/plugins",
      },
      {
        title: "Install a plugin",
        body: "Pick one from the catalog and install it scoped to flykit.",
        code: "/plugin install flow@flykit",
      },
      {
        title: "Run it anywhere",
        body: "In your own terminal, or in a Claude Code tab inside the cockpit.",
        code: "/flow:continue",
      },
    ],
  },
];

export default async function HomePage() {
  const marketplace = await getMarketplace();
  const plugins = marketplace.plugins;
  // The cockpit is the thing the page is about, so it leads its grid.
  const tools = getTools().sort(
    (a, b) => Number(b.slug === "dsh-flykit") - Number(a.slug === "dsh-flykit"),
  );

  return (
    <>
      {/* Hero */}
      <section className="relative grid-paper border-b border-border">
        <div className="container mx-auto px-6 pb-16 pt-20 md:pb-24 md:pt-28">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-7 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 font-mono text-xs">
              <span
                aria-hidden
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--terminal-green)" }}
              />
              <span className="text-foreground">{plugins.length + tools.length} open-source tools</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">Powered by DeepSeek Harness</span>
            </div>

            <h1
              className="font-mono"
              style={{
                fontSize: "clamp(44px, 8vw, 84px)",
                fontWeight: 500,
                letterSpacing: "-2px",
                lineHeight: 1.05,
              }}
            >
              <span className="text-foreground">Fly your </span>
              <span className="text-muted-foreground">agents</span>
              <span
                aria-hidden
                className="ml-1 inline-block h-[0.72em] w-[0.5ch] translate-y-[0.02em] bg-foreground animate-blink"
              />
            </h1>

            <p className="max-w-2xl font-sans text-base text-muted-foreground md:text-lg">
              flykit is an open-source cockpit for agentic development. Run Claude Code,
              Pi and Codex side by side, with your files, your terminals and 400+ models
              in one window — then arm each agent with plugins from the same registry.
            </p>

            <div className="w-full max-w-xl space-y-1.5 text-left">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Start here
              </p>
              <CodeBlock code="dsh plugin --profile web add dsh-flykit" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild>
                <Link href="/tools/dsh-flykit">
                  See the cockpit <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="#catalog">Browse the catalog</Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-5xl">
            <Shot
              src="/screenshots/dsh-flykit/hero.png"
              alt="The flykit panel open beside a dsh web session: file tree, an open TypeScript file, and the status line under the composer"
              width={1440}
              height={900}
              priority
            />
          </div>
        </div>
      </section>

      {/* The agents */}
      <section className="border-b border-border">
        <div className="container mx-auto px-6 py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-16">
            <div className="space-y-5">
              <h2 className="font-mono" style={H2}>
                <span className="text-foreground">Every agent, </span>
                <span className="text-muted-foreground">one window</span>
              </h2>
              <p className="font-sans text-base text-muted-foreground">
                The cockpit runs coding agents as real terminals in your workspace, not
                as a chat about them. Start as many as you like, watch them in a grid or
                stage one and keep the rest as live thumbnails.
              </p>
              <p className="font-sans text-base text-muted-foreground">
                The harness agent can drive them too — open an agent, send it a task,
                wait for the answer, read it back, all as tool calls.
              </p>
              <AgentRow />
            </div>
            <Shot
              src="/screenshots/dsh-flykit/agents.png"
              alt="Agents tab: a live Claude Code terminal with Claude subscription usage bars above it"
              width={520}
              height={900}
              className="mx-auto max-w-[420px]"
            />
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-b border-border">
        <div className="container mx-auto px-6 py-20">
          <h2 className="mb-4 font-mono" style={H2}>
            <span className="text-foreground">A cockpit, </span>
            <span className="text-muted-foreground">not a side panel</span>
          </h2>
          <p className="mb-12 max-w-2xl font-sans text-base text-muted-foreground">
            Everything a coding session needs, in the window where the conversation
            already happens.
          </p>

          <div className="grid gap-10 md:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <div key={c.title} className="space-y-4">
                <Shot src={c.shot} alt={c.alt} width={c.w} height={c.h} crop={340} />
                <h3 className="font-mono text-lg font-medium tracking-tight">{c.title}</h3>
                <p className="font-sans text-sm text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-[1.15fr_1fr] md:items-center">
            <Shot
              src="/screenshots/dsh-flykit/model-picker.png"
              alt="Model picker over 435 models, grouped by provider, with provider pills and reasoning badges"
              width={1440}
              height={900}
            />
            <div className="space-y-4">
              <h3 className="font-mono text-lg font-medium tracking-tight">
                Every model you have, searchable
              </h3>
              <p className="font-sans text-sm text-muted-foreground">
                One search box over every provider you have configured, with favourites,
                recents, reasoning badges and an effort row. It shares state with the
                harness&apos;s own <code className="font-mono text-foreground">/model</code>,
                and refreshes the OpenRouter catalog live — 435 models at last count.
              </p>
              <Link
                href="/tools/dsh-flykit"
                className="inline-flex items-center gap-1 font-mono text-sm text-foreground hover:underline"
              >
                All of it, in detail <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="border-b border-border">
        <div className="container mx-auto px-6 py-20">
          <div className="mb-4 flex items-end justify-between gap-6">
            <h2 className="font-mono" style={H2}>
              <span className="text-foreground">The </span>
              <span className="text-muted-foreground">catalog</span>
            </h2>
            <Link
              href="https://github.com/flykit-cc/flykit-web/issues/new"
              className="hidden items-center gap-1 font-mono text-sm text-muted-foreground hover:text-foreground md:inline-flex"
            >
              Suggest one <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <p className="mb-12 max-w-2xl font-sans text-base text-muted-foreground">
            Plugins sharpen the agents; tools sharpen the workspace around them. Each
            card shows the ecosystem it runs in and how to get it.
          </p>

          <div id="tools" className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Tools &amp; harness plugins
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {tools.map((t) => (
                <ToolCard key={t.slug} tool={t} />
              ))}
            </div>
          </div>

          <div id="plugins" className="mt-14 space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Claude Code plugins — run them in a cockpit tab, or in your own terminal
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {plugins.map((p) => (
                <Link key={p.slug} href={`/plugins/${p.slug}`} className="block">
                  <Card className="h-full transition-colors hover:bg-muted/40">
                    <CardContent className="flex h-full flex-col gap-4 p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-muted font-mono text-base font-medium">
                            {p.displayName.slice(0, 1)}
                          </div>
                          <div>
                            <CardTitle>{p.displayName}</CardTitle>
                            <p className="font-mono text-xs text-muted-foreground">
                              by {p.author}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <CardDescription className="line-clamp-3">{p.tagline}</CardDescription>
                      <div className="mt-auto flex flex-wrap gap-2 pt-2">
                        <Badge>Claude Code</Badge>
                        {p.categories.slice(0, 2).map((c) => (
                          <Badge key={c} variant="outline">{c}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}

              <Card className="border-dashed">
                <CardContent className="flex h-full flex-col items-start justify-between gap-4 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-dashed border-border bg-background">
                      <Plus className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-muted-foreground">More coming</CardTitle>
                      <p className="font-mono text-xs text-muted-foreground">open call</p>
                    </div>
                  </div>
                  <CardDescription>
                    Got a workflow worth automating? Open an issue and we&apos;ll scope
                    it together.
                  </CardDescription>
                  <Link
                    href="https://github.com/flykit-cc/flykit-web/issues/new"
                    className="inline-flex items-center gap-1 font-mono text-sm text-foreground hover:underline"
                  >
                    Suggest a plugin <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-border">
        <div className="container mx-auto px-6 py-20">
          <h2 className="mb-4 font-mono" style={H2}>
            <span className="text-foreground">How it </span>
            <span className="text-muted-foreground">works</span>
          </h2>
          <p className="mb-12 max-w-2xl font-sans text-base text-muted-foreground">
            Two commands to fly, and the plugins you already use come with you.
          </p>

          <div className="grid gap-14 md:grid-cols-2 md:gap-10">
            {LANES.map((group) => (
              <div key={group.lane} className="space-y-8">
                <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <span aria-hidden style={{ color: "var(--terminal-green)" }}>
                    {">"}
                  </span>
                  <span>{group.lane}</span>
                </p>

                <ol className="space-y-8">
                  {group.steps.map((s, i) => (
                    <li key={s.title} className="space-y-3 border-l border-border pl-6">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-3xl font-medium leading-none text-muted-foreground/40">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-mono text-lg font-medium tracking-tight">
                          {s.title}
                        </h3>
                      </div>
                      <p className="font-sans text-sm text-muted-foreground">{s.body}</p>
                      <CodeBlock code={s.code} />
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open source */}
      <section className="border-b border-border">
        <div className="container mx-auto grid gap-10 px-6 py-20 md:grid-cols-[1fr_auto] md:items-center">
          <div className="space-y-4">
            <h2 className="font-mono" style={H2}>
              <span className="text-foreground">Open </span>
              <span className="text-muted-foreground">source</span>
            </h2>
            <p className="max-w-2xl font-sans text-base text-muted-foreground">
              Every plugin and tool in flykit is MIT-licensed and lives on GitHub. Read
              the code, file an issue, send a PR — or fork it and build your own
              registry.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline">MIT licensed</Badge>
              <Badge variant="outline">Runs on your machine</Badge>
              <Badge variant="outline">Powered by DeepSeek Harness</Badge>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="https://github.com/flykit-cc" target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
                View on GitHub
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link
                href="https://github.com/flykit-cc/plugins/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noreferrer"
              >
                Contribute
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="container mx-auto px-6 py-20">
          <h2 className="mb-10 font-mono" style={H2}>
            <span className="text-foreground">Frequently </span>
            <span className="text-muted-foreground">asked</span>
          </h2>

          <Accordion type="single" collapsible className="mx-auto max-w-3xl">
            <AccordionItem value="q1">
              <AccordionTrigger>What is flykit?</AccordionTrigger>
              <AccordionContent>
                A cockpit for agentic development, plus the open-source registry that
                fills it. The cockpit is a plugin for DeepSeek Harness: it turns the
                harness&apos;s web UI into a workspace where Claude Code, Pi and Codex
                run as real terminals beside your files, your models and your git state.
                The registry carries the plugins and tools those agents use.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>Do I have to use DeepSeek models?</AccordionTrigger>
              <AccordionContent>
                No. DeepSeek Harness is the runtime that powers the cockpit, not the
                model you must talk to. It speaks to DeepSeek, OpenRouter&apos;s 400+
                models, and a local llama.cpp, and the agents you run inside — Claude
                Code, Pi, Codex — bring their own accounts. Pick per session from the
                model picker.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>How do I install something?</AccordionTrigger>
              <AccordionContent>
                For the cockpit and other harness plugins, run{" "}
                <code className="font-mono text-foreground">
                  dsh plugin --profile web add &lt;name&gt;
                </code>
                . For a Claude Code plugin, register the marketplace once with{" "}
                <code className="font-mono text-foreground">
                  claude /plugin marketplace add flykit-cc/plugins
                </code>{" "}
                and then{" "}
                <code className="font-mono text-foreground">
                  /plugin install &lt;name&gt;@flykit
                </code>
                . Every catalog page shows its exact command.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>Is it safe?</AccordionTrigger>
              <AccordionContent>
                Everything is MIT-licensed and the source is on GitHub — read it before
                you install. It all runs on your own machine, in your own harness or
                Claude Code session, and only touches the files, terminals and APIs you
                grant. The cockpit&apos;s own routes bind to loopback and its file access
                is confined to the session&apos;s working directory.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q5">
              <AccordionTrigger>Can I contribute?</AccordionTrigger>
              <AccordionContent>
                Yes. Open an issue in the flykit repo describing the workflow you want to
                automate, or send a PR that follows the existing structure. We review
                against a small quality bar and merge.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q6">
              <AccordionTrigger>Where is my data stored?</AccordionTrigger>
              <AccordionContent>
                On your machine. flykit operates no backend of its own. This site is
                hosted on Vercel, which logs incoming requests per their policy; see{" "}
                <Link href="/privacy" className="underline">
                  /privacy
                </Link>{" "}
                for details.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}

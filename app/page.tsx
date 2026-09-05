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

import { CodeBlock } from "@/components/code-block";
import { RotatingWord } from "@/components/rotating-word";
import { ToolCard } from "@/components/tool-card";
import { getMarketplace } from "@/lib/plugins";
import { getTools } from "@/lib/tools";

export default async function HomePage() {
  const marketplace = await getMarketplace();
  const plugins = marketplace.plugins;
  const tools = await getTools();

  return (
    <>
      {/* Hero */}
      <section className="relative grid-paper border-b border-border">
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 font-mono text-xs">
              <span
                aria-hidden
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--terminal-green)" }}
              />
              <span className="text-foreground">{plugins.length + tools.length} Tools</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">Open source</span>
            </div>

            <div className="flex flex-col items-center gap-4">
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span
                  aria-hidden
                  style={{ color: "var(--terminal-green)" }}
                >
                  {">"}
                </span>
                <span>Claude Code · DeepSeek Harness</span>
              </p>
              <h1
                className="font-mono"
                style={{
                  fontSize: "clamp(44px, 8vw, 84px)",
                  fontWeight: 500,
                  letterSpacing: "-2px",
                  lineHeight: 1.05,
                }}
              >
                <span className="text-foreground">plugins </span>
                <span className="text-muted-foreground">for </span>
                <RotatingWord />
              </h1>
            </div>

            <p className="max-w-xl font-sans text-base text-muted-foreground md:text-lg">
              Fly your agents. flykit is an open-source registry of tools and
              plugins for AI coding agents — Claude Code and DeepSeek Harness
              today. Install, run, contribute.
            </p>

            <div className="flex w-full max-w-xl flex-col gap-3">
              <div className="space-y-1.5 text-left">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Claude Code
                </p>
                <CodeBlock code="claude /plugin marketplace add flykit-cc/flykit" />
              </div>
              <div className="space-y-1.5 text-left">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  DeepSeek Harness
                </p>
                <CodeBlock code="dsh plugin --profile web add dsh-claude-live" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Plugins */}
      <section id="plugins" className="border-b border-border">
        <div className="container mx-auto px-6 py-20">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2
              className="font-mono"
              style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 500, letterSpacing: "-1px" }}
            >
              <span className="text-foreground">Claude Code </span>
              <span className="text-muted-foreground">Plugins</span>
            </h2>
            <Link
              href="https://github.com/flykit-cc/flykit/issues/new"
              className="hidden font-mono text-sm text-muted-foreground hover:text-foreground md:inline-flex items-center gap-1"
            >
              Suggest a plugin <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

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
                      {p.categories.slice(0, 3).map((c) => (
                        <Badge key={c} variant="outline">{c}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

            {/* "More coming" placeholder */}
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
                  Got a workflow worth automating? Open an issue and we&apos;ll
                  scope a plugin together.
                </CardDescription>
                <Link
                  href="https://github.com/flykit-cc/flykit/issues/new"
                  className="font-mono text-sm text-foreground hover:underline inline-flex items-center gap-1"
                >
                  Suggest a plugin <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" className="border-b border-border">
        <div className="container mx-auto px-6 py-20">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2
              className="font-mono"
              style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 500, letterSpacing: "-1px" }}
            >
              <span className="text-foreground">Agent </span>
              <span className="text-muted-foreground">Tools</span>
            </h2>
          </div>
          <p className="mb-10 max-w-2xl font-sans text-base text-muted-foreground">
            Standalone tools, DeepSeek Harness plugins, and native apps. Each
            card shows the ecosystem it runs in and how to get it.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {tools.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-border">
        <div className="container mx-auto px-6 py-20">
          <h2
            className="mb-4 font-mono"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 500, letterSpacing: "-1px" }}
          >
            <span className="text-foreground">How it </span>
            <span className="text-muted-foreground">works</span>
          </h2>
          <p className="mb-12 max-w-2xl font-sans text-base text-muted-foreground">
            Two ecosystems, one registry. Pick the lane your agent runs in.
          </p>

          <div className="grid gap-14 md:grid-cols-2 md:gap-10">
            {[
              {
                lane: "Claude Code",
                steps: [
                  {
                    title: "Add the marketplace",
                    body: "Register the flykit marketplace in Claude Code. One command, one time.",
                    code: "claude /plugin marketplace add flykit-cc/flykit",
                  },
                  {
                    title: "Install a plugin",
                    body: "Pick a plugin from the marketplace and install it scoped to flykit.",
                    code: "/plugin install steuer@flykit",
                  },
                  {
                    title: "Run the skill",
                    body: "Invoke any of the plugin's skills inside Claude Code. They run locally with your data.",
                    code: "/skill calculate-euer",
                  },
                ],
              },
              {
                lane: "DeepSeek Harness",
                steps: [
                  {
                    title: "Install the harness",
                    body: "The dsh CLI carries the agent, the web UI, and the plugin loader.",
                    code: "npm install -g @deepseek-ai/dsh",
                  },
                  {
                    title: "Add a plugin",
                    body: "A dsh plugin extends the harness itself — new panels, new tools, new routes.",
                    code: "dsh plugin --profile web add dsh-flykit",
                  },
                  {
                    title: "Open the cockpit",
                    body: "Start the web UI. The plugin is already loaded, no restart dance.",
                    code: "dsh web",
                  },
                ],
              },
            ].map((group) => (
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
                      <p className="font-sans text-sm text-muted-foreground">
                        {s.body}
                      </p>
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
            <h2
              className="font-mono"
              style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 500, letterSpacing: "-1px" }}
            >
              <span className="text-foreground">Open </span>
              <span className="text-muted-foreground">source</span>
            </h2>
            <p className="font-sans text-base text-muted-foreground max-w-2xl">
              Every plugin in flykit is MIT-licensed and lives on GitHub. Read
              the code, file an issue, send a PR — or fork it and build your
              own marketplace.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline">MIT licensed</Badge>
              <Badge variant="outline">Claude Code + DeepSeek Harness</Badge>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link
                href="https://github.com/flykit-cc/flykit"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link
                href="https://github.com/flykit-cc/flykit/blob/main/CONTRIBUTING.md"
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
          <h2
            className="mb-10 font-mono"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 500, letterSpacing: "-1px" }}
          >
            <span className="text-foreground">Frequently </span>
            <span className="text-muted-foreground">asked</span>
          </h2>

          <Accordion type="single" collapsible className="mx-auto max-w-3xl">
            <AccordionItem value="q1">
              <AccordionTrigger>What is flykit?</AccordionTrigger>
              <AccordionContent>
                flykit is an open-source registry of tools and plugins for AI
                coding agents — Claude Code and DeepSeek Harness today. Claude
                Code plugins bundle slash commands, skills, and prompts; dsh
                plugins extend the DeepSeek Harness GUI. Both install with one
                command.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>How do I install a plugin?</AccordionTrigger>
              <AccordionContent>
                Inside Claude Code, run{" "}
                <code className="font-mono text-foreground">
                  claude /plugin marketplace add flykit-cc/flykit
                </code>{" "}
                to register the marketplace, then{" "}
                <code className="font-mono text-foreground">
                  /plugin install &lt;name&gt;@flykit
                </code>{" "}
                to install a specific plugin. For a DeepSeek Harness plugin,
                run{" "}
                <code className="font-mono text-foreground">
                  dsh plugin --profile web add &lt;name&gt;
                </code>{" "}
                instead — each tool page shows its exact command.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>Is it safe?</AccordionTrigger>
              <AccordionContent>
                All plugins are MIT-licensed and the source is on GitHub — read
                it before you install. Everything runs on your own machine —
                inside your Claude Code session, or inside your local DeepSeek
                Harness — and only touches the files, terminals, and APIs you
                grant access to.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>Can I contribute a plugin?</AccordionTrigger>
              <AccordionContent>
                Yes. Open an issue in the flykit repo describing the workflow
                you want to automate, or send a PR with a new plugin that
                follows the existing structure. We review against a small
                quality bar and merge.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q5">
              <AccordionTrigger>How do I add a new bank to steuer?</AccordionTrigger>
              <AccordionContent>
                Steuer ships with a parser for Wise. To add another bank,
                contribute a parser to the steuer plugin in the flykit repo —
                each bank is one file under{" "}
                <code className="font-mono text-foreground">parsers/</code>{" "}
                that returns a normalized transaction list.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q6">
              <AccordionTrigger>Where is my data stored?</AccordionTrigger>
              <AccordionContent>
                Everything runs locally — in your Claude Code session or your
                own DeepSeek Harness instance — and reads and writes files on
                your machine. flykit operates no backend of its own. This site is hosted on Vercel, which logs incoming
                requests per their policy; see{" "}
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

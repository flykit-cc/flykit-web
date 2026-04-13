import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight, Github, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import { CodeBlock } from "@/components/code-block";
import { getMarketplace, getPlugin } from "@/lib/plugins";

export async function generateStaticParams() {
  const m = await getMarketplace();
  return m.plugins.map((p) => ({ slug: p.slug }));
}

export default async function PluginPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plugin = await getPlugin(slug);
  if (!plugin) notFound();

  return (
    <div className="container mx-auto px-6 py-12">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex items-center gap-1.5 font-mono text-xs text-muted-foreground"
      >
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/#plugins" className="hover:text-foreground">Plugins</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{plugin.displayName}</span>
      </nav>

      <div className="grid gap-12 md:grid-cols-[1fr_320px]">
        {/* Left column */}
        <div className="min-w-0">
          <h1
            className="font-mono text-foreground"
            style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 500, letterSpacing: "-1.4px" }}
          >
            {plugin.displayName}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              href={plugin.authorUrl}
              className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-muted text-xs font-medium text-foreground">
                {plugin.author.slice(0, 1).toUpperCase()}
              </span>
              by {plugin.author}
            </Link>
            <span className="text-muted-foreground" aria-hidden>·</span>
            <div className="flex flex-wrap gap-2">
              {plugin.categories.map((c) => (
                <Badge key={c} variant="outline">{c}</Badge>
              ))}
            </div>
          </div>

          <p className="mt-6 max-w-2xl font-sans text-lg text-muted-foreground">
            {plugin.tagline}
          </p>

          <Tabs defaultValue="about" className="mt-10">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="readme">README</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="sources">Sources</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-10">
              <section>
                <h2 className="font-mono text-xl font-medium tracking-tight">
                  Overview
                </h2>
                <p className="mt-3 font-sans text-base text-muted-foreground max-w-2xl">
                  {plugin.description}
                </p>
              </section>

              <section>
                <h2 className="font-mono text-xl font-medium tracking-tight">
                  Key features
                </h2>
                <ol className="mt-4 space-y-4">
                  {plugin.features.map((f, i) => (
                    <li
                      key={f}
                      className="grid grid-cols-[60px_1fr] gap-4 border-l border-border pl-6"
                    >
                      <div className="font-mono text-2xl font-medium leading-none text-muted-foreground/40">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <p className="font-sans text-base text-foreground">{f}</p>
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <h2 className="font-mono text-xl font-medium tracking-tight">
                  Use cases
                </h2>
                <ul className="mt-4 space-y-2">
                  {plugin.useCases.map((u) => (
                    <li
                      key={u}
                      className="font-sans text-base text-muted-foreground"
                    >
                      — {u}
                    </li>
                  ))}
                </ul>
              </section>
            </TabsContent>

            <TabsContent value="readme">
              <p className="font-sans text-base text-muted-foreground">
                The full README lives in the plugin&apos;s repo. View it on{" "}
                <Link
                  href={plugin.repo}
                  className="text-foreground underline underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </Link>
                .
              </p>
            </TabsContent>

            <TabsContent value="skills" className="space-y-3">
              {plugin.skills.map((s) => (
                <Card key={s.name}>
                  <CardContent className="p-5">
                    <CardTitle>{s.name}</CardTitle>
                    <CardDescription className="mt-2">
                      {s.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="sources" className="space-y-3">
              {plugin.sources.map((s) => (
                <Link
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-md border border-border p-4 hover:bg-muted"
                >
                  <span className="font-mono text-sm text-foreground">{s.label}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Right sidebar */}
        <aside className="space-y-4 md:sticky md:top-24 md:self-start">
          <div className="terminal-corners rounded-md border border-foreground bg-foreground p-5 text-background">
            <p className="font-mono text-xs uppercase tracking-wider text-background/60">
              Get started
            </p>
            <p className="mt-2 font-mono text-base font-medium">
              Install in Claude Code
            </p>
            <p className="mt-2 font-sans text-sm text-background/70">
              One command. Runs locally with your data.
            </p>
            <Button asChild variant="outline" className="mt-4 w-full bg-background text-foreground hover:bg-background/90">
              <Link href="/docs">Read the docs</Link>
            </Button>
          </div>

          <CodeBlock code={`/plugin install ${plugin.name}@flykit`} variant="dark" compact />

          <Card>
            <CardContent className="p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Available skills
              </p>
              <div className="mt-3 space-y-2">
                {plugin.skills.map((s) => (
                  <div
                    key={s.name}
                    className="rounded-md border border-border p-3"
                  >
                    <p className="font-mono text-sm font-medium text-foreground">
                      {s.name}
                    </p>
                    <p className="mt-1 font-sans text-xs text-muted-foreground line-clamp-2">
                      {s.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Open source
              </p>
              <div className="mt-3 flex items-center justify-between">
                <Link
                  href={plugin.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-sm text-foreground hover:underline"
                >
                  <Github className="h-4 w-4" />
                  flykit-cc/flykit
                </Link>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
                  <Star className="h-3.5 w-3.5" />
                  {plugin.stars}
                </span>
              </div>
              <Separator className="my-3" />
              <p className="font-mono text-xs text-muted-foreground">
                License: {plugin.license}
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

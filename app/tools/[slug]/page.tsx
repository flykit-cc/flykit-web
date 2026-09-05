import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Download, Github } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";
import { getTool, getTools, isDownload } from "@/lib/tools";

const BASE_URL = "https://flykit.cc";
const RAW_BASE = "https://raw.githubusercontent.com/flykit-cc/flykit/main";

export async function generateStaticParams() {
  const tools = await getTools();
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = await getTool(slug);
  if (!tool) return { title: "Tool not found — flykit" };
  const url = `${BASE_URL}/tools/${tool.slug}`;
  const title = `${tool.web.displayName} — flykit`;
  return {
    title,
    description: tool.web.tagline,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: tool.web.tagline,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description: tool.web.tagline,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = await getTool(slug);
  if (!tool) notFound();

  const url = `${BASE_URL}/tools/${tool.slug}`;
  // A screenshot is either a path inside the registry repo ("./shots/a.png") or
  // one this site serves itself ("/screenshots/…"), used before a registry push.
  const shots = (tool.web.screenshots ?? []).map((s) => ({
    ...s,
    src: /^(https?:|\/)/.test(s.file)
      ? s.file
      : `${RAW_BASE}/tools/${slug}/${s.file.replace(/^\.\//, "")}`,
  }));
  const [hero, ...rest] = shots;
  const download = isDownload(tool.web.install);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.web.displayName,
    description: tool.web.description || tool.web.tagline,
    url,
    applicationCategory: "DeveloperApplication",
    operatingSystem: tool.ecosystem === "macos" ? "macOS" : "Cross-platform",
    author: { "@type": "Person", name: tool.web.author, url: tool.web.authorUrl },
    license: tool.license
      ? `https://spdx.org/licenses/${tool.license}.html`
      : undefined,
    codeRepository: tool.web.externalRepo,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    isPartOf: {
      "@type": "CollectionPage",
      name: "flykit",
      url: BASE_URL,
    },
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex items-center gap-1.5 font-mono text-xs text-muted-foreground"
      >
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/#tools" className="hover:text-foreground">Tools</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{tool.web.displayName}</span>
      </nav>

      <div className="grid gap-12 md:grid-cols-[1fr_320px]">
        {/* Left column */}
        <div className="min-w-0">
          <h1
            className="font-mono text-foreground"
            style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 500, letterSpacing: "-1.4px" }}
          >
            {tool.web.displayName}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              href={tool.web.authorUrl}
              className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://github.com/${tool.web.author}.png?size=64`}
                alt={`${tool.web.author} on GitHub`}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full border border-border bg-muted object-cover"
              />
              by {tool.web.author}
            </Link>
            <span className="text-muted-foreground" aria-hidden>·</span>
            <div className="flex flex-wrap gap-2">
              <Badge>{ecosystemLabel(tool.ecosystem)}</Badge>
              {tool.web.categories.map((c) => (
                <Badge key={c} variant="outline">{c}</Badge>
              ))}
            </div>
          </div>

          <p className="mt-6 max-w-2xl font-sans text-lg text-muted-foreground">
            {tool.web.tagline}
          </p>

          {hero && (
            <figure className="mt-8 overflow-hidden rounded-md border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hero.src} alt={hero.label} className="w-full" />
            </figure>
          )}

          <section className="mt-10">
            <h2 className="font-mono text-xl font-medium tracking-tight">
              About
            </h2>
            <p className="mt-3 font-sans text-base text-muted-foreground max-w-2xl">
              {tool.web.description}
            </p>
          </section>

          {tool.web.features.length > 0 && (
            <section className="mt-10">
              <h2 className="font-mono text-xl font-medium tracking-tight">
                Key features
              </h2>
              <ol className="mt-4 space-y-4">
                {tool.web.features.map((f, i) => (
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
          )}

          {tool.web.useCases.length > 0 && (
            <section className="mt-10">
              <h2 className="font-mono text-xl font-medium tracking-tight">
                Use cases
              </h2>
              <ul className="mt-4 space-y-2">
                {tool.web.useCases.map((u) => (
                  <li
                    key={u}
                    className="font-sans text-base text-muted-foreground"
                  >
                    — {u}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {rest.length > 0 && (
            <section className="mt-10">
              <h2 className="font-mono text-xl font-medium tracking-tight">
                Screenshots
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4">
                {rest.map((s) => (
                  <figure
                    key={s.file}
                    className="overflow-hidden rounded-md border border-border"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.src} alt={s.label} className="w-full" />
                    <figcaption className="border-t border-border p-3 font-mono text-xs text-muted-foreground">
                      {s.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right sidebar */}
        <aside className="space-y-4 md:sticky md:top-24 md:self-start">
          <div className="terminal-corners rounded-md border border-foreground bg-foreground p-5 text-background">
            <p className="font-mono text-xs uppercase tracking-wider text-background/60">
              Get started
            </p>
            <p className="mt-2 font-mono text-base font-medium">
              {download ? "Download" : "Install"} {tool.web.displayName}
            </p>
            <p className="mt-2 whitespace-pre-line font-sans text-sm text-background/70">
              {tool.web.installNote ??
                (tool.ecosystem === "dsh"
                  ? "A DeepSeek Harness plugin — install it with the dsh CLI."
                  : "Run the command below to install it.")}
            </p>
          </div>

          {download ? (
            <Button asChild className="w-full">
              <Link href={tool.web.install} target="_blank" rel="noreferrer">
                <Download className="h-4 w-4" />
                Download {tool.version}
              </Link>
            </Button>
          ) : (
            <CodeBlock code={tool.web.install} variant="dark" compact />
          )}

          <Card>
            <CardContent className="p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Open source
              </p>
              <div className="mt-3 flex items-center justify-between">
                <Link
                  href={tool.web.externalRepo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-sm text-foreground hover:underline"
                >
                  <Github className="h-4 w-4" />
                  Open on GitHub
                </Link>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

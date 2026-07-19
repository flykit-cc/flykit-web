import Link from "next/link";
import { Github } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";
import type { FullTool } from "@/lib/tools";

export function ToolCard({ tool }: { tool: FullTool }) {
  return (
    <Card className="h-full transition-colors hover:bg-muted/40">
      <CardContent className="flex h-full flex-col gap-4 p-6">
        <Link href={`/tools/${tool.slug}`} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-muted font-mono text-base font-medium">
            {tool.web.displayName.slice(0, 1)}
          </div>
          <div>
            <CardTitle>{tool.web.displayName}</CardTitle>
            <p className="font-mono text-xs text-muted-foreground">
              by {tool.web.author}
            </p>
          </div>
        </Link>

        <CardDescription className="line-clamp-3">{tool.web.tagline}</CardDescription>

        <div className="flex flex-wrap gap-2">
          {tool.web.categories.slice(0, 3).map((c) => (
            <Badge key={c} variant="outline">{c}</Badge>
          ))}
        </div>

        <div className="mt-auto space-y-3 pt-2">
          <CodeBlock code={tool.web.install} compact />
          <Link
            href={tool.web.externalRepo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-mono text-sm text-foreground hover:underline"
          >
            <Github className="h-3.5 w-3.5" />
            Open on GitHub
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

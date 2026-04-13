"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  code: string;
  className?: string;
  variant?: "light" | "dark";
  compact?: boolean;
};

export function CodeBlock({ code, className, variant = "light", compact = false }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "relative flex items-center justify-between rounded-md border font-mono",
        compact ? "gap-2 px-3 py-2 text-xs" : "gap-4 px-4 py-3 text-sm",
        isDark
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-muted text-foreground",
        className
      )}
    >
      <code
        className={cn(
          "min-w-0 flex-1",
          compact ? "break-all" : "overflow-x-auto whitespace-pre"
        )}
      >
        <span className={cn(isDark ? "text-background/60" : "text-muted-foreground")}>
          ${" "}
        </span>
        {code}
      </code>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy code"
        className={cn(
          "shrink-0 rounded p-1 transition-colors",
          isDark
            ? "text-background/70 hover:text-background"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

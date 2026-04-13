"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BAR_WIDTH = 26;

export default function NotFound() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);
  const [frame, setFrame] = useState(0);

  // Countdown
  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s <= 0 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Redirect when countdown hits 0
  useEffect(() => {
    if (seconds === 0) router.push("/");
  }, [seconds, router]);

  // ASCII sweep animation
  useEffect(() => {
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % BAR_WIDTH);
    }, 90);
    return () => clearInterval(id);
  }, []);

  const sweep =
    " ".repeat(frame) + "\u2588" + " ".repeat(BAR_WIDTH - frame - 1);

  const ascii = [
    "\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510",
    "\u2502 > searching for route...     \u2502",
    `\u2502 > ${sweep} \u2502`,
    "\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518",
  ].join("\n");

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="mx-auto max-w-2xl space-y-10">
        <header className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Error 404
          </p>
          <h1
            className="font-mono"
            style={{
              fontSize: "clamp(32px, 4.5vw, 48px)",
              fontWeight: 500,
              letterSpacing: "-1.2px",
            }}
          >
            <span className="text-foreground">route </span>
            <span className="text-muted-foreground">not found</span>
          </h1>
          <p className="font-sans text-base text-muted-foreground">
            The path you requested does not exist on this server. It may have
            been moved, renamed, or it never existed at all.
          </p>
        </header>

        <div className="border border-border bg-muted/30">
          <pre
            aria-hidden
            className="overflow-x-auto p-4 font-mono text-[13px] leading-snug text-foreground"
            style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
          >
            {ascii}
          </pre>
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-sm text-muted-foreground">
            <span
              aria-hidden
              className="mr-2 inline-block h-2 w-2 translate-y-[1px] rounded-sm"
              style={{ background: "var(--terminal-green)" }}
            />
            Redirecting home in {seconds}
            <span className="text-muted-foreground/60">
              {".".repeat(((5 - seconds) % 3) + 1)}
            </span>
          </p>

          <Link
            href="/"
            className="font-mono text-sm text-foreground underline underline-offset-4 hover:no-underline"
          >
            Go home now →
          </Link>
        </div>
      </div>
    </div>
  );
}

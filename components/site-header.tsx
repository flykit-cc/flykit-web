import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-base font-semibold tracking-tight"
        >
          <Logo size={18} />
          flykit
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/#plugins"
            className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Plugins
          </Link>
          <Link
            href="/docs"
            className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Docs
          </Link>
          <Link
            href="https://github.com/flykit-cc/flykit"
            className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm">
            <Link href="/docs">Install</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

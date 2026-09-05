import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          {/* Pixel-art wordmark: render at exactly half its 139×72 source so
              the 2px blocks map cleanly to 1px — any other scale blurs it. */}
          <Image
            src="/flykit-cc-logo.png"
            alt="flykit.cc"
            width={139}
            height={72}
            priority
            className="h-9 w-auto [image-rendering:pixelated] mix-blend-multiply"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/tools/dsh-flykit"
            className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Cockpit
          </Link>
          <Link
            href="/#catalog"
            className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Catalog
          </Link>
          <Link
            href="/docs"
            className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Docs
          </Link>
          <Link
            href="https://github.com/flykit-cc"
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

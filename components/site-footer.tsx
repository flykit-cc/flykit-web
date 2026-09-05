import Link from "next/link";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-base font-semibold">
              <Logo size={18} />
              flykit
            </div>
            <p className="font-sans text-sm text-muted-foreground max-w-xs">
              An open-source cockpit for agentic development, and the registry
              that fills it. Powered by DeepSeek Harness.
            </p>
          </div>

          <FooterCol
            title="Catalog"
            links={[
              { label: "The cockpit", href: "/tools/dsh-flykit" },
              { label: "Tools & harness plugins", href: "/#tools" },
              { label: "Claude Code plugins", href: "/#plugins" },
              { label: "Flow", href: "/plugins/flow" },
              { label: "Steuer", href: "/plugins/steuer" },
              { label: "Suggest a tool", href: "https://github.com/flykit-cc/flykit-web/issues/new" },
            ]}
          />
          <FooterCol
            title="Docs"
            links={[
              { label: "Getting started", href: "/docs" },
              { label: "Changelog", href: "/changelog" },
              { label: "DeepSeek Harness", href: "https://github.com/deepseek-ai/deepseek-harness" },
              { label: "Plugin spec", href: "https://github.com/flykit-cc" },
            ]}
          />
          <FooterCol
            title="About"
            links={[
              { label: "GitHub", href: "https://github.com/flykit-cc" },
              { label: "License (MIT)", href: "https://github.com/flykit-cc/plugins/blob/main/LICENSE" },
              { label: "Contact", href: "mailto:hello@flykit.cc" },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted-foreground">
            © 2026 flykit. MIT licensed.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="font-mono text-xs text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="font-mono text-xs text-muted-foreground hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="space-y-3">
      <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-foreground">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="font-sans text-sm text-muted-foreground hover:text-foreground"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

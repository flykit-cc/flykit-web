import Link from "next/link";

export const metadata = {
  title: "Privacy — flykit",
  description:
    "flykit.cc is a static site. No analytics, no cookies, no personal data collected.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="mx-auto max-w-3xl space-y-12">
        <header className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Legal
          </p>
          <h1
            className="font-mono"
            style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 500, letterSpacing: "-1.4px" }}
          >
            <span className="text-foreground">Privacy </span>
            <span className="text-muted-foreground">policy</span>
          </h1>
          <p className="font-sans text-lg text-muted-foreground">
            The short version: flykit.cc is a static marketing site. We don&apos;t
            want your data and we don&apos;t collect it.
          </p>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Last updated: 2026-04-13
          </p>
        </header>

        <section className="space-y-4 border-l border-border pl-6">
          <h2 className="font-mono text-xl font-medium tracking-tight">
            What this site does
          </h2>
          <p className="font-sans text-base text-muted-foreground">
            flykit.cc is a catalog of open-source{" "}
            <Link
              href="https://docs.claude.com/en/docs/claude-code"
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              Claude Code
            </Link>{" "}
            plugins. It has no accounts, no forms, no comments, and no user
            content. Plugin metadata is read at build time from the public{" "}
            <Link
              href="https://github.com/flykit-cc/flykit"
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              flykit repository
            </Link>{" "}
            on GitHub.
          </p>
        </section>

        <section className="space-y-4 border-l border-border pl-6">
          <h2 className="font-mono text-xl font-medium tracking-tight">
            What we collect
          </h2>
          <p className="font-sans text-base text-muted-foreground">
            Nothing. We don&apos;t run analytics, we don&apos;t set cookies, and
            we don&apos;t embed third-party trackers on this site.
          </p>
        </section>

        <section className="space-y-4 border-l border-border pl-6">
          <h2 className="font-mono text-xl font-medium tracking-tight">
            Hosting
          </h2>
          <p className="font-sans text-base text-muted-foreground">
            The site is hosted on Vercel. Vercel may collect standard server
            logs (IP address, user agent, request path) to operate the service.
            See{" "}
            <Link
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              Vercel&apos;s privacy policy
            </Link>{" "}
            for details.
          </p>
        </section>

        <section className="space-y-4 border-l border-border pl-6">
          <h2 className="font-mono text-xl font-medium tracking-tight">
            Plugins run on your machine
          </h2>
          <p className="font-sans text-base text-muted-foreground">
            flykit plugins are installed and executed locally inside your own
            Claude Code install. Any data a plugin reads or writes stays on your
            machine, subject to whatever that plugin does. This site has no
            visibility into plugin usage.
          </p>
        </section>

        <section className="space-y-4 border-t border-border pt-10">
          <h2 className="font-mono text-2xl font-medium tracking-tight">
            Questions?
          </h2>
          <p className="font-sans text-base text-muted-foreground">
            Open an{" "}
            <Link
              href="https://github.com/flykit-cc/flykit/issues/new"
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              issue on GitHub
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

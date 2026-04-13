import Link from "next/link";

export const metadata = {
  title: "Terms — flykit",
  description:
    "flykit and its plugins are provided as-is under the MIT license. You run them at your own risk.",
};

export default function TermsPage() {
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
            <span className="text-foreground">Terms </span>
            <span className="text-muted-foreground">of use</span>
          </h1>
          <p className="font-sans text-lg text-muted-foreground">
            flykit is an open-source project. The site and all listed plugins
            are provided as-is under the MIT license.
          </p>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Last updated: 2026-04-13
          </p>
        </header>

        <section className="space-y-4 border-l border-border pl-6">
          <h2 className="font-mono text-xl font-medium tracking-tight">
            License
          </h2>
          <p className="font-sans text-base text-muted-foreground">
            This website and the plugins it catalogs are released under the MIT
            license. See the full text in the{" "}
            <Link
              href="https://github.com/flykit-cc/flykit/blob/main/LICENSE"
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              LICENSE file
            </Link>
            . In short: use it, modify it, ship it — no warranty, no liability.
          </p>
        </section>

        <section className="space-y-4 border-l border-border pl-6">
          <h2 className="font-mono text-xl font-medium tracking-tight">
            Plugins run on your machine
          </h2>
          <p className="font-sans text-base text-muted-foreground">
            flykit plugins execute locally inside your own Claude Code install.
            You are responsible for reviewing and running the code you install,
            for any credentials or files those plugins touch, and for
            complying with the terms of any third-party services they connect
            to.
          </p>
        </section>

        <section className="space-y-4 border-l border-border pl-6">
          <h2 className="font-mono text-xl font-medium tracking-tight">
            No warranty
          </h2>
          <p className="font-sans text-base text-muted-foreground">
            The site and plugins are provided &quot;as is&quot;, without warranty of
            any kind. Nothing published here constitutes legal, tax, financial,
            or professional advice. Plugins that touch regulated domains (for
            example, tax filing) are starting points — verify the output
            yourself or with a qualified professional before relying on it.
          </p>
        </section>

        <section className="space-y-4 border-l border-border pl-6">
          <h2 className="font-mono text-xl font-medium tracking-tight">
            Third-party services
          </h2>
          <p className="font-sans text-base text-muted-foreground">
            Plugins may talk to third-party APIs (banks, government portals,
            etc.) using credentials you provide. flykit is not affiliated with
            those services and is not responsible for their behavior, outages,
            or terms of service.
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

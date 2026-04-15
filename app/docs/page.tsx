import Link from "next/link";
import { CodeBlock } from "@/components/code-block";

export const metadata = {
  title: "Docs — flykit",
  description: "Install Claude Code, add the flykit marketplace, and run your first plugin.",
};

export default function DocsPage() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="mx-auto max-w-3xl space-y-12">
        <header className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Getting started
          </p>
          <h1
            className="font-mono"
            style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 500, letterSpacing: "-1.4px" }}
          >
            <span className="text-foreground">Install </span>
            <span className="text-muted-foreground">flykit</span>
          </h1>
          <p className="font-sans text-lg text-muted-foreground">
            Five steps to get a flykit plugin running inside Claude Code.
          </p>
        </header>

        <Step
          n={1}
          title="Install Claude Code"
          body={
            <>
              flykit plugins run inside Claude Code. Install it from{" "}
              <Link
                href="https://docs.claude.com/en/docs/claude-code"
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline underline-offset-4"
              >
                docs.claude.com
              </Link>
              . Any recent version supports plugins.
            </>
          }
        />

        <Step
          n={2}
          title="Add the marketplace"
          body="Register flykit as a plugin marketplace. You only do this once."
          code="claude /plugin marketplace add flykit-cc/flykit"
        />

        <Step
          n={3}
          title="Install a plugin"
          body="Pick a plugin and install it scoped to flykit."
          code="/plugin install steuer@flykit"
        />

        <Step
          n={4}
          title="Open Claude Code"
          body={
            <>
              Claude Code is a CLI — you launch it from a folder in your
              terminal, and that folder becomes the session's working
              directory. Whether it matters depends on the plugin:
              <ul className="mt-3 list-none space-y-2 font-sans text-base text-muted-foreground">
                <li>
                  <strong className="text-foreground">Skills that touch files</strong> (like{" "}
                  <em>steuer</em>, which reads bank exports and writes reports)
                  — <code className="font-mono text-foreground">cd</code> into
                  the folder where your data lives.
                </li>
                <li>
                  <strong className="text-foreground">Slash commands, subagents, and prompt-only plugins</strong>{" "}
                  — the folder doesn&apos;t matter. Open Claude Code anywhere.
                </li>
                <li>
                  <strong className="text-foreground">Hooks and MCP servers</strong> — context depends on the plugin.
                  Check its README.
                </li>
              </ul>
            </>
          }
        />

        <Step
          n={5}
          title="Run a skill"
          body="Each plugin exposes one or more skills. Invoke them like any other slash command."
          code="/skill calculate-euer"
        />

        <section className="space-y-6 border-t border-border pt-10">
          <div className="space-y-2">
            <h2 className="font-mono text-2xl font-medium tracking-tight">
              Uninstalling
            </h2>
            <p className="font-sans text-base text-muted-foreground">
              Remove a single plugin, or unregister the whole marketplace.
            </p>
          </div>
          <div className="space-y-3">
            <p className="font-sans text-sm text-muted-foreground">
              Remove one plugin:
            </p>
            <div className="max-w-xl">
              <CodeBlock code="/plugin uninstall steuer@flykit" />
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-sans text-sm text-muted-foreground">
              Unregister the marketplace entirely (also removes every plugin installed from it):
            </p>
            <div className="max-w-xl">
              <CodeBlock code="/plugin marketplace remove flykit" />
            </div>
          </div>
        </section>

        <section className="space-y-4 border-t border-border pt-10">
          <h2 className="font-mono text-2xl font-medium tracking-tight">
            What next?
          </h2>
          <p className="font-sans text-base text-muted-foreground">
            Browse the{" "}
            <Link href="/#plugins" className="text-foreground underline underline-offset-4">
              available plugins
            </Link>
            , or open an{" "}
            <Link
              href="https://github.com/flykit-cc/flykit/issues/new"
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              issue
            </Link>{" "}
            to request a new one.
          </p>
        </section>
      </div>
    </div>
  );
}

function Step({
  n,
  title,
  body,
  code,
}: {
  n: number;
  title: string;
  body: React.ReactNode;
  code?: string;
}) {
  return (
    <section className="grid gap-4 border-l border-border pl-6 md:grid-cols-[80px_1fr] md:gap-8">
      <div className="font-mono text-4xl font-medium leading-none text-muted-foreground/40">
        {String(n).padStart(2, "0")}
      </div>
      <div className="space-y-3">
        <h2 className="font-mono text-xl font-medium tracking-tight">{title}</h2>
        <p className="font-sans text-base text-muted-foreground">{body}</p>
        {code ? (
          <div className="max-w-xl">
            <CodeBlock code={code} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

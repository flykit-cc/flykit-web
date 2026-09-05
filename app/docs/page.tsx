import Link from "next/link";
import { CodeBlock } from "@/components/code-block";

export const metadata = {
  title: "Docs — flykit",
  description:
    "Get the flykit cockpit running on DeepSeek Harness, then arm the agents inside it with plugins.",
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
            Three steps to the cockpit, then the plugins that sharpen the agents you
            run inside it.
          </p>
        </header>

        <section className="space-y-10">
          <div className="space-y-2">
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span aria-hidden style={{ color: "var(--terminal-green)" }}>
                {">"}
              </span>
              <span>Part one — the cockpit</span>
            </p>
            <p className="font-sans text-base text-muted-foreground">
              The cockpit is a plugin for{" "}
              <Link
                href="https://github.com/deepseek-ai/deepseek-harness"
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline underline-offset-4"
              >
                DeepSeek Harness
              </Link>
              , the open-source agent harness that powers it. Nothing is hosted: the
              harness, the panel and every agent you start run on your machine.
            </p>
          </div>

          <Step
            n={1}
            title="Install the harness"
            body="The dsh CLI carries the agent, the web UI, and the plugin loader. Node 22 or newer."
            code="npm install -g @deepseek-ai/dsh"
          />

          <Step
            n={2}
            title="Add the cockpit"
            body={
              <>
                A dsh plugin extends the harness itself — new panels, new tools, new
                routes. There is no marketplace to register: the name is an npm package.
              </>
            }
            code="dsh plugin --profile web add dsh-flykit"
          />

          <Step
            n={3}
            title="Open it"
            body={
              <>
                Start the web UI and open the link it prints. The panel is on the right
                of every session — Explorer for your files, Agents for the terminals.
                Remove a plugin again with{" "}
                <code className="font-mono text-foreground">
                  dsh plugin --profile web remove &lt;name&gt;
                </code>
                .
              </>
            }
            code="dsh web"
          />
        </section>

        <section className="space-y-10 border-t border-border pt-12">
          <div className="space-y-2">
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span aria-hidden style={{ color: "var(--terminal-green)" }}>
                {">"}
              </span>
              <span>Part two — arm your agents</span>
            </p>
            <p className="font-sans text-base text-muted-foreground">
              Claude Code plugins bundle skills, slash commands, subagents and hooks.
              They work the same whether you run Claude Code in your own terminal or in
              an Agents tab inside the cockpit.
            </p>
          </div>

          <Step
            n={4}
            title="Install Claude Code"
            body={
              <>
                Get it from{" "}
                <Link
                  href="https://docs.claude.com/en/docs/claude-code"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground underline underline-offset-4"
                >
                  docs.claude.com
                </Link>
                . Any recent version supports plugins. Pi and Codex install from their
                own projects and need no setup here.
              </>
            }
          />

          <Step
            n={5}
            title="Add the marketplace"
            body="Register flykit as a plugin marketplace. You only do this once."
            code="claude /plugin marketplace add flykit-cc/plugins"
          />

          <Step
            n={6}
            title="Install a plugin"
            body="Pick one from the catalog and install it scoped to flykit."
            code="/plugin install flow@flykit"
          />

          <Step
            n={7}
            title="Mind the working directory"
            body={
              <>
                Claude Code takes the folder you launch it from as the session&apos;s
                working directory. Inside the cockpit that folder is the session&apos;s
                workspace, already correct. In your own terminal it depends on the
                plugin:
                <ul className="mt-3 list-none space-y-2 font-sans text-base text-muted-foreground">
                  <li>
                    <strong className="text-foreground">Skills that touch files</strong>{" "}
                    (like <em>steuer</em>, which reads bank exports and writes reports) —{" "}
                    <code className="font-mono text-foreground">cd</code> into the folder
                    where your data lives.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Slash commands, subagents, and prompt-only plugins
                    </strong>{" "}
                    — the folder doesn&apos;t matter.
                  </li>
                  <li>
                    <strong className="text-foreground">Hooks and MCP servers</strong> —
                    context depends on the plugin. Check its README.
                  </li>
                </ul>
              </>
            }
          />

          <Step
            n={8}
            title="Run a skill"
            body="Each plugin exposes one or more skills. Invoke them like any other slash command."
            code="/flow:continue"
          />
        </section>

        <section className="space-y-6 border-t border-border pt-10">
          <div className="space-y-2">
            <h2 className="font-mono text-2xl font-medium tracking-tight">Uninstalling</h2>
            <p className="font-sans text-base text-muted-foreground">
              Remove a single plugin, or unregister the whole marketplace.
            </p>
          </div>
          <div className="space-y-3">
            <p className="font-sans text-sm text-muted-foreground">Remove one plugin:</p>
            <div className="max-w-xl">
              <CodeBlock code="/plugin uninstall steuer@flykit" />
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-sans text-sm text-muted-foreground">
              Unregister the marketplace entirely (also removes every plugin installed
              from it):
            </p>
            <div className="max-w-xl">
              <CodeBlock code="/plugin marketplace remove flykit" />
            </div>
          </div>
        </section>

        <section className="space-y-4 border-t border-border pt-10">
          <h2 className="font-mono text-2xl font-medium tracking-tight">What next?</h2>
          <p className="font-sans text-base text-muted-foreground">
            Read what the{" "}
            <Link
              href="/tools/dsh-flykit"
              className="text-foreground underline underline-offset-4"
            >
              cockpit
            </Link>{" "}
            can do, browse the{" "}
            <Link href="/#catalog" className="text-foreground underline underline-offset-4">
              catalog
            </Link>
            , or open an{" "}
            <Link
              href="https://github.com/flykit-cc/flykit-web/issues/new"
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
        {/* A div, not a p: one step's body carries a list, and a ul inside a p is invalid
            nesting that React reports as a hydration mismatch. */}
        <div className="font-sans text-base text-muted-foreground">{body}</div>
        {code ? (
          <div className="max-w-xl">
            <CodeBlock code={code} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

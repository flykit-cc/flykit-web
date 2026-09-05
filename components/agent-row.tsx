import { Terminal } from "lucide-react";

/**
 * The agents that run inside the cockpit. Marks are drawn here rather than
 * imported so the row needs no remote assets and no licence question.
 */
const AGENTS = [
  {
    name: "Claude Code",
    note: "Anthropic",
    mark: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
        <path d="M12 2.6l2.6 6.2 6.8.5-5.2 4.4 1.6 6.6L12 16.8 6.2 20.3l1.6-6.6L2.6 9.3l6.8-.5z" />
      </svg>
    ),
    color: "#d97757",
  },
  {
    name: "Pi",
    note: "earendil",
    mark: (
      <span className="font-mono text-[17px] leading-none" aria-hidden>
        π
      </span>
    ),
    color: "#14b8a6",
  },
  {
    name: "Codex",
    note: "OpenAI",
    mark: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 6l5 6-5 6" />
        <path d="M12 18h8" />
      </svg>
    ),
    color: "#10a37f",
  },
  {
    name: "Shell",
    note: "whatever you use",
    mark: <Terminal className="h-[18px] w-[18px]" aria-hidden />,
    color: "hsl(var(--muted-foreground))",
  },
];

export function AgentRow() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {AGENTS.map((a) => (
        <div
          key={a.name}
          className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3"
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border"
            style={{ color: a.color }}
          >
            {a.mark}
          </span>
          <span className="min-w-0">
            <span className="block truncate font-mono text-sm font-medium">{a.name}</span>
            <span className="block truncate font-mono text-xs text-muted-foreground">
              {a.note}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

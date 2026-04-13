import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="bg-foreground text-background">
      <div className="container mx-auto px-6 py-2 text-center font-mono text-xs">
        <Link
          href="/plugins/steuer"
          className="inline-flex items-center gap-2 hover:underline"
        >
          <span className="font-semibold tracking-wider">NEW</span>
          <span aria-hidden="true">·</span>
          <span>Steuer is live — German freelancer tax filing for Claude Code</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

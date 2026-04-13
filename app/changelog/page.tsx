import Link from "next/link";
import Image from "next/image";
import { fetchChangelog, type ChangelogEntry } from "@/lib/plugins";

export const revalidate = 3600;

export const metadata = {
  title: "Changelog — flykit",
  description: "Recent activity across flykit plugins, straight from GitHub.",
};

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function groupByDate(entries: ChangelogEntry[]): Map<string, ChangelogEntry[]> {
  const map = new Map<string, ChangelogEntry[]>();
  for (const e of entries) {
    const key = formatDate(e.date) || "Undated";
    const bucket = map.get(key) ?? [];
    bucket.push(e);
    map.set(key, bucket);
  }
  return map;
}

export default async function ChangelogPage() {
  const entries = await fetchChangelog();
  const grouped = groupByDate(entries);

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="mx-auto max-w-3xl space-y-12">
        <header className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Activity
          </p>
          <h1
            className="font-mono"
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 500,
              letterSpacing: "-1.4px",
            }}
          >
            <span className="text-foreground">Change</span>
            <span className="text-muted-foreground">log</span>
          </h1>
          <p className="font-sans text-lg text-muted-foreground">
            Recent commits to{" "}
            <Link
              href="https://github.com/flykit-cc/flykit"
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              flykit-cc/flykit
            </Link>{" "}
            touching the <code className="font-mono text-sm">plugins/</code>{" "}
            directory. Updated hourly.
          </p>
        </header>

        {entries.length === 0 ? (
          <div className="border border-border p-6">
            <p className="font-sans text-sm text-muted-foreground">
              Couldn&apos;t load the commit feed right now. Check{" "}
              <Link
                href="https://github.com/flykit-cc/flykit/commits/main"
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline underline-offset-4"
              >
                GitHub
              </Link>{" "}
              directly.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {Array.from(grouped.entries()).map(([date, items]) => (
              <section key={date} className="space-y-4">
                <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {date}
                </h2>
                <ul className="divide-y divide-border border-t border-b border-border">
                  {items.map((e) => (
                    <li key={e.sha} className="flex items-start gap-4 py-4">
                      {e.author.avatarUrl ? (
                        <Image
                          src={e.author.avatarUrl}
                          alt={e.author.login}
                          width={28}
                          height={28}
                          className="mt-0.5 h-7 w-7 shrink-0 grayscale"
                          unoptimized
                        />
                      ) : (
                        <div className="mt-0.5 h-7 w-7 shrink-0 border border-border" />
                      )}
                      <div className="min-w-0 flex-1">
                        <Link
                          href={e.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-sans text-sm text-foreground hover:underline underline-offset-4 break-words"
                        >
                          {e.message}
                        </Link>
                        <div className="mt-1 flex items-center gap-2 font-mono text-xs text-muted-foreground">
                          <span>{e.author.login}</span>
                          <span>·</span>
                          <Link
                            href={e.url}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-foreground"
                          >
                            {e.sha.slice(0, 7)}
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * The social preview card, drawn as code rather than screenshotted, so it can
 * never drift from the site the way a stale PNG did. Both `opengraph-image` and
 * `twitter-image` render this.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "hsl(50 40% 97%)";
const FG = "hsl(0 0% 3.9%)";
const MUTED = "hsl(0 0% 45.1%)";
const BORDER = "hsl(0 0% 89.8%)";
const GREEN = "#27c93f";

// next.config.ts keeps app/_og/*.ttf in the traced output for these routes.
const font = (file: string) => readFileSync(join(process.cwd(), "app/_og", file));

function Command({ label, code }: { label: string; code: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 800 }}>
      <div style={{ fontSize: 16, letterSpacing: 2, color: MUTED }}>{label}</div>
      <div
        style={{
          display: "flex",
          gap: 12,
          padding: "16px 22px",
          fontSize: 22,
          color: FG,
          background: "#ffffff",
          border: `1px solid ${BORDER}`,
          borderRadius: 10,
        }}
      >
        <span style={{ color: MUTED }}>$</span>
        <span>{code}</span>
      </div>
    </div>
  );
}

export function ogImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          padding: "0 64px",
          background: BG,
          backgroundImage:
            `linear-gradient(to right, ${BORDER} 1px, transparent 1px), linear-gradient(to bottom, ${BORDER} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          fontFamily: "GeistMono",
          color: FG,
        }}
      >
        <div style={{ display: "flex", gap: 12, fontSize: 20, letterSpacing: 4, color: MUTED }}>
          <span style={{ color: GREEN }}>&gt;</span>
          <span>POWERED BY DEEPSEEK HARNESS</span>
        </div>

        <div style={{ display: "flex", gap: 20, fontSize: 68, fontWeight: 500, letterSpacing: -2 }}>
          <span>Fly your</span>
          <span style={{ color: MUTED }}>agents</span>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: MUTED, maxWidth: 860, textAlign: "center" }}>
          A cockpit for agentic development — Claude Code, Pi and Codex in one window.
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 12 }}>
          <Command label="START HERE" code="dsh plugin --profile web add dsh-flykit" />
          <Command label="CLAUDE CODE PLUGINS" code="claude /plugin marketplace add flykit-cc/plugins" />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "GeistMono", data: font("GeistMono-Regular.ttf"), weight: 400, style: "normal" },
        { name: "GeistMono", data: font("GeistMono-Medium.ttf"), weight: 500, style: "normal" },
      ],
    }
  );
}

import { ogImage } from "./_og/image";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "flykit — a cockpit for agentic development. Claude Code, Pi and Codex in one window, powered by DeepSeek Harness.";

export default function TwitterImage() {
  return ogImage();
}

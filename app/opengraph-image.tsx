import { ogImage } from "./_og/image";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "flykit — open-source tools for AI coding agents: Claude Code and DeepSeek Harness.";

export default function OpengraphImage() {
  return ogImage();
}

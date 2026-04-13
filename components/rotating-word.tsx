"use client";

import { useEffect, useState } from "react";

const WORDS = [
  "your workflow",
  "your business",
  "your taxes",
  "your team",
];

export function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-baseline">
      <span className="text-foreground transition-opacity duration-300">
        {WORDS[index]}
      </span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[0.85em] w-[0.5ch] translate-y-[0.05em] bg-foreground animate-blink"
      />
    </span>
  );
}

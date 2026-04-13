"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Announcement } from "@/lib/plugins";

const STORAGE_KEY = "announcement-dismissed";

export function AnnouncementBar({
  announcement,
}: {
  announcement: Announcement | null;
}) {
  const [dismissed, setDismissed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!announcement) return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === announcement.id) setDismissed(true);
    } catch {
      // ignore storage errors (private mode, etc.)
    }
    setHydrated(true);
  }, [announcement]);

  if (!announcement) return null;
  if (hydrated && dismissed) return null;

  const handleDismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, announcement.id);
    } catch {
      // ignore storage errors
    }
    setDismissed(true);
  };

  return (
    <div className="bg-foreground text-background">
      <div className="container mx-auto px-6 py-2 text-center relative font-mono text-xs">
        <Link
          href={announcement.href}
          className="inline-flex items-center gap-2 hover:underline"
        >
          <span className="font-semibold tracking-wider">
            {announcement.label}
          </span>
          <span aria-hidden="true">·</span>
          <span>{announcement.text}</span>
          <span aria-hidden="true">→</span>
        </Link>
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={handleDismiss}
          className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 inline-flex items-center justify-center opacity-70 hover:opacity-100"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </div>
  );
}

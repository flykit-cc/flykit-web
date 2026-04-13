"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  external?: boolean;
};

const LINKS: NavLink[] = [
  { href: "/#plugins", label: "Plugins" },
  { href: "/docs", label: "Docs" },
  { href: "https://github.com/flykit-cc/flykit", label: "GitHub", external: true },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Escape to close + focus trap
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  // Prevent body scroll + initial focus
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const first = panelRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      first?.focus();
      return () => {
        document.body.style.overflow = prev;
      };
    } else {
      // Return focus to trigger on close
      triggerRef.current?.focus();
    }
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex h-9 w-9 items-center justify-center border border-border text-foreground transition-colors hover:bg-muted"
      >
        {open ? <X size={16} aria-hidden /> : <Menu size={16} aria-hidden />}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur"
            onClick={close}
            aria-hidden
          />
          <div
            ref={panelRef}
            id="mobile-nav-panel"
            className="absolute right-0 top-0 flex h-full w-72 max-w-[85vw] flex-col border-l border-border bg-background"
          >
            <div className="flex h-14 items-center justify-between border-b border-border px-6">
              <span className="font-mono text-sm text-muted-foreground">
                Menu
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center border border-border text-foreground transition-colors hover:bg-muted"
              >
                <X size={16} aria-hidden />
              </button>
            </div>
            <nav className="flex flex-col p-2">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  {...(link.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="border-b border-border px-4 py-3 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

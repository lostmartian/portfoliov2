"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";

export interface PaletteItem {
  group: string;
  label: string;
  hint?: string;
  href?: string;
  action?: "copy-email" | "toggle-theme";
  external?: boolean;
}

/**
 * ⌘K / Ctrl+K: jump to any page, case study, post or video chapter, or run a
 * small action. Arrow keys to move, Enter to go, Esc to close.
 */
export default function CommandPalette({ items, email }: { items: PaletteItem[]; email: string }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [note, setNote] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      setQ("");
      setSel(0);
      setNote("");
      input.current?.focus();
    }, 0);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [open]);

  const results = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return items;
    return items.filter((it) => {
      const hay = `${it.label} ${it.group} ${it.hint ?? ""}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [q, items]);

  useEffect(() => {
    list.current?.querySelector(`[data-i="${sel}"]`)?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  const run = async (it: PaletteItem) => {
    if (it.action === "copy-email") {
      try {
        await navigator.clipboard.writeText(email);
        setNote("Email copied");
      } catch {
        window.location.assign(`mailto:${email}`);
      }
      return;
    }
    if (it.action === "toggle-theme") {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
      setOpen(false);
      return;
    }
    if (!it.href) return;
    setOpen(false);
    if (it.external) {
      window.open(it.href, "_blank", "noopener,noreferrer");
      return;
    }
    const nav = (window as unknown as { __navigate?: (h: string) => void }).__navigate;
    if (nav) nav(it.href);
    else window.location.assign(it.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(results.length - 1, s + 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(0, s - 1));
    }
    if (e.key === "Enter" && results[sel]) run(results[sel]);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[95] flex items-start justify-center px-4 pt-[14vh]" role="dialog" aria-modal="true" aria-label="Command palette">
      <button className="absolute inset-0 bg-foreground/30 backdrop-blur-[2px] cursor-default" onClick={() => setOpen(false)} aria-label="Close" />
      <div className="rise relative w-full max-w-xl bg-background border border-foreground/70 shadow-[0_30px_80px_-30px_rgba(40,20,10,0.5)]" onKeyDown={onKeyDown}>
        <div className="flex items-center gap-3 border-b border-border px-5">
          <span className="deva text-accent text-lg" aria-hidden="true">शोध</span>
          <input
            ref={input}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setSel(0);
            }}
            placeholder="Jump to a page, case study, post or chapter…"
            className="flex-1 h-14 bg-transparent outline-none text-[16px] placeholder:text-muted"
            aria-label="Search"
          />
          <kbd className="text-[11px] text-muted border border-border px-1.5 py-0.5">esc</kbd>
        </div>
        <ul ref={list} className="max-h-[52vh] overflow-y-auto py-2" data-lenis-prevent>
          {results.length === 0 && <li className="px-5 py-8 text-center text-muted">Nothing matches “{q}”.</li>}
          {results.map((it, i) => {
            const head = i === 0 || results[i - 1].group !== it.group ? it.group : null;
            return (
              <li key={it.group + it.label + i}>
                {head && <p className="label px-5 pt-4 pb-2">{head}</p>}
                <button
                  data-i={i}
                  onMouseMove={() => setSel(i)}
                  onClick={() => run(it)}
                  className={`w-full flex items-baseline justify-between gap-4 px-5 py-2.5 text-left cursor-pointer transition-colors ${i === sel ? "bg-accent text-accent-foreground" : ""}`}
                >
                  <span className="truncate">{it.label}</span>
                  <span className={`text-[12px] shrink-0 ${i === sel ? "opacity-80" : "text-muted"}`}>{it.hint ?? (it.external ? "↗" : "")}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-between border-t border-border px-5 py-2.5 text-[11px] text-muted">
          <span>↑ ↓ to move · enter to go</span>
          <span className="text-accent" aria-live="polite">{note}</span>
        </div>
      </div>
    </div>
  );
}

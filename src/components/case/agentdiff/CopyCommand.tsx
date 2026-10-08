"use client";

import { useState } from "react";

export default function CopyCommand({ cmd }: { cmd: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(cmd);
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        } catch {
          /* clipboard blocked: the command is visible to copy by hand */
        }
      }}
      className="group w-full flex items-center justify-between gap-4 border border-foreground/70 bg-card-bg px-5 py-4 text-left cursor-pointer hover:border-accent transition-colors"
      style={{ fontFamily: "var(--font-geist-mono)" }}
      aria-label={`Copy: ${cmd}`}
    >
      <span className="text-[15px] truncate"><span className="text-leaf">$</span> {cmd}</span>
      <span className={`text-[12px] shrink-0 ${done ? "text-leaf" : "text-muted group-hover:text-accent"}`} aria-live="polite">{done ? "copied" : "copy"}</span>
    </button>
  );
}

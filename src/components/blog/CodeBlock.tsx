"use client";

// A fenced code block: language label and a copy button above the highlighted code.

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({ language, raw, children }: { language?: string; raw: string; children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  const Icon = copied ? Check : Copy;

  return (
    <figure className="post-code not-prose my-8 overflow-hidden rounded-xl bg-surface ring-1 ring-line">
      <figcaption className="flex items-center justify-between border-b border-line px-4 py-2 text-[12px] text-muted">
        <span className="font-mono">{language ?? "text"}</span>
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(raw);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          }}
          className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 transition-colors hover:bg-fg/[0.06] hover:text-fg"
        >
          <Icon aria-hidden className="h-3.5 w-3.5" strokeWidth={1.75} />
          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
      </figcaption>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-[1.7]">{children}</pre>
    </figure>
  );
}

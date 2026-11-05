"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { EMAIL } from "@/lib/data";

/** Copies the email address. `withIcon` adds a copy glyph that turns into a check. */
export function CopyEmail({ className = "", withIcon = false }: { className?: string; withIcon?: boolean }) {
  const [copied, setCopied] = useState(false);
  const Icon = copied ? Check : Copy;

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(EMAIL);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }}
      className={className}
    >
      {withIcon && <Icon aria-hidden className="h-3.5 w-3.5" strokeWidth={1.75} />}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}

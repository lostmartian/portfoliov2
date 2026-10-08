"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-border-strong text-[13px] font-medium hover:border-foreground/30 transition-colors cursor-pointer"
      aria-live="polite"
    >
      <span className="relative h-3.5 w-3.5">
        <Copy className={`absolute inset-0 h-3.5 w-3.5 transition-all duration-300 ${copied ? "scale-50 opacity-0" : "scale-100 opacity-100"}`} />
        <Check className={`absolute inset-0 h-3.5 w-3.5 text-accent transition-all duration-300 ${copied ? "scale-100 opacity-100" : "scale-50 opacity-0"}`} />
      </span>
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}

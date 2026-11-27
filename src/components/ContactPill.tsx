"use client";

// The call to action: one solid pill split in two (black in light mode, white in dark).
// "Say hello" opens an email, and its arrow slides out and back in on hover. The copy icon
// copies the address, turns into a tick, and "Email copied" slides out beside the pill.

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Copy } from "lucide-react";
import { EMAIL } from "@/lib/data";

export function ContactPill() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="relative inline-flex items-center">
      <div className="inline-flex items-stretch overflow-hidden rounded-full bg-fg text-ink">
        <a
          href={`mailto:${EMAIL}?subject=Project%20enquiry`}
          className="group inline-flex items-center gap-2 py-2.5 pl-5 pr-4 text-[15px] font-medium outline-none transition-colors hover:bg-ink/[0.08] focus-visible:bg-ink/10"
        >
          Say hello
          <span aria-hidden className="relative h-4 w-4 overflow-hidden">
            <ArrowRight
              className="absolute inset-0 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-full"
              strokeWidth={1.75}
            />
            <ArrowRight
              className="absolute inset-0 h-4 w-4 -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"
              strokeWidth={1.75}
            />
          </span>
        </a>

        <span aria-hidden className="my-2.5 w-px bg-ink/20" />

        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Email copied" : "Copy email address"}
          className="inline-flex items-center px-3.5 outline-none transition-colors hover:bg-ink/[0.08] focus-visible:bg-ink/10"
        >
          {copied ? (
            <Check aria-hidden className="h-4 w-4" strokeWidth={2} />
          ) : (
            <Copy aria-hidden className="h-4 w-4" strokeWidth={1.75} />
          )}
        </button>
      </div>

      <span
        aria-live="polite"
        className={`pointer-events-none absolute left-full ml-3 whitespace-nowrap text-[14px] font-medium text-muted transition-all duration-300 ease-out ${
          copied ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
        }`}
      >
        {copied ? "Email copied" : ""}
      </span>
    </div>
  );
}

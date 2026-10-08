"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flourish group inline-flex items-center gap-2 h-12 pl-5 pr-6 rounded-full bg-foreground text-background text-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
    >
      <Printer className="w-4 h-4" />
      Print or save as PDF
    </button>
  );
}

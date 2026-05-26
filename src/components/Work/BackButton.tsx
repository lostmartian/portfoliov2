"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function BackButton({ 
  label = "Back", 
  fallback = "/work" 
}: { 
  label?: string; 
  fallback?: string 
}) {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="group inline-flex items-center gap-3 px-5 py-2 border border-foreground/10 rounded-full text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-all mb-20 font-mono text-[10px] uppercase tracking-[0.2em] bg-foreground/[0.02]"
    >
      <ChevronLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
      {label}
    </button>
  );
}

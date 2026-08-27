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
      className="group inline-flex items-center gap-2 px-5 py-2 border border-border rounded-full text-sm text-foreground/70 hover:text-accent hover:border-accent/40 transition-all mb-12 font-sans bg-transparent"
    >
      <ChevronLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
      {label}
    </button>
  );
}

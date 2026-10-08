"use client";

export default function OpenPalette({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <button onClick={() => window.dispatchEvent(new Event("open-palette"))} className={className}>
      {children}
    </button>
  );
}

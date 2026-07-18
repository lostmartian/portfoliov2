"use client";

const ITEMS = [
  "⚡ HIRE SAHIL GANGURDE",
  "🔥 OPEN FOR APPLIED AI & BACKEND ROLES",
  "🚀 GRAPHRAG ENGINES & CHATBOT ORCHESTRATION",
  "⚡ AGENTIC SYSTEMS & HIGH-THROUGHPUT ARCHITECTURES",
  "💡 2+ YEARS PRODUCTION-GRADE AI CODE",
  "🎯 RAG • GRAPHRAG • LLMs • GO • PYTHON",
];

// One full set repeated twice so the seam is invisible
const track = [...ITEMS, ...ITEMS];

export default function MarqueeBanner() {
  return (
    <div
      className="w-full overflow-hidden select-none border-b border-amber-600/30 z-[100]"
      style={{ background: "linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)" }}
    >
      {/* Outer wrapper clips overflow; inner div is twice the width and slides -50% */}
      <div
        className="flex whitespace-nowrap py-1.5"
        style={{
          width: "max-content",
          animation: "marquee-scroll 28s linear infinite",
          willChange: "transform",
        }}
      >
        {track.map((item, idx) => (
          <span
            key={idx}
            className="text-black font-bold uppercase tracking-widest text-[10px] px-4"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

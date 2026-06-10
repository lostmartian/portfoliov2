"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentTheme = resolvedTheme || theme || "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: currentTheme === "dark" ? "dark" : "neutral",
      securityLevel: "loose",
      fontFamily: "var(--font-mono)",
      themeVariables: {
        lineColor: currentTheme === "dark" ? "#ffffff20" : "#00000080",
        primaryColor: currentTheme === "dark" ? "#ffffff" : "#000000",
      }
    });

    if (ref.current) {
      const renderChart = async () => {
        try {
          const { svg } = await mermaid.render(`mermaid-${Math.random().toString(36).substr(2, 9)}`, chart);
          if (ref.current) ref.current.innerHTML = svg;
        } catch (error) {
          console.error("Mermaid render error:", error);
        }
      };
      renderChart();
    }
  }, [chart, currentTheme, mounted]);

  if (!mounted) {
    return <div className="py-12 bg-foreground/[0.02] border border-border/20 my-8 animate-pulse flex items-center justify-center text-[10px] font-mono text-foreground/20">LOADING_DIAGRAM...</div>;
  }

  return <div ref={ref} className="mermaid-chart flex justify-start md:justify-center pl-6 pr-6 w-full max-w-full overflow-x-auto py-12 bg-foreground/[0.02] border border-border/20 my-8" />;
}

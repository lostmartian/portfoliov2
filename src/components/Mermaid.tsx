"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";
import { Maximize2, Download, X } from "lucide-react";

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const currentTheme = resolvedTheme || theme || "dark";

  // Parse caption from code comments (e.g. %% caption: Text)
  const captionMatch = chart.match(/^%%\s*caption:\s*(.+)$/m);
  const caption = captionMatch ? captionMatch[1].trim() : null;
  const cleanChart = captionMatch 
    ? chart.replace(/^%%\s*caption:\s*.+$\n?/m, "") 
    : chart;

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
        lineColor: currentTheme === "dark" ? "#71717a" : "#3f3f46",
        primaryColor: currentTheme === "dark" ? "#1a2028" : "#eff3f7",
        primaryBorderColor: currentTheme === "dark" ? "#3f3f46" : "#d4d4d8",
        primaryTextColor: currentTheme === "dark" ? "#ececec" : "#18181b",
        secondaryColor: currentTheme === "dark" ? "#131316" : "#fafafa",
        tertiaryColor: currentTheme === "dark" ? "#0c0c0d" : "#ffffff",
        background: currentTheme === "dark" ? "#131316" : "#fafafa",
        mainBkg: currentTheme === "dark" ? "#1a2028" : "#eff3f7",
        nodeBorder: currentTheme === "dark" ? "#4a5665" : "#8fa8c4",
        clusterBkg: currentTheme === "dark" ? "#131316" : "#f4f4f5",
        edgeLabelBackground: currentTheme === "dark" ? "#131316" : "#ffffff",
      }
    });

    if (ref.current) {
      const renderChart = async () => {
        try {
          const chartId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await mermaid.render(chartId, cleanChart);
          if (ref.current) ref.current.innerHTML = svg;
        } catch (error) {
          console.error("Mermaid render error:", error);
        }
      };
      renderChart();
    }
  }, [cleanChart, currentTheme, mounted]);

  const handleDownload = () => {
    if (!ref.current) return;
    const svgElement = ref.current.querySelector("svg");
    if (!svgElement) return;

    const svgString = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = `diagram-${Date.now()}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
  };

  if (!mounted) {
    return (
      <div className="py-12 bg-card-bg border border-border my-8 animate-pulse flex items-center justify-center text-xs text-foreground/40 rounded-lg">
        LOADING_DIAGRAM...
      </div>
    );
  }

  return (
    <div className="relative group my-8 border border-border bg-card-bg rounded-xl overflow-hidden w-full max-w-full shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      {/* Overlay Toolbar */}
      <div className="absolute right-3 top-3 z-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background border border-border p-1.5 rounded-lg shadow-sm">
        <button
          onClick={() => setIsFullscreen(true)}
          className="p-1.5 hover:bg-accent-subtle rounded-md text-foreground/60 hover:text-accent cursor-pointer transition-colors"
          title="View Fullscreen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleDownload}
          className="p-1.5 hover:bg-accent-subtle rounded-md text-foreground/60 hover:text-accent cursor-pointer transition-colors"
          title="Download SVG"
        >
          <Download className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Diagram container */}
      <div 
        ref={ref} 
        className="mermaid-chart flex justify-start md:justify-center pl-6 pr-6 w-full max-w-full overflow-x-auto py-12" 
      />

      {/* Caption block */}
      {caption && (
        <div className="text-center text-sm text-foreground/60 pb-4 px-6 border-t border-border pt-3">
          {caption}
        </div>
      )}

      {/* Fullscreen Modal Overlay */}
      {isFullscreen && (
        <div 
          onClick={() => setIsFullscreen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background p-4 sm:p-8 animate-in fade-in duration-200 cursor-zoom-out"
        >
          {/* Modal Body Container with scroll/fit */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl h-[85vh] flex items-center justify-center overflow-auto p-4 bg-card-bg border border-border rounded-xl relative cursor-default"
          >
            {/* Floating Actions inside the view itself */}
            <div className="absolute right-4 top-4 z-10 flex items-center gap-1 bg-background border border-border p-1.5 rounded-lg shadow-md">
              <button
                onClick={handleDownload}
                className="p-1.5 hover:bg-accent-subtle rounded-md text-foreground/60 hover:text-accent cursor-pointer transition-colors"
                title="Download SVG"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-1.5 hover:bg-accent-subtle rounded-md text-foreground/60 hover:text-accent cursor-pointer transition-colors"
                title="Close Fullscreen"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div 
              className="w-full max-w-full max-h-[75vh] flex justify-center overflow-auto"
              dangerouslySetInnerHTML={{ __html: ref.current?.innerHTML || "" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

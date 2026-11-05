"use client";

// Renders a ```mermaid block in the browser with mermaid's own themes ("default" on light,
// "dark" on dark), redrawn when the site theme changes. The source shows until it's ready.

import { useEffect, useId, useState } from "react";

export function Mermaid({ chart }: { chart: string }) {
  const id = `m${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const [svg, setSvg] = useState("");

  useEffect(() => {
    let alive = true;
    const draw = async () => {
      const mermaid = (await import("mermaid")).default;
      const dark = document.documentElement.getAttribute("data-theme") === "dark";
      mermaid.initialize({
        startOnLoad: false,
        theme: dark ? "dark" : "default",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        flowchart: { wrappingWidth: 320 },
      });
      const { svg } = await mermaid.render(`${id}-${Date.now()}`, chart);
      if (alive) setSvg(svg);
    };
    draw().catch(() => {});
    const observer = new MutationObserver(() => draw().catch(() => {}));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      alive = false;
      observer.disconnect();
    };
  }, [chart, id]);

  return (
    <figure className="my-10 overflow-x-auto">
      {svg ? (
        <div className="mx-auto w-fit [&_svg]:h-auto [&_svg]:max-w-full" dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <pre className="font-mono text-[13px] leading-[1.7] text-muted">{chart}</pre>
      )}
    </figure>
  );
}

// Shared Open Graph card for every route: the site's off-white page with its soft top-left
// fade, the name top-left, a small page label top-right, a large title (the grey part is the
// second half, as on the pages), and a hairline over a one-line summary and the domain.

import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Fonts don't depend on the request, so they're read once at module scope.
const font = (weight: 400 | 500 | 600) =>
  fs.readFileSync(path.join(process.cwd(), `node_modules/@fontsource/inter/files/inter-latin-${weight}-normal.woff`));
const fonts = [
  { name: "Inter", data: font(400), weight: 400 as const, style: "normal" as const },
  { name: "Inter", data: font(500), weight: 500 as const, style: "normal" as const },
  { name: "Inter", data: font(600), weight: 600 as const, style: "normal" as const },
];

const ink = "#fdfdfc";
const fg = "#0c0c0d";
const muted = "#66666d";
const line = "#e8e8e5";

export function ogCard({
  label,
  title,
  rest,
  summary,
}: {
  /** small label, top right: "Case study", "Blog · Fintech" */
  label: string;
  /** the dark part of the title */
  title: string;
  /** the grey part that follows it, if any */
  rest?: string;
  /** one line under the hairline */
  summary?: string;
}) {
  const long = title.length + (rest?.length ?? 0) > 70;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "64px 72px 56px",
          background: `radial-gradient(80% 70% at 8% 0%, #f2f2f0 0%, ${ink} 70%)`,
          fontFamily: "Inter",
          color: fg,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26 }}>
          <span style={{ fontWeight: 600, letterSpacing: "-0.02em" }}>Sahil Gangurde</span>
          <span style={{ color: muted, fontWeight: 500, fontSize: 24 }}>{label}</span>
        </div>

        <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
          {/* word by word in a wrapping row, so the grey half flows on after the dark half */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              maxWidth: 1000,
              fontSize: long ? 64 : 80,
              fontWeight: 500,
              lineHeight: 1.06,
              letterSpacing: "-0.045em",
              columnGap: "0.24em",
            }}
          >
            {[
              ...title.split(" ").map((w, i) => ({ w, grey: false, k: `t${i}` })),
              ...(rest ?? "").split(" ").filter(Boolean).map((w, i) => ({ w, grey: true, k: `r${i}` })),
            ].map(({ w, grey, k }) => (
              <span key={k} style={{ color: grey ? "#9a9a9f" : fg }}>
                {w}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 40,
            borderTop: `1px solid ${line}`,
            paddingTop: 26,
            fontSize: 24,
            color: muted,
          }}
        >
          <span style={{ display: "block", flex: 1, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
            {summary ?? "Backend and AI engineer in Pune"}
          </span>
          <span style={{ color: fg, fontWeight: 500 }}>lostmartian.in</span>
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}

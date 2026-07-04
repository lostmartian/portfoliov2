import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0b0c10",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          fontFamily: "sans-serif",
          color: "#c5c6c7",
          position: "relative",
        }}
      >
        {/* Dot Matrix background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(197, 198, 199, 0.1) 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
            opacity: 0.8,
          }}
        />

        {/* Top Header metadata */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#c5c6c7",
              }}
            />
            <span style={{ fontSize: "14px", fontFamily: "monospace", letterSpacing: "0.15em", fontWeight: "bold" }}>
              SAHIL GANGURDE // WRITING &amp; LOGS
            </span>
          </div>
          <span style={{ fontSize: "14px", fontFamily: "monospace", opacity: 0.5 }}>
            EDITORIAL_ARCHIVE
          </span>
        </div>

        {/* Main Header / Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", zIndex: 10, maxWidth: "900px", margin: "auto 0" }}>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 500,
              lineHeight: 1.15,
              margin: 0,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            Technical Writings &amp;<br />
            Engineering Insights.
          </h1>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.6,
              margin: 0,
              opacity: 0.8,
              maxWidth: "800px",
            }}
          >
            Deep dives into software architecture, high-performance database indexing, GraphRAG engines, and machine learning structures.
          </p>
        </div>

        {/* Footer Meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
            borderTop: "1px solid rgba(197, 198, 199, 0.1)",
            paddingTop: "30px",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", gap: "40px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <span style={{ fontSize: "11px", fontFamily: "monospace", opacity: 0.4 }}>CATEGORIES</span>
              <span style={{ fontSize: "15px", fontWeight: "bold" }}>AI / BACKEND / SYSTEM DESIGN</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <span style={{ fontSize: "11px", fontFamily: "monospace", opacity: 0.4 }}>AUTHOR</span>
              <span style={{ fontSize: "15px", fontWeight: "bold" }}>SAHIL GANGURDE</span>
            </div>
          </div>
          <span style={{ fontSize: "14px", fontFamily: "monospace", opacity: 0.5 }}>
            github.com/lostmartian
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

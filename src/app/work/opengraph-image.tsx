import { ImageResponse } from "next/og";
import { join } from "path";
import { readFileSync } from "fs";

export const dynamic = "force-static";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const photoPath = join(process.cwd(), "public/me/profile-photo.png");
  const photoData = readFileSync(photoPath);
  const photoBuffer = photoData.buffer.slice(
    photoData.byteOffset,
    photoData.byteOffset + photoData.byteLength
  );

  return new ImageResponse(
    (
      <div
        style={{
          background: "#121212",
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          color: "#e0e0e0",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* Left Column: Text Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "510px",
            width: "600px",
          }}
        >
          {/* Top Header metadata */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ fontSize: "14px", fontFamily: "monospace", letterSpacing: "0.15em", fontWeight: "bold", color: "#e0e0e0" }}>
              SAHIL GANGURDE // WORK
            </span>
            <span style={{ fontSize: "12px", fontFamily: "monospace", opacity: 0.4 }}>
              lostmartian.in/work
            </span>
          </div>

          {/* Main Title & Description */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", margin: "auto 0" }}>
            <h1
              style={{
                fontSize: "52px",
                fontWeight: 700,
                lineHeight: 1.15,
                margin: 0,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>Professional Work &amp;</span>
              <span>System Integrations.</span>
            </h1>
            <p
              style={{
                fontSize: "18px",
                lineHeight: 1.5,
                margin: 0,
                opacity: 0.6,
                maxWidth: "600px",
              }}
            >
              A registry of production-grade software integrations built for enterprise scale, including seed-deterministic engines and cloud pipelines.
            </p>
          </div>

          {/* Footer Metadata Grid */}
          <div
            style={{
              display: "flex",
              borderTop: "1px solid rgba(224, 224, 224, 0.1)",
              paddingTop: "20px",
              gap: "30px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "9px", fontFamily: "monospace", opacity: 0.4 }}>FOCUS LAYER</span>
              <span style={{ fontSize: "12px", fontWeight: "bold" }}>SYSTEM ARCHITECTURES</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "9px", fontFamily: "monospace", opacity: 0.4 }}>STATUS</span>
              <span style={{ fontSize: "12px", fontWeight: "bold" }}>PRODUCTION GRADE</span>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Photo (Absolute Positioned) */}
        <div
          style={{
            position: "absolute",
            right: "80px",
            top: "135px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "360px",
            height: "360px",
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid rgba(224, 224, 224, 0.15)",
            background: "#161616",
          }}
        >
          {/* @ts-ignore */}
          <img
            src={photoBuffer as any}
            alt="Sahil Gangurde"
            style={{
              width: "360px",
              height: "360px",
              borderRadius: "20px",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

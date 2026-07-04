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
          padding: "80px",
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
              SAHIL GANGURDE // CONTACT ARCHIVE
            </span>
          </div>
          <span style={{ fontSize: "14px", fontFamily: "monospace", opacity: 0.5 }}>
            COMMUNICATION_LINK
          </span>
        </div>

        {/* Main Header / Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "25px", zIndex: 10, maxWidth: "900px", margin: "auto 0" }}>
          <h1
            style={{
              fontSize: "72px",
              fontWeight: 500,
              lineHeight: 1.1,
              margin: 0,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            Get in Touch.
          </h1>
          <p
            style={{
              fontSize: "22px",
              lineHeight: 1.6,
              margin: 0,
              opacity: 0.8,
              maxWidth: "800px",
            }}
          >
            Looking to collaborate on robust backend systems, distributed architectures, or advanced AI model integration? Let's build together.
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
              <span style={{ fontSize: "11px", fontFamily: "monospace", opacity: 0.4 }}>EMAIL</span>
              <span style={{ fontSize: "15px", fontWeight: "bold" }}>sahilgangurde08@gmail.com</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <span style={{ fontSize: "11px", fontFamily: "monospace", opacity: 0.4 }}>RESPONSE LATENCY</span>
              <span style={{ fontSize: "15px", fontWeight: "bold" }}>&lt; 24 HOURS</span>
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

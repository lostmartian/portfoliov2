import { ImageResponse } from "next/og";

// Written to a file at build time; the site is a static export.
export const dynamic = "force-static";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// A plain monogram: a near-black rounded square with a white "S".
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0c0d",
          color: "#fdfdfc",
          borderRadius: 14,
          fontSize: 44,
          fontWeight: 600,
          letterSpacing: "-0.04em",
        }}
      >
        S
      </div>
    ),
    size,
  );
}

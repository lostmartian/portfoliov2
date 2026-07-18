import { ImageResponse } from "next/og";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blogs";
import { join } from "path";
import { readFileSync } from "fs";

export const dynamic = "force-static";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return new ImageResponse(
      (
        <div style={{ background: "#121212", width: "1200px", height: "630px", display: "flex", alignItems: "center", justifyContent: "center", color: "#e0e0e0" }}>
          Article Not Found
        </div>
      ),
      { ...size }
    );
  }

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
              SAHIL GANGURDE // BLOG ARCHIVE
            </span>
            <span style={{ fontSize: "12px", fontFamily: "monospace", opacity: 0.4 }}>
              {post.date}
            </span>
          </div>

          {/* Main Title & Description */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", margin: "auto 0" }}>
            <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#e0e0e0", opacity: 0.5, letterSpacing: "0.2em" }}>
              {post.categories.join(", ").toUpperCase()}
            </span>
            <h1
              style={{
                fontSize: "44px",
                fontWeight: 700,
                lineHeight: 1.2,
                margin: 0,
                color: "#ffffff",
                letterSpacing: "-0.02em",
              }}
            >
              {post.title}
            </h1>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.5,
                margin: 0,
                opacity: 0.6,
                maxWidth: "600px",
              }}
            >
              {post.description}
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
              <span style={{ fontSize: "9px", fontFamily: "monospace", opacity: 0.4 }}>READ TIME</span>
              <span style={{ fontSize: "12px", fontWeight: "bold" }}>{post.readTime}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "9px", fontFamily: "monospace", opacity: 0.4 }}>WRITTEN BY</span>
              <span style={{ fontSize: "12px", fontWeight: "bold" }}>SAHIL GANGURDE</span>
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

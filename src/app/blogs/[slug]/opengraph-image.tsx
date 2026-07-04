import { ImageResponse } from "next/og";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blogs";

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
        <div style={{ background: "#0b0c10", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#c5c6c7" }}>
          Article Not Found
        </div>
      ),
      { ...size }
    );
  }

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
              SAHIL GANGURDE // BLOG ARCHIVE
            </span>
          </div>
          <span style={{ fontSize: "14px", fontFamily: "monospace", opacity: 0.5 }}>
            {post.date}
          </span>
        </div>

        {/* Main Header / Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", zIndex: 10, maxWidth: "900px", margin: "auto 0" }}>
          <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#ffffff", opacity: 0.5, letterSpacing: "0.2em" }}>
            {post.categories.join(", ").toUpperCase()}
          </span>
          <h1
            style={{
              fontSize: "50px",
              fontWeight: 500,
              lineHeight: 1.15,
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
              lineHeight: 1.6,
              margin: 0,
              opacity: 0.75,
              maxWidth: "800px",
            }}
          >
            {post.description}
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
              <span style={{ fontSize: "11px", fontFamily: "monospace", opacity: 0.4 }}>READ TIME</span>
              <span style={{ fontSize: "15px", fontWeight: "bold" }}>{post.readTime}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <span style={{ fontSize: "11px", fontFamily: "monospace", opacity: 0.4 }}>WRITTEN BY</span>
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

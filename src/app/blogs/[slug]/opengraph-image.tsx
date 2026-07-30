import { ImageResponse } from "next/og";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blogs";
import { join } from "path";
import { readFileSync } from "fs";
import { getFluidGradientData } from "@/lib/blog-gradients";

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

  let imgSrc: any = photoBuffer;
  if (post.headerImage) {
    if (post.headerImage.startsWith("/")) {
      try {
        let localPath = post.headerImage;
        if (localPath.endsWith(".webp")) {
          localPath = localPath.substring(0, localPath.lastIndexOf(".")) + ".png";
        }
        const imagePath = join(process.cwd(), "public", localPath);
        const imageData = readFileSync(imagePath);
        imgSrc = imageData.buffer.slice(
          imageData.byteOffset,
          imageData.byteOffset + imageData.byteLength
        );
      } catch (err) {
        console.error("Failed to load local header image for OG generation", err);
      }
    } else {
      imgSrc = post.headerImage;
    }
  }

  const data = getFluidGradientData(post.title);


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

        {/* Right Column: Dynamic Image or Gradient */}
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
          {post.headerImage ? (
            /* @ts-ignore */
            <img
              src={imgSrc}
              alt={post.title}
              style={{
                width: "360px",
                height: "360px",
                borderRadius: "20px",
                objectFit: "cover",
              }}
            />
          ) : (
            <svg
              viewBox="0 0 360 360"
              style={{
                width: "360px",
                height: "360px",
                display: "flex",
              }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="og-base-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={data.baseColor} />
                  <stop offset="100%" stopColor={data.linearGradientEnd} />
                </linearGradient>
                {data.blobs.map((blob) => (
                  <radialGradient
                    key={blob.id}
                    id={`og-${blob.id}`}
                    cx={blob.cx}
                    cy={blob.cy}
                    r={blob.r}
                    fx={blob.fx}
                    fy={blob.fy}
                    gradientTransform={blob.transform}
                  >
                    <stop offset="0%" stopColor={blob.color} stopOpacity="0.85" />
                    <stop offset="100%" stopColor={blob.color} stopOpacity="0" />
                  </radialGradient>
                ))}
              </defs>

              {/* Base Background Solid/Linear */}
              <rect width="100%" height="100%" fill="url(#og-base-bg)" rx="20" ry="20" />

              {/* Layered radial blobs */}
              {data.blobs.map((blob) => (
                <rect key={blob.id} width="100%" height="100%" fill={`url(#og-${blob.id})`} rx="20" ry="20" />
              ))}
            </svg>
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

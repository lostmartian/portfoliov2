import type { Metadata } from "next";
import { getYouTubeData } from "@/lib/youtube";
import VideoListItem from "@/components/VideoListItem";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Technical Essays in Video | Sahil Gangurde (@sahilgangurdetech)",
  description:
    "First-principles systems engineering breakdowns by Sahil Gangurde (lostmartian). Deep dives into Attention mechanisms, GPU memory bandwidth, and high-throughput architectures.",
  keywords: [
    "Sahil Gangurde",
    "sahilgangurdetech",
    "Sahil Gangurde YouTube",
    "Sahil Gangurde Tech",
    "Attention Is All You Need systems breakdown",
    "GPU memory bandwidth transformer",
    "Transformer attention mechanism linear algebra",
    "FlashAttention and KV cache systems",
    "AI engineer YouTube",
    "AgentDiff trajectory testing",
    "lostmartian"
  ],
  alternates: {
    canonical: "https://lostmartian.in/videos",
  },
  openGraph: {
    title: "Technical Essays in Video | Sahil Gangurde (@sahilgangurdetech)",
    description:
      "First-principles systems engineering breakdowns of Attention mechanisms, GPU memory limits, and hardware bottlenecks by Sahil Gangurde.",
    url: "https://lostmartian.in/videos",
    siteName: "Sahil Gangurde | lostmartian",
    locale: "en_US",
    type: "video.other",
    videos: [
      {
        url: "https://www.youtube.com/embed/kBvLpoYivDs",
        secureUrl: "https://www.youtube.com/embed/kBvLpoYivDs",
        type: "text/html",
        width: 1280,
        height: 720,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Essays in Video | Sahil Gangurde",
    description:
      "First-principles systems engineering breakdowns of Attention mechanisms and GPU systems by Sahil Gangurde (@sahilgangurdetech).",
    creator: "@lost_martian_",
    site: "@lost_martian_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function VideosPage() {
  const data = getYouTubeData();
  const videos = data.videos || [];

  const attentionClips = [
    {
      "@type": "Clip",
      name: "Recurrent architectures failure & parallel matrix ops",
      startOffset: 0,
      url: "https://www.youtube.com/watch?v=kBvLpoYivDs&t=0s",
    },
    {
      "@type": "Clip",
      name: "Tokenization, embeddings, and sinusoidal positional encodings",
      startOffset: 586,
      url: "https://www.youtube.com/watch?v=kBvLpoYivDs&t=586s",
    },
    {
      "@type": "Clip",
      name: "Query, Key, and Value: search intent decoupling",
      startOffset: 1223,
      url: "https://www.youtube.com/watch?v=kBvLpoYivDs&t=1223s",
    },
    {
      "@type": "Clip",
      name: "Variance scaling & softmax gradient preservation",
      startOffset: 1610,
      url: "https://www.youtube.com/watch?v=kBvLpoYivDs&t=1610s",
    },
    {
      "@type": "Clip",
      name: "Multi-Head parallel representation subspaces",
      startOffset: 2355,
      url: "https://www.youtube.com/watch?v=kBvLpoYivDs&t=2355s",
    },
    {
      "@type": "Clip",
      name: "Causal masking for autoregressive token generation",
      startOffset: 2721,
      url: "https://www.youtube.com/watch?v=kBvLpoYivDs&t=2721s",
    },
    {
      "@type": "Clip",
      name: "Hardware limits: O(N²) scaling, memory bandwidth, and KV Cache",
      startOffset: 2972,
      url: "https://www.youtube.com/watch?v=kBvLpoYivDs&t=2972s",
    },
  ];

  const videoSchemaList = videos.map((video) => ({
    "@type": "VideoObject",
    name: video.title,
    description: video.description.slice(0, 400),
    thumbnailUrl: [
      video.thumbnailUrl,
      `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
    ],
    uploadDate: video.publishedAt,
    contentUrl: video.url,
    embedUrl: video.embedUrl,
    inLanguage: "en",
    genre: "Computer Science, Systems Engineering, Artificial Intelligence",
    hasPart: video.id === "kBvLpoYivDs" ? attentionClips : undefined,
    author: {
      "@type": "Person",
      "@id": "https://lostmartian.in/#person",
      name: "Sahil Gangurde",
      url: "https://lostmartian.in",
    },
    publisher: {
      "@type": "Person",
      "@id": "https://lostmartian.in/#person",
      name: "Sahil Gangurde",
    },
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://lostmartian.in/videos#collection",
        url: "https://lostmartian.in/videos",
        name: "Technical Essays in Video | Sahil Gangurde",
        description: data.channel.description,
        isPartOf: {
          "@id": "https://lostmartian.in/#website",
        },
        about: {
          "@id": "https://lostmartian.in/#person",
        },
        hasPart: videoSchemaList,
      },
      ...videoSchemaList,
    ],
  };

  return (
    <main className="space-y-8 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="space-y-1">
        <h1 className="text-[1.75rem] sm:text-[2.4rem] font-bold tracking-tight leading-tight text-foreground">
          Technical essays in video.
        </h1>
        <p className="text-[15px] text-foreground/75 leading-relaxed">
          First-principles engineering breakdowns of deep learning architectures, GPU execution limits, and systems craft on{" "}
          <a
            href="https://www.youtube.com/@sahilgangurdetech"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent/90 underline decoration-accent/30 underline-offset-4 hover:text-accent hover:decoration-accent transition-colors"
          >
            @sahilgangurdetech ↗
          </a>.
        </p>
      </header>

      {/* Single tidy list matching /work and /blogs aesthetic */}
      <div className="divide-y divide-border/60 border-y border-border/60">
        {videos.map((video, index) => (
          <VideoListItem
            key={video.id}
            video={video}
            index={index}
            defaultOpen={false}
          />
        ))}
      </div>

      {/* Channel & Backlink Meta Row */}
      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-foreground/60 border-t border-border/40">
        <div>
          Subscribe to{" "}
          <a
            href="https://www.youtube.com/@sahilgangurdetech?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground hover:text-accent transition-colors underline decoration-foreground/20 underline-offset-4"
          >
            Sahil Gangurde Tech (@sahilgangurdetech) ↗
          </a>{" "}
          for upcoming deep dives into FlashAttention and KV Caching.
        </div>
        <a
          href="https://www.youtube.com/@sahilgangurdetech?sub_confirmation=1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline font-medium shrink-0"
        >
          Subscribe on YouTube ↗
        </a>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { getYouTubeData } from "@/lib/youtube";
import EpisodePlayer from "@/components/video/EpisodePlayer";
import ComingUp from "@/components/video/ComingUp";
import { VIDEO_CHAPTERS } from "@/data/video-chapters";
import PageHeader, { PageBody } from "@/components/ui/PageHeader";

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
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader mr="चलचित्र" label="Videos" title={<>Technical essays <span className="serif text-accent">in video.</span></>}>
        First-principles breakdowns of deep learning architectures, GPU execution limits, and systems craft on{" "}
        <a
          href="https://www.youtube.com/@sahilgangurdetech"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent transition-colors"
        >
          @sahilgangurdetech ↗
        </a>.
      </PageHeader>

      <PageBody>
        {videos[0] && (
          <EpisodePlayer video={videos[0]} chapters={VIDEO_CHAPTERS[videos[0].id]} episode={videos.length} variant="page" />
        )}

        {videos.length > 1 && (
          <section className="pt-16">
            <p className="label mb-8">Earlier episodes</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
              {videos.slice(1).map((v, i) => (
                <a key={v.id} href={v.url} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="border border-border p-1.5 transition-colors duration-500 group-hover:border-accent">
                    <div className="relative aspect-video overflow-hidden bg-foreground">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={v.thumbnailUrl} alt="" className="photo absolute inset-0 w-full h-full object-cover" />
                    </div>
                  </div>
                  <p className="label mt-5">Episode {String(videos.length - 1 - i).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-3xl leading-tight group-hover:text-accent transition-colors">{v.title}</h3>
                </a>
              ))}
            </div>
          </section>
        )}

        <div className="pt-16">
          <ComingUp channel={data.channel} />
        </div>
      </PageBody>
    </div>
  );
}

// Chapter timestamps per YouTube video id. Add an entry when a new video has chapters.
export interface Chapter {
  time: string;
  seconds: number;
  title: string;
}

export const VIDEO_CHAPTERS: Record<string, Chapter[]> = {
  kBvLpoYivDs: [
    { time: "0:00", seconds: 0, title: "Why recurrent architectures failed, and parallel matrix ops" },
    { time: "9:46", seconds: 586, title: "Tokenization, embeddings and sinusoidal positional encodings" },
    { time: "20:23", seconds: 1223, title: "Query, Key and Value: decoupling search intent" },
    { time: "26:50", seconds: 1610, title: "Variance scaling and softmax gradient preservation" },
    { time: "39:15", seconds: 2355, title: "Multi-head parallel representation subspaces" },
    { time: "45:21", seconds: 2721, title: "Causal masking for autoregressive generation" },
    { time: "49:32", seconds: 2972, title: "Hardware limits: O(N²), memory bandwidth and the KV cache" },
  ],
};

// Topics announced as upcoming in the channel's own video descriptions.
export const UPCOMING_TOPICS = ["FlashAttention", "KV caching", "Systems-level LLM optimisation"];

// Optional sharp thumbnails, by video id. YouTube only serves an HD thumbnail when the upload
// has one, so drop a 1280×720 image in /public/videos and point to it here, e.g.
//   kBvLpoYivDs: "/videos/attention.jpg",
export const VIDEO_THUMBNAILS: Record<string, string> = {};

import youtubeData from "@/data/youtube-videos.json";

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  url: string;
  embedUrl: string;
  thumbnailUrl: string;
  views: number;
  tags: string[];
  featured?: boolean;
}

export interface YouTubeChannel {
  id: string;
  name: string;
  handle: string;
  url: string;
  subscribeUrl: string;
  description: string;
  bannerTagline: string;
  lastSynced: string;
  videoCount: number;
}

export interface YouTubeDataset {
  channel: YouTubeChannel;
  videos: YouTubeVideo[];
}

// Only show videos uploaded from October 6, 2026 onwards
export const MIN_UPLOAD_DATE = new Date("2026-10-06T00:00:00Z");

export function getYouTubeData(): YouTubeDataset {
  const data = youtubeData as YouTubeDataset;
  const filteredVideos = (data.videos || []).filter((v) => {
    const uploadDate = new Date(v.publishedAt);
    return uploadDate >= MIN_UPLOAD_DATE;
  });

  return {
    ...data,
    channel: {
      ...data.channel,
      videoCount: filteredVideos.length,
    },
    videos: filteredVideos,
  };
}

export function getLatestVideos(limit = 3): YouTubeVideo[] {
  const data = getYouTubeData();
  return data.videos.slice(0, limit);
}

export function getVideoById(id: string): YouTubeVideo | undefined {
  const data = getYouTubeData();
  return data.videos.find((v) => v.id === id);
}

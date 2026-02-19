'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

export default function YouTubeClient({ id, caption }: { id: string; caption?: string }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const thumbnailUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

    return (
        <figure className="my-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[var(--glass-border)] bg-black/20">
                {!isPlaying ? (
                    <div className="relative h-full w-full cursor-pointer group" onClick={() => setIsPlaying(true)}>
                        <Image
                            src={thumbnailUrl}
                            alt="YouTube Thumbnail"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-16 w-16 bg-[var(--neon-cyan)]/90 rounded-full flex items-center justify-center text-black shadow-lg shadow-[var(--neon-cyan)]/20 transition-transform group-hover:scale-110">
                                <Play fill="currentColor" size={32} className="ml-1" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                    ></iframe>
                )}
            </div>
            {caption && (
                <figcaption className="mt-2 text-center text-sm text-[var(--text-muted)] italic">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}

'use client';

import Link from 'next/link';
import { Calendar, Clock, Tag } from 'lucide-react';
import { BlogPost } from '@/lib/blog';
import { format } from 'date-fns';

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <Link href={`/blogs/${post.slug}`} className="block group">
            <article className="relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-center">
                    <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs font-medium text-[var(--neon-cyan)]"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold font-elegant text-[var(--text-primary)] mb-3 group-hover:text-[var(--neon-cyan)] transition-colors">
                            {post.title}
                        </h2>

                        <p className="text-[var(--text-secondary)] mb-4 line-clamp-2">
                            {post.description}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                            <div className="flex items-center gap-1.5">
                                <Calendar size={14} />
                                <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock size={14} />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-[var(--glass-border)] text-[var(--text-muted)] group-hover:border-[var(--neon-cyan)] group-hover:text-[var(--neon-cyan)] transition-colors opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 duration-300">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </article>
        </Link>
    );
}

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { BlogPost } from '@/lib/blog';

export default function BlogCard({ post }: { post: BlogPost }) {
    const formattedDate = format(new Date(post.date), 'MMM dd, yyyy');

    return (
        <Link href={`/blog/${post.slug}`} className="group block">
            <div className="relative flex flex-col md:flex-row gap-8 p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-card)] overflow-hidden transition-all duration-500 hover:border-[var(--neon-purple)] hover:shadow-2xl hover:shadow-[var(--neon-purple)]/10 hover:-translate-y-1">
                {/* Image Section */}
                <div className="relative aspect-[16/9] md:aspect-square w-full md:w-48 flex-shrink-0 overflow-hidden rounded-xl">
                    {post.image ? (
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-purple)]/20 to-[var(--neon-cyan)]/20 flex items-center justify-center">
                            <div className="text-[var(--neon-purple)] opacity-50">
                                <Tag size={32} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)] mb-3">
                        <span className="px-2 py-0.5 rounded bg-[var(--neon-purple)]/10 text-[var(--neon-purple)] border border-[var(--neon-purple)]/20">
                            {post.category}
                        </span>
                        <div className="flex items-center gap-1">
                            <Calendar size={12} className="text-[var(--neon-purple)]" />
                            {formattedDate}
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock size={12} className="text-[var(--neon-purple)]" />
                            5 min read
                        </div>
                    </div>

                    <h3 className="h4 font-elegant text-[var(--text-primary)] mb-2 group-hover:text-[var(--neon-purple)] transition-colors line-clamp-2">
                        {post.title}
                    </h3>

                    <p className="text-body-small text-[var(--text-muted)] mb-4 line-clamp-2 max-w-2xl">
                        {post.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                        <div className="flex flex-wrap gap-3">
                            {post.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center gap-1 text-[var(--neon-purple)] font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                            Read More <ArrowRight size={14} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

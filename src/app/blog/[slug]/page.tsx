import React from 'react';
import { getBlogPostBySlug, getBlogSlugs, getBlogPostBySlug as getPost } from '@/lib/blog';
import { serialize } from 'next-mdx-remote/serialize';
import MDXContent from '@/components/MDXContent'; // I will update this or create a new one
import BlogComponents from '@/components/blog/MDXComponents';
import PageHero from '@/components/PageHero';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Clock, Tag, ChevronLeft } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css';

export async function generateStaticParams() {
    const slugs = await getBlogSlugs();
    return slugs.map(slug => ({
        slug: slug.replace(/\.mdx$/, ''),
    }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    // Get the "Read Before" and "Read After" posts details if slugs are provided
    const readBeforePost = post.readBefore ? await getPost(post.readBefore).catch(() => null) : null;
    const readAfterPost = post.readAfter ? await getPost(post.readAfter).catch(() => null) : null;

    const formattedDate = format(new Date(post.date), 'MMMM dd, yyyy');

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <article className="pb-20">
                    <header className="relative pt-48 pb-16 overflow-hidden">
                        {/* Liquid Hero Background (Seamless & Animated) */}
                        <div className="absolute inset-0 z-0 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-deep)]/60 to-[var(--bg-deep)] z-10" />

                            {/* Animated Image-Derived Layers (High Vibrancy) */}
                            <div className="absolute inset-0 opacity-60 dark:opacity-50 transition-opacity duration-1000">
                                {post.image ? (
                                    <div className="absolute inset-x-0 -top-40 -bottom-40">
                                        {/* Primary Liquid Layer - Sharper Colors */}
                                        <div className="absolute inset-0 animate-liquid saturate-150">
                                            <Image
                                                src={post.image}
                                                alt=""
                                                fill
                                                className="object-cover blur-[40px] scale-[1.6]"
                                                priority
                                            />
                                        </div>
                                        {/* Secondary Liquid Layer - Depth & Movement */}
                                        <div className="absolute inset-0 animate-liquid-delayed mix-blend-soft-light opacity-70 saturate-200">
                                            <Image
                                                src={post.image}
                                                alt=""
                                                fill
                                                className="object-cover blur-[70px] scale-[2] rotate-12"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-purple)]/20 via-transparent to-[var(--neon-cyan)]/20 animate-pulse-slow" />
                                )}
                            </div>

                            {/* Consistent Brand Overlays */}
                            <div className="absolute inset-0 opacity-20 dark:opacity-10 bg-gradient-to-tr from-[var(--neon-purple)]/30 via-transparent to-[var(--neon-cyan)]/20 z-0" />
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[150%] bg-radial-gradient from-[var(--neon-purple)]/20 via-transparent to-transparent blur-[120px] opacity-30" />

                            {/* Refined Noise Bloom */}
                            <div className="absolute inset-0 opacity-[0.04] animate-haze mix-blend-overlay" />
                        </div>

                        <div className="relative z-10 max-w-4xl mx-auto px-6">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[var(--neon-purple)] mb-8 hover:opacity-70 transition-opacity"
                            >
                                <ChevronLeft size={16} /> Back to Blog
                            </Link>

                            <div className="flex items-center gap-4 text-xs uppercase tracking-widest font-bold text-[var(--text-muted)] mb-4">
                                <span className="px-3 py-1 rounded-full bg-[var(--neon-purple)]/10 border border-[var(--neon-purple)]/20 text-[var(--neon-purple)]">
                                    {post.category}
                                </span>
                                <div className="flex items-center gap-1">
                                    <Calendar size={14} className="text-[var(--neon-purple)]" />
                                    {formattedDate}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock size={14} className="text-[var(--neon-purple)]" />
                                    5 min read
                                </div>
                            </div>

                            <h1 className="h1 font-elegant text-[var(--text-primary)] mb-6 leading-tight">
                                {post.title}
                            </h1>

                            <p className="text-xl text-[var(--text-secondary)] font-light leading-relaxed">
                                {post.description}
                            </p>

                            <div className="mt-8 flex flex-wrap gap-2">
                                {post.tags.map(tag => (
                                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] border border-[var(--glass-border)] px-2 py-1 rounded">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {post.image && (
                        <div className="max-w-6xl mx-auto px-6 mb-16">
                            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl border border-[var(--glass-border)] shadow-2xl">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    )}

                    {/* Content Section */}
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="prose prose-invert max-w-none 
                            prose-headings:font-elegant prose-headings:text-[var(--text-primary)] 
                            prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed prose-p:text-lg
                            prose-a:text-[var(--neon-cyan)] prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-[var(--text-primary)]
                            prose-code:text-[var(--neon-pink)] prose-code:bg-[var(--bg-card)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                            prose-blockquote:border-l-[var(--neon-purple)] prose-blockquote:bg-[var(--neon-purple)]/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
                        ">
                            <MDXRemote
                                source={post.content}
                                components={{
                                    ...BlogComponents,
                                    YouTube: BlogComponents.YouTube,
                                    BlogImage: BlogComponents.BlogImage,
                                    BlogVideo: BlogComponents.BlogVideo,
                                    DirectedLink: BlogComponents.DirectedLink,
                                }}
                                options={{
                                    mdxOptions: {
                                        remarkPlugins: [remarkMath, remarkGfm],
                                        rehypePlugins: [
                                            rehypeHighlight as any,
                                            rehypeSlug,
                                            [rehypeAutolinkHeadings, {
                                                behavior: 'prepend',
                                                properties: { className: ['anchor-link'], ariaLabel: 'Link to section' }
                                            }],
                                            rehypeKatex
                                        ]
                                    }
                                }}
                            />
                        </div>

                        {/* Directed Links */}
                        <div className="mt-20 pt-10 border-t border-[var(--glass-border)]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {readBeforePost && (
                                    <BlogComponents.DirectedLink
                                        type="before"
                                        slug={readBeforePost.slug}
                                        title={readBeforePost.title}
                                    />
                                )}
                                {readAfterPost && (
                                    <BlogComponents.DirectedLink
                                        type="after"
                                        slug={readAfterPost.slug}
                                        title={readAfterPost.title}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </div >
    );
}

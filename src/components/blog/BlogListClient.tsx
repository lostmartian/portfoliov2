'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import BlogCard from '@/components/blog/BlogCard';
import BlogFilters from '@/components/blog/BlogFilters';
import Pagination from '@/components/blog/Pagination';
import { BlogPost } from '@/lib/blog';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogListClientProps {
    allPosts: BlogPost[];
    categories: string[];
    tags: string[];
}

function BlogListContent({ allPosts, categories, tags }: BlogListClientProps) {
    const searchParams = useSearchParams();

    // Get filter values from URL
    const activeCategory = searchParams.get('category') || 'All';
    const activeTag = searchParams.get('tag');
    const currentPage = parseInt(searchParams.get('page') || '1');
    const postsPerPage = 6;

    // Perform filtering
    const filteredPosts = useMemo(() => {
        let posts = [...allPosts];

        if (activeCategory !== 'All') {
            posts = posts.filter(post => post.category === activeCategory);
        }

        if (activeTag) {
            posts = posts.filter(post => post.tags.includes(activeTag));
        }

        return posts;
    }, [allPosts, activeCategory, activeTag]);

    // Perform pagination
    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const paginatedPosts = useMemo(() => {
        const startIndex = (currentPage - 1) * postsPerPage;
        return filteredPosts.slice(startIndex, startIndex + postsPerPage);
    }, [filteredPosts, currentPage, postsPerPage]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-3 space-y-12">
                <div className="sticky top-32">
                    <BlogFilters categories={categories} tags={tags} />
                </div>
            </aside>

            {/* Blog Grid */}
            <main className="lg:col-span-9">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-xs uppercase tracking-widest font-bold text-[var(--neon-purple)] mb-2">
                            {activeCategory} {activeTag ? `/ #${activeTag}` : ''}
                        </h2>
                        <p className="text-[var(--text-muted)] text-sm">
                            Showing {paginatedPosts.length} of {totalPosts} articles
                        </p>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${activeCategory}-${activeTag}-${currentPage}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 gap-8"
                    >
                        {paginatedPosts.length > 0 ? (
                            paginatedPosts.map((post, index) => (
                                <motion.div
                                    key={post.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <BlogCard post={post} />
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <div className="text-[var(--text-muted)] mb-4 h3 opacity-20">NO RESULTS</div>
                                <p className="text-[var(--text-secondary)]">
                                    No blog posts found for the selected filters.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {totalPages > 1 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} />
                )}
            </main>
        </div>
    );
}

export default function BlogListClient(props: BlogListClientProps) {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center py-20">
                <div className="h-12 w-12 border-4 border-[var(--neon-purple)] border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <BlogListContent {...props} />
        </Suspense>
    );
}

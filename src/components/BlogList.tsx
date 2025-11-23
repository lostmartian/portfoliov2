'use client';

import { useState, useMemo } from 'react';
import { BlogPost } from '@/lib/blog';
import BlogCard from './BlogCard';
import { Search, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogListProps {
    posts: BlogPost[];
    allTags: string[];
}

export default function BlogList({ posts, allTags }: BlogListProps) {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => post.tags.includes(tag));
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTags && matchesSearch;
        });
    }, [posts, selectedTags, searchQuery]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const currentPosts = filteredPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    );

    // Reset page when filters change
    useMemo(() => {
        setCurrentPage(1);
    }, [selectedTags, searchQuery]);

    // Global Empty State (No blogs created yet)
    if (posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="w-20 h-20 mb-6 rounded-full bg-[var(--glass-highlight)] flex items-center justify-center text-[var(--text-muted)]">
                    <BookOpen size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">No blogs created yet</h3>
                <p className="text-[var(--text-muted)] max-w-md mx-auto">
                    Check back soon! I am working on some amazing content.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar - Filters */}
            <aside className="w-full lg:w-1/4 space-y-8">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={20} />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] transition-colors"
                    />
                </div>

                {/* Tags */}
                <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        Tags
                        {selectedTags.length > 0 && (
                            <button
                                onClick={() => setSelectedTags([])}
                                className="text-xs font-normal text-[var(--text-muted)] hover:text-[var(--neon-pink)] flex items-center gap-1 ml-auto"
                            >
                                <X size={12} /> Clear
                            </button>
                        )}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 border ${selectedTags.includes(tag)
                                    ? 'bg-[var(--neon-cyan)] text-black border-[var(--neon-cyan)]'
                                    : 'bg-[var(--glass-highlight)] text-[var(--text-secondary)] border-[var(--glass-border)] hover:border-[var(--neon-cyan)] hover:text-[var(--text-primary)]'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main Content - List */}
            <div className="flex-1">
                <div className="flex flex-col">
                    <AnimatePresence mode="popLayout">
                        {currentPosts.map((post, index) => (
                            <motion.div
                                key={post.slug}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className={index !== currentPosts.length - 1 ? "border-b border-[var(--glass-border)] pb-8 mb-8" : ""}
                            >
                                <BlogCard post={post} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center gap-4 mt-12">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-full text-sm font-medium bg-[var(--glass-highlight)] text-[var(--text-primary)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--glass-border)] transition-colors"
                        >
                            Previous
                        </button>
                        <span className="flex items-center text-[var(--text-muted)] text-sm">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-full text-sm font-medium bg-[var(--glass-highlight)] text-[var(--text-primary)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--glass-border)] transition-colors"
                        >
                            Next
                        </button>
                    </div>
                )}

                {filteredPosts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="w-16 h-16 mb-6 rounded-full bg-[var(--glass-highlight)] flex items-center justify-center text-[var(--text-muted)]">
                            <Search size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">No articles found</h3>
                        <p className="text-[var(--text-muted)] mb-6 max-w-xs mx-auto">
                            We couldn't find any articles matching your criteria. Try different keywords or tags.
                        </p>
                        <button
                            onClick={() => { setSelectedTags([]); setSearchQuery('') }}
                            className="px-6 py-2 rounded-full bg-[var(--neon-cyan)] text-black font-medium hover:opacity-90 transition-opacity"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

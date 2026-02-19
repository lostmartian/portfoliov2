'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tag as TagIcon, Filter } from 'lucide-react';

interface BlogFiltersProps {
    categories: string[];
    tags: string[];
}

export default function BlogFilters({ categories, tags }: BlogFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const activeCategory = searchParams.get('category') || 'All';
    const activeTag = searchParams.get('tag');

    const updateFilter = (type: 'category' | 'tag', value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(type, value);
            if (type === 'category') params.delete('tag'); // Reset tag when changing category
        } else {
            params.delete(type);
        }
        params.delete('page'); // Reset to first page
        router.push(`/blog?${params.toString()}`);
    };

    return (
        <div className="space-y-8">
            {/* Category Filter */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Filter size={16} className="text-[var(--neon-purple)]" />
                    <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--text-primary)]">
                        Categories
                    </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => updateFilter('category', category)}
                            className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${activeCategory === category
                                    ? 'bg-[var(--neon-purple)]/10 border-[var(--neon-purple)] text-[var(--neon-purple)] shadow-lg shadow-[var(--neon-purple)]/10'
                                    : 'border-[var(--glass-border)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:border-[var(--text-muted)]'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tag Filter */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <TagIcon size={16} className="text-[var(--neon-cyan)]" />
                    <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--text-primary)]">
                        Tags
                    </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => updateFilter('tag', activeTag === tag ? null : tag)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all ${activeTag === tag
                                    ? 'bg-[var(--neon-cyan)]/10 border-[var(--neon-cyan)] text-[var(--neon-cyan)]'
                                    : 'border-[var(--glass-border)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:border-[var(--text-muted)]'
                                }`}
                        >
                            #{tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

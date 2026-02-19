'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    if (totalPages <= 1) return null;

    const navigateToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`/blog?${params.toString()}`);
    };

    return (
        <div className="flex items-center justify-center gap-4 mt-12">
            <button
                onClick={() => navigateToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-10 w-10 flex items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--bg-card)] text-[var(--text-muted)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--neon-purple)] transition-all"
            >
                <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                        key={page}
                        onClick={() => navigateToPage(page)}
                        className={`h-10 w-10 flex items-center justify-center rounded-xl border transition-all ${currentPage === page
                                ? 'bg-[var(--neon-purple)]/10 border-[var(--neon-purple)] text-[var(--neon-purple)] font-bold'
                                : 'border-[var(--glass-border)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:border-[var(--text-muted)]'
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => navigateToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-10 w-10 flex items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--bg-card)] text-[var(--text-muted)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--neon-purple)] transition-all"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
}

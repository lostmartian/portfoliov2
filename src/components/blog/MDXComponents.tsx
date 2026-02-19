import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Quote } from 'lucide-react';
import YouTubeClient from './YouTubeClient';
import CodeSnippet from '@/components/common/CodeSnippet';
import { cn } from '@/lib/utils';

// --- Media Components ---

export const BlogImage = ({ src, alt, caption }: { src: string; alt: string; caption?: string }) => (
    <figure className="my-10">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-card)] shadow-xl">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
            />
        </div>
        {caption && (
            <figcaption className="mt-4 text-center text-sm text-[var(--text-muted)] italic font-light tracking-wide">
                {caption}
            </figcaption>
        )}
    </figure>
);

export const BlogVideo = ({ src, caption }: { src: string; caption?: string }) => (
    <figure className="my-10">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-black/40 shadow-xl">
            <video
                src={src}
                controls
                className="h-full w-full object-contain"
            />
        </div>
        {caption && (
            <figcaption className="mt-4 text-center text-sm text-[var(--text-muted)] italic font-light tracking-wide">
                {caption}
            </figcaption>
        )}
    </figure>
);

// --- Code & Technical Components ---

export const CodeBlock = ({ children, ...props }: any) => {
    const codeElement = React.Children.toArray(children).find(
        (child: any) => child.type === 'code'
    ) as any;

    const className = codeElement?.props?.className || props.className || '';
    const match = /language-(\w+)/.exec(className);
    const language = match ? match[1] : undefined;

    return (
        <CodeSnippet language={language}>
            {children}
        </CodeSnippet>
    );
};

// --- Typography Components ---

export const BlockQuote = ({ children }: { children: React.ReactNode }) => (
    <blockquote className="relative my-10 pl-8 pr-6 py-2 border-l-2 border-[var(--neon-purple)]/30 italic text-[var(--text-secondary)] text-lg leading-relaxed">
        <div className="relative z-10">{children}</div>
    </blockquote>
);

export const List = ({ children, ordered }: { children: React.ReactNode; ordered?: boolean }) => {
    const Tag = ordered ? 'ol' : 'ul';
    return (
        <Tag className={cn(
            "my-6 space-y-3 pl-6",
            ordered ? "list-decimal marker:text-[var(--text-muted)] marker:font-medium" : "list-disc marker:text-[var(--text-muted)]"
        )}>
            {children}
        </Tag>
    );
};

// --- Table Components ---

export const Table = ({ children }: { children: React.ReactNode }) => (
    <div className="my-10 overflow-x-auto rounded-xl border border-[var(--glass-border)] bg-[var(--bg-card)]">
        <table className="w-full text-left border-collapse text-sm">
            {children}
        </table>
    </div>
);

export const THead = ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-[var(--text-primary)]/[0.02] border-b border-[var(--glass-border)]">
        {children}
    </thead>
);

export const TCell = ({ children, isHeader }: { children: React.ReactNode; isHeader?: boolean }) => {
    const Tag = isHeader ? 'th' : 'td';
    return (
        <Tag className={cn(
            "px-6 py-4",
            isHeader ? "font-bold text-[var(--text-primary)] uppercase tracking-wider text-xs" : "text-[var(--text-secondary)] border-b border-[var(--glass-border)]/5"
        )}>
            {children}
        </Tag>
    );
};

// --- Helper Components ---

export const DirectedLink = ({ slug, title, type }: { slug: string; title: string; type: 'before' | 'after' }) => (
    <Link
        href={`/blog/${slug}`}
        className="flex items-center gap-4 p-5 my-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-card)] hover:border-[var(--neon-purple)]/50 transition-all group shadow-sm hover:shadow-lg"
    >
        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-[var(--text-primary)]/[0.03] text-[var(--text-muted)] border border-[var(--glass-border)] group-hover:bg-[var(--neon-purple)]/10 group-hover:text-[var(--neon-purple)] transition-colors">
            {(type === 'before') ? (
                <span className="text-[10px] font-bold">PREV</span>
            ) : (
                <span className="text-[10px] font-bold">NEXT</span>
            )}
        </div>
        <div className="flex-grow">
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold mb-1 opacity-70">
                {(type === 'before') ? 'Prerequisite' : 'Up Next'}
            </div>
            <div className="text-[var(--text-primary)] font-elegant font-medium text-base group-hover:text-[var(--neon-purple)] transition-colors">
                {title}
            </div>
        </div>
        <ExternalLink size={18} className="text-[var(--text-muted)] opacity-50 group-hover:opacity-100 group-hover:text-[var(--neon-purple)] transform transition-transform group-hover:translate-x-1" />
    </Link>
);

const BlogComponents = {
    // Media
    img: BlogImage,
    BlogImage,
    video: BlogVideo,
    BlogVideo,
    YouTube: YouTubeClient,

    // Technical
    pre: CodeBlock,
    DirectedLink,

    // Typography
    h1: (props: any) => <h1 className="h2 mt-16 mb-8 font-elegant text-[var(--text-primary)]" {...props} />,
    h2: (props: any) => <h2 className="h3 mt-14 mb-6 font-elegant text-[var(--text-primary)]" {...props} />,
    h3: (props: any) => <h3 className="h4 mt-10 mb-4 font-elegant text-[var(--text-primary)]" {...props} />,
    p: (props: any) => <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed" {...props} />,
    blockquote: BlockQuote,
    ul: (props: any) => <List {...props} ordered={false} />,
    ol: (props: any) => <List {...props} ordered={true} />,
    li: (props: any) => <li className="leading-relaxed text-[var(--text-secondary)]" {...props} />,
    hr: () => <hr className="my-12 border-t border-[var(--glass-border)] opacity-10" />,
    a: (props: any) => <a className="text-[var(--neon-purple)] font-medium underline underline-offset-4 decoration-[var(--neon-purple)]/20 hover:decoration-[var(--neon-purple)] transition-all" {...props} />,

    // Tables
    table: Table,
    thead: THead,
    th: (props: any) => <TCell {...props} isHeader={true} />,
    td: (props: any) => <TCell {...props} isHeader={false} />,

    // Math Container
    div: (props: any) => {
        if (props.className?.includes('math-display')) {
            return <div className="my-10 overflow-x-auto py-8 bg-[var(--text-primary)]/[0.01] rounded-xl border border-[var(--glass-border)]/5 px-6 italic text-[var(--text-secondary)] text-center" {...props} />;
        }
        return <div {...props} />;
    },
    span: (props: any) => {
        if (props.className?.includes('math-inline')) {
            return <span className="text-[var(--text-primary)] font-medium italic opacity-90" {...props} />;
        }
        return <span {...props} />;
    }
};

export default BlogComponents;

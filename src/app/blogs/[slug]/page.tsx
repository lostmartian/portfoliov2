import { getPostData, getAllPostSlugs } from '@/lib/blog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MDXContent from '@/components/MDXContent';
import { serialize } from 'next-mdx-remote/serialize';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export function generateStaticParams() {
    const paths = getAllPostSlugs();
    return paths.map((path) => path.params);
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const postData = getPostData(slug);

    if (!postData) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${postData.title} | Sahil Gangurde`,
        description: postData.description,
    };
}

export default async function BlogPost({ params }: Props) {
    const { slug } = await params;
    const postData = getPostData(slug);

    if (!postData) {
        notFound();
    }

    const mdxSource = await serialize(postData.content);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-[#0a0a0f] dark:via-[#0f0f17] dark:to-[#12121c] mesh-gradient">
            <Header />

            <main className="flex-1 pt-4 md:pt-24 lg:pl-64 xl:pr-80">
                <article className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
                    {/* Back Link */}
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors mb-8 group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Blogs
                    </Link>

                    {/* Header */}
                    <header className="mb-12 text-center">
                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {postData.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--glass-highlight)] text-[var(--neon-cyan)] border border-[var(--glass-border)]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold font-elegant text-[var(--text-primary)] mb-6 leading-tight">
                            {postData.title}
                        </h1>

                        <div className="flex items-center justify-center gap-6 text-[var(--text-muted)]">
                            <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                <span>{format(new Date(postData.date), 'MMMM d, yyyy')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={18} />
                                <span>{postData.readTime}</span>
                            </div>
                        </div>
                    </header>

                    {/* Content */}
                    <div className="w-full">
                        <MDXContent source={mdxSource} />
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}

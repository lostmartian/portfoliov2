import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import BlogList from '@/components/BlogList';
import { getSortedPostsData, getAllTags } from '@/lib/blog';
import { BookOpen } from 'lucide-react';

export const metadata = {
    title: 'Blogs | Sahil Gangurde',
    description: 'Thoughts, tutorials, and insights on AI, software engineering, and technology.',
};

export default function Blogs() {
    const posts = getSortedPostsData();
    const allTags = getAllTags();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-[#0a0a0f] dark:via-[#0f0f17] dark:to-[#12121c] mesh-gradient">
            <Header />

            <main className="flex-1 pt-24 lg:pl-64 xl:pr-80 flex flex-col min-h-[calc(100vh-80px)]">
                {/* Hero Section */}
                <PageHero
                    title="Blog"
                    subtitle="Exploring the frontiers of AI, Engineering, and Design"
                />

                {/* Blog List Section */}
                <section className="py-8 pb-24 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <BlogList posts={posts} allTags={allTags} />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

import React from 'react';
import { getAllBlogPosts, getAllCategories, getAllTags } from '@/lib/blog';
import BlogListClient from '@/components/blog/BlogListClient';
import PageHero from '@/components/PageHero';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Journal & Insights | Sahil Gangurde',
    description: 'Exploring the intersection of tech, design, life philosophy, and politics through personal experiences and deep-dives.',
};

export default async function BlogPage() {
    const allPosts = await getAllBlogPosts();
    const categories = await getAllCategories();
    const tags = await getAllTags();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pb-20">
                <PageHero
                    title="Journal"
                    subtitle="A collection of thoughts on tech, design, life philosophy, and the world at large."
                />

                <div className="max-w-7xl mx-auto px-6 mt-12">
                    <BlogListClient
                        allPosts={allPosts}
                        categories={categories}
                        tags={tags}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}

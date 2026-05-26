import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    tags: string[];
    category: string;
    description: string;
    image?: string;
    isShow?: boolean;
    readBefore?: string; // Slug of the blog to read before this one
    readAfter?: string;  // Slug of the blog to read after this one
    content: string;
}

export async function getBlogSlugs() {
    if (!fs.existsSync(blogDirectory)) {
        return [];
    }
    return fs.readdirSync(blogDirectory).filter(file => file.endsWith('.mdx'));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(blogDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug: realSlug,
        title: data.title,
        date: data.date,
        tags: data.tags || [],
        category: data.category || 'Uncategorized',
        description: data.description,
        image: data.image,
        isShow: data.isShow !== undefined ? data.isShow : true,
        readBefore: data.readBefore,
        readAfter: data.readAfter,
        content,
    };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
    const slugs = await getBlogSlugs();
    const posts = await Promise.all(slugs.map(slug => getBlogPostBySlug(slug)));

    // Sort posts by date, newest first
    return posts
        .filter(post => post.isShow === true)
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

export interface BlogFilterOptions {
    tag?: string;
    category?: string;
    page?: number;
    limit?: number;
}

export async function getFilteredBlogPosts(options: BlogFilterOptions) {
    let posts = await getAllBlogPosts();

    if (options.category && options.category !== 'All') {
        posts = posts.filter(post => post.category === options.category);
    }

    if (options.tag) {
        posts = posts.filter(post => post.tags.includes(options.tag!));
    }

    const total = posts.length;
    const page = options.page || 1;
    const limit = options.limit || 6;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    return {
        posts: posts.slice(startIndex, endIndex),
        total,
        totalPages: Math.ceil(total / limit),
    };
}

export async function getAllCategories() {
    const posts = await getAllBlogPosts();
    const categories = new Set(posts.map(post => post.category));
    return ['All', ...Array.from(categories)];
}

export async function getAllTags() {
    const posts = await getAllBlogPosts();
    const tags = new Set(posts.flatMap(post => post.tags));
    return Array.from(tags);
}

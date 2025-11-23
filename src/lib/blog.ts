import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/blogs');

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    readTime: string;
    content: string;
}

export function getSortedPostsData(): BlogPost[] {
    // Create directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            content,
            ...(data as {
                title: string;
                date: string;
                description: string;
                tags: string[];
                readTime: string;
            }),
        };
    });

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllPostSlugs() {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                slug: fileName.replace(/\.mdx$/, ''),
            },
        };
    });
}

export function getPostData(slug: string): BlogPost | null {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        content,
        ...(data as {
            title: string;
            date: string;
            description: string;
            tags: string[];
            readTime: string;
        }),
    };
}

export function getAllTags(): string[] {
    const posts = getSortedPostsData();
    const tags = new Set<string>();
    posts.forEach(post => {
        post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOGS_DIR = path.join(process.cwd(), 'src/content/blogs');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  description: string;
  hidden: boolean;
  content: string;
  readTime: string;
  youtubeId?: string;
  tweetId?: string;
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 225;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} minutes`;
}

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOGS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOGS_DIR);
  const posts = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(BLOGS_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      const categories = Array.isArray(data.category)
        ? data.category
        : data.category
          ? [data.category]
          : ['General'];

      return {
        slug: file.replace('.md', ''),
        title: data.title || 'Untitled',
        date: data.date || '',
        categories: categories,
        description: data.description || '',
        hidden: data.hidden === true,
        content: content,
        readTime: calculateReadTime(content),
        youtubeId: data.youtubeId,
        tweetId: data.tweetId,
      } as BlogPost;
    })
    .filter((post) => !post.hidden); // Filter out hidden posts

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOGS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  const categories = Array.isArray(data.category)
    ? data.category
    : data.category
      ? [data.category]
      : ['General'];

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || '',
    categories: categories,
    description: data.description || '',
    hidden: data.hidden === true,
    content: content,
    readTime: calculateReadTime(content),
    youtubeId: data.youtubeId,
    tweetId: data.tweetId,
  } as BlogPost;
}

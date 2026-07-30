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
  headerImage?: string;
  headerImageCaption?: string;
  seriesName?: string;
  seriesPart?: number;
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

      const seriesName = data.series?.name || (typeof data.series === 'string' ? data.series : undefined);
      const seriesPart = data.series?.part || undefined;

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
        headerImage: data.headerImage,
        headerImageCaption: data.headerImageCaption,
        seriesName,
        seriesPart,
      } as BlogPost;
    })
    .filter((post) => !post.hidden); // Filter out hidden posts

  // Sort by date descending, tie-break by slug descending to ensure later projects on same day appear first
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    if (dateB !== dateA) {
      return dateB - dateA;
    }
    return b.slug.localeCompare(a.slug);
  });
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

  const seriesName = data.series?.name || (typeof data.series === 'string' ? data.series : undefined);
  const seriesPart = data.series?.part || undefined;

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
    headerImage: data.headerImage,
    headerImageCaption: data.headerImageCaption,
    seriesName,
    seriesPart,
  } as BlogPost;
}

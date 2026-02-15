import { Metadata } from 'next';
import ExperienceClient from './ExperienceClient';

export const metadata: Metadata = {
  title: 'Professional Experience | Full-Stack AI Engineer at lostmartian',
  description: 'Detailed professional odyssey of Sahil Gangurde, featuring roles in foundational AI startups, GraphRAG engineering, and high-concurrency systems. Expertise in Go, Python, and AWS.',
  keywords: [
    'Founding AI Engineer',
    'GraphRAG Specialist',
    'Full-Stack Developer India',
    'Go Backend Developer',
    'AWS Cloud Architect',
    'Machine Learning Instructor',
    'Technical Problem Setter',
    'lostmartian Experience'
  ],
  openGraph: {
    title: 'Professional Odyssey | lostmartian Studio',
    description: 'From stealth-mode AI architecting to scaling global teaching platforms. A journey of technical excellence and innovation.',
  },
  alternates: {
    canonical: '/experience',
  }
};

export default function Experience() {
  return <ExperienceClient />;
}

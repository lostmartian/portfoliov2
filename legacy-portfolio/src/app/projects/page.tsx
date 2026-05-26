import { Metadata } from 'next';
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Precision Projects | High-Performance Engineering by lostmartian',
  description: 'Explore the portfolio of lostmartian Studio featuring high-performance database systems, AI-powered computer vision models, and secure cryptographic solutions. Technical works by Sahil Gangurde.',
  keywords: [
    'lostdb',
    'EffUNet Architecture',
    'LSB Steganography',
    'AI Agriculture Platform',
    'Database System Design',
    'C++ Simulation',
    'High-Performance Backend Engineering',
    'lostmartian Portfolio'
  ],
  openGraph: {
    title: 'Projects & Case Studies | lostmartian Studio',
    description: 'A showcase of design engineering excellence, from browser-native backtesting engines to distributed AI architectures.',
  },
  alternates: {
    canonical: '/projects',
  }
};

export default function Projects() {
  return <ProjectsClient />;
}

import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Sahil Gangurde | Full-Stack AI Engineer & Founder of lostmartian',
  description: 'Learn about Sahil Gangurde, a Full-Stack AI Engineer specializing in high-performance systems, Generative AI, and distributed architectures. Discover the technical journey behind lostmartian Dev Studio.',
  keywords: [
    'Sahil Gangurde Bio',
    'lostmartian Founder',
    'Full-Stack AI Engineer',
    'Generative AI Expert',
    'Cloud Infrastructure Architect',
    'IIIT Gwalior Alumnus',
    'High-Performance Systems Engineering',
    'Boutique Dev Studio India'
  ],
  openGraph: {
    title: 'About Sahil Gangurde | lostmartian Studio',
    description: 'Founder of lostmartian and Full-Stack AI Engineer. Building the future of intelligent systems through design engineering and technical excellence.',
  },
  alternates: {
    canonical: '/about',
  }
};

export default function About() {
  return <AboutClient />;
}

import { Metadata } from 'next';
import HobbiesClient from './HobbiesClient';

export const metadata: Metadata = {
  title: 'Creative Hobbies | Fine Arts & Photography by lostmartian',
  description: 'Explore the artistic side of Sahil Gangurde, founder of lostmartian. Featuring a collection of paintings, photography, and creative explorations that fuel technical innovation.',
  keywords: [
    'Fine Arts Portfolio',
    'Traditional Paintings',
    'Creative Coding',
    'Photography Collection',
    'Sahil Gangurde Hobbies',
    'lostmartian Creative',
    'Design Engineering Inspiration'
  ],
  openGraph: {
    title: 'Creative Hobbies | lostmartian Studio',
    description: 'Where art meets engineering. Explore the paintings and photography that inspire the high-end digital products at lostmartian.',
  },
  alternates: {
    canonical: '/hobbies',
  }
};

export default function Hobbies() {
  return <HobbiesClient />;
}

'use client';

import { usePathname } from 'next/navigation';
import InfoWidgets from './InfoWidgets';

export default function PersistentWidgets() {
  const pathname = usePathname();
  
  // Only show widgets on about, experience, and projects pages (not on landing page)
  // Handle both with and without trailing slashes (due to trailingSlash: true in config)
  const normalizedPath = pathname.replace(/\/$/, ''); // Remove trailing slash if present
  const showWidgets = normalizedPath === '/about' || normalizedPath === '/experience' || normalizedPath === '/projects';
  
  if (!showWidgets) {
    return null;
  }
  
  return <InfoWidgets />;
}


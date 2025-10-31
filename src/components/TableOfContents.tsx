'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  sections?: string[]; // Optional: manually specify section IDs
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [activeParentIds, setActiveParentIds] = useState<Set<string>>(new Set());
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationState, setAnimationState] = useState<'idle' | 'slide-out' | 'slide-in'>('idle');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const observedElementsRef = useRef<Map<string, Element>>(new Map());
  const parentChildMapRef = useRef<Map<string, string[]>>(new Map()); // parent id -> child ids
  const pathname = usePathname();
  const prevPathnameRef = useRef<string>(pathname);

  // Extract headings on mount
  useEffect(() => {
    const extractHeadings = () => {
      const tocItems: TocItem[] = [];
      const main = document.querySelector('main');
      if (!main) return;

      // Get all sections in DOM order
      const allSections = Array.from(main.querySelectorAll('section[id]'));

      // Traverse each section in DOM order
      allSections.forEach((section) => {
        const sectionId = section.id;
        if (!sectionId || sectionId === 'contact' || sectionId === 'cta') return;

        // Check if this section has an h2 (main section header)
        const h2 = section.querySelector('h2');
        if (h2) {
          const title = h2.textContent?.trim() || '';
          if (title && !tocItems.find(item => item.id === sectionId)) {
            tocItems.push({ id: sectionId, title, level: 1 });
          }
        }

        // If this is the experience section, get individual experience items in order
        if (sectionId === 'experience') {
          const experienceItems = Array.from(section.querySelectorAll('[id^="experience-"]'));
          experienceItems.forEach((item) => {
            const id = item.id;
            const h3 = item.querySelector('h3');
            const h4 = item.querySelector('h4');
            const title = h3?.textContent?.trim() || h4?.textContent?.trim() || '';
            if (title) {
              tocItems.push({ id, title, level: 2 });
            }
          });
        }

        // If this is the projects section, get individual project items in order
        if (sectionId === 'projects') {
          const projectItems = Array.from(section.querySelectorAll('[id^="project-"]'));
          projectItems.forEach((item) => {
            const id = item.id;
            const h3 = item.querySelector('h3');
            const title = h3?.textContent?.trim() || '';
            if (title) {
              tocItems.push({ id, title, level: 2 });
            }
          });
        }
      });

      setHeadings(tocItems);

      // Build parent-child relationship map
      const parentChildMap = new Map<string, string[]>();
      let currentParent: string | null = null;

      tocItems.forEach((item) => {
        if (item.level === 1) {
          currentParent = item.id;
          parentChildMap.set(item.id, []);
        } else if (item.level === 2 && currentParent) {
          const children = parentChildMap.get(currentParent) || [];
          children.push(item.id);
          parentChildMap.set(currentParent, children);
        }
      });

      parentChildMapRef.current = parentChildMap;
    };

    // Wait for content to load
    const timer = setTimeout(extractHeadings, 200);
    return () => clearTimeout(timer);
  }, [sections]);

  // Set up intersection observer
  useEffect(() => {
    if (headings.length === 0) return;

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observedElementsRef.current.clear();
    }

    // Create IntersectionObserver to track active section
    const observerOptions = {
      rootMargin: '-120px 0px -70% 0px',
      threshold: [0, 0.1, 0.5, 1],
    };

    let activeEntries: Map<string, IntersectionObserverEntry> = new Map();

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeEntries.set(entry.target.id, entry);
        } else {
          activeEntries.delete(entry.target.id);
        }
      });

      // Find the section with the highest intersection ratio that's above the threshold
      let maxRatio = 0;
      let maxEntry: IntersectionObserverEntry | null = null;

      activeEntries.forEach((entry) => {
        // Prefer sections that are more visible and closer to top
        const ratio = entry.intersectionRatio;
        const top = entry.boundingClientRect.top;
        
        // Weight: higher ratio + closer to top = better
        const score = ratio * 100 + (top < 200 ? 50 : 0);
        
        const currentMaxTop = maxEntry?.boundingClientRect.top ?? Infinity;
        if (score > maxRatio || (score === maxRatio && top < currentMaxTop)) {
          maxRatio = score;
          maxEntry = entry;
        }
      });

      if (maxEntry) {
        const activeEntry: IntersectionObserverEntry = maxEntry;
        const activeItemId = activeEntry.target.id;
        setActiveId(activeItemId);

        // Find and activate parent if this is a level 2 item
        const activeParentIdsSet = new Set<string>();
        
        // Check if active item is a level 2 item and has a parent
        parentChildMapRef.current.forEach((childIds, parentId) => {
          if (childIds.includes(activeItemId)) {
            activeParentIdsSet.add(parentId);
          }
        });

        // Also check if the active item itself is a level 1 item (in case it becomes active directly)
        const activeItem = headings.find(item => item.id === activeItemId);
        if (activeItem?.level === 1) {
          // If a level 1 item is active, clear parent states for others
          // (only this level 1 should be active)
        }

        setActiveParentIds(activeParentIdsSet);
      }
    }, observerOptions);

    // Observe individual items (experiences/projects) and main sections
    headings.forEach((item) => {
      const element = document.getElementById(item.id) || document.querySelector(`section#${item.id}`);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
        observedElementsRef.current.set(item.id, element);
      }
    });

    // Initial check: determine which section is currently visible on page load
    const checkInitialActive = () => {
      let bestMatch: { id: string; score: number } | null = null;
      
      headings.forEach((item) => {
        const element = document.getElementById(item.id) || document.querySelector(`section#${item.id}`);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const offset = 120; // Account for header
        
        // Check if element is in viewport
        if (rect.top < viewportHeight + offset && rect.bottom > offset) {
          // Calculate visibility score
          const visibleTop = Math.max(offset, rect.top);
          const visibleBottom = Math.min(viewportHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibilityRatio = visibleHeight / Math.min(rect.height, viewportHeight);
          
          // Prefer items that are closer to the top of viewport
          const topScore = rect.top < offset + 100 ? 50 : 0;
          const score = visibilityRatio * 100 + topScore;
          
          if (!bestMatch || score > bestMatch.score || (score === bestMatch.score && rect.top < (document.getElementById(bestMatch.id)?.getBoundingClientRect().top || Infinity))) {
            bestMatch = { id: item.id, score };
          }
        }
      });

      if (bestMatch) {
        const activeMatch: { id: string; score: number } = bestMatch;
        setActiveId(activeMatch.id);
        
        // Find and activate parent if this is a level 2 item
        const activeParentIdsSet = new Set<string>();
        parentChildMapRef.current.forEach((childIds, parentId) => {
          if (childIds.includes(activeMatch.id)) {
            activeParentIdsSet.add(parentId);
          }
        });
        setActiveParentIds(activeParentIdsSet);
      } else if (headings.length > 0) {
        // If nothing is in view, select the first item
        setActiveId(headings[0].id);
        setActiveParentIds(new Set());
      }
    };

    // Run initial check after a small delay to ensure DOM is ready
    setTimeout(checkInitialActive, 100);

    // Check visibility (desktop only)
    const checkVisibility = () => {
      setIsVisible(window.innerWidth >= 1024 && headings.length > 0);
    };

    checkVisibility();
    window.addEventListener('resize', checkVisibility);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      observedElementsRef.current.clear();
      window.removeEventListener('resize', checkVisibility);
    };
  }, [headings]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id) || document.querySelector(`section#${id}`);
    
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveId(id);
    }
  };

  // Handle page transition animations
  useEffect(() => {
    const currentPath = pathname.replace(/\/$/, ''); // Normalize pathname
    const prevPath = prevPathnameRef.current ? prevPathnameRef.current.replace(/\/$/, '') : '';
    
    // Skip animation on initial mount
    if (prevPathnameRef.current === '') {
      prevPathnameRef.current = pathname;
      return;
    }

    // Skip if same page (e.g., just trailing slash difference)
    if (prevPath === currentPath) {
      return;
    }

    // Page changed - animate out then in
    setIsAnimating(true);
    setAnimationState('slide-out');
    
    // After slide-out completes, slide in with new content
    const slideOutTimer = setTimeout(() => {
      setAnimationState('slide-in');
      const slideInTimer = setTimeout(() => {
        setAnimationState('idle');
        setIsAnimating(false);
      }, 300); // Animation duration
      
      return () => clearTimeout(slideInTimer);
    }, 300); // Wait for slide-out to complete
    
    prevPathnameRef.current = pathname;
    
    return () => {
      clearTimeout(slideOutTimer);
    };
  }, [pathname]);

  if (!isVisible || headings.length === 0) {
    return null;
  }

  // Determine animation classes
  const getAnimationClasses = () => {
    if (animationState === 'slide-out') {
      return 'animate-slide-out-left';
    } else if (animationState === 'slide-in') {
      return 'animate-slide-in-left';
    }
    return '';
  };

  return (
    <aside 
      className={`fixed left-0 -translate-y-1/2 z-40 hidden lg:block ${getAnimationClasses()}`} 
      style={{ top: 'calc(50vh + 48px)' }}
    >
      <nav className="ml-8 w-56 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 px-2">
            Contents
          </div>
          {headings.map((item) => {
            const isActive = activeId === item.id;
            const isParentActive = item.level === 1 && activeParentIds.has(item.id);
            const isActiveOrParent = isActive || isParentActive;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group relative block w-full text-left transition-colors duration-300 ease-out ${
                  isActiveOrParent
                    ? 'text-gray-900 dark:text-gray-100'
                    : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                title={item.title}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {/* Notion-style indicator */}
                  <div
                    className={`h-0.5 transition-all duration-300 ease-out flex-shrink-0 ${
                      isActiveOrParent
                        ? item.level === 1 
                          ? 'w-4 bg-gray-900 dark:bg-gray-100'
                          : 'w-2 bg-gray-700 dark:bg-gray-300 ml-2'
                        : item.level === 1
                          ? 'w-0 group-hover:w-2 bg-gray-400 dark:bg-gray-600'
                          : 'w-0 group-hover:w-1 bg-gray-400 dark:bg-gray-600 ml-2'
                    }`}
                  />
                  <span
                    className={`text-sm leading-6 transition-all duration-300 ease-out whitespace-nowrap overflow-hidden text-ellipsis flex-1 min-w-0 ${
                      isActiveOrParent
                        ? item.level === 1 ? 'font-semibold' : 'font-medium'
                        : 'font-normal'
                    } ${item.level === 2 ? 'text-gray-600 dark:text-gray-400' : ''}`}
                  >
                    {item.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}

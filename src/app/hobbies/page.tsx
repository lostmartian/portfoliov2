'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { Palette, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Hobbies() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [paintings, setPaintings] = useState<string[]>([]);
  const [imageDimensions, setImageDimensions] = useState<Record<string, { width: number; height: number; isLandscape: boolean }>>({});
  const [captions, setCaptions] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);

  // Load captions from JSON file and use it as source of truth for paintings
  useEffect(() => {
    const loadCaptionsAndPaintings = async () => {
      try {
        const response = await fetch('/paintings/captions.json');
        if (response.ok) {
          const data = await response.json();
          setCaptions(data);
          
          // Use captions.json keys as the source of truth for which paintings exist
          const paintingNames = Object.keys(data);
          
          // Sort numerically (1.jpg, 2.jpg, 3.jpg, etc.)
          const sortedPaintings = paintingNames.sort((a, b) => {
            const numA = parseInt(a.replace('.jpg', ''));
            const numB = parseInt(b.replace('.jpg', ''));
            return numA - numB;
          });

          setPaintings(sortedPaintings);
        }
      } catch (error) {
        console.error('Failed to load captions:', error);
      }
    };

    loadCaptionsAndPaintings();
  }, []);

  // Load and detect image dimensions
  useEffect(() => {
    if (paintings.length === 0) return;

    const loadImageDimensions = async () => {
      const dimensions: Record<string, { width: number; height: number; isLandscape: boolean }> = {};
      
      await Promise.all(
        paintings.map((painting) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => {
              dimensions[painting] = {
                width: img.naturalWidth,
                height: img.naturalHeight,
                isLandscape: img.naturalWidth > img.naturalHeight,
              };
              resolve();
            };
            img.onerror = () => resolve();
            img.src = `/paintings/${painting}`;
          });
        })
      );
      
      setImageDimensions(dimensions);
    };

    loadImageDimensions();
  }, [paintings]);

  const openLightbox = (image: string) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  // Carousel navigation functions
  const goToNext = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex((prev) => {
      const next = (prev + 1) % paintings.length;
      return next;
    });
  };

  const goToPrevious = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex((prev) => {
      const next = (prev - 1 + paintings.length) % paintings.length;
      return next;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const currentX = e.targetTouches[0].clientX;
    const currentY = e.targetTouches[0].clientY;
    
    // Check if this is primarily a horizontal swipe
    const deltaX = Math.abs(currentX - touchStart);
    const deltaY = Math.abs(currentY - touchStartY);
    
    // If horizontal swipe is more significant than vertical, prevent default to stop page scrolling
    if (deltaX > deltaY && deltaX > 10) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setTouchEnd(currentX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart || !touchEnd) {
      setTouchStart(0);
      setTouchEnd(0);
      setTouchStartY(0);
      return;
    }
    
    const distanceX = touchStart - touchEnd;
    const distanceY = Math.abs((e.changedTouches[0]?.clientY || 0) - touchStartY);
    const minSwipeDistance = 50;

    // Only handle horizontal swipes (if horizontal movement is greater than vertical)
    if (Math.abs(distanceX) > distanceY && Math.abs(distanceX) > minSwipeDistance) {
      e.preventDefault();
      e.stopPropagation();
      
      if (distanceX > minSwipeDistance) {
        // Swiped left - go to next
        goToNext();
      } else if (distanceX < -minSwipeDistance) {
        // Swiped right - go to previous
        goToPrevious();
      }
    }
    
    // Reset touch points
    setTouchStart(0);
    setTouchEnd(0);
    setTouchStartY(0);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        closeLightbox();
      } else if (e.key === 'ArrowLeft' && !selectedImage) {
        goToPrevious();
      } else if (e.key === 'ArrowRight' && !selectedImage) {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, paintings.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-[#0a0a0f] dark:via-[#0f0f17] dark:to-[#12121c] mesh-gradient">
      <Header />

      <main className="w-full pt-24">
        {/* Hero Section */}
        <section className="pt-16 pb-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 glass-card rounded-3xl mb-6 group">
                <Palette className="w-10 h-10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h1 className="text-5xl md:text-7xl font-elegant font-bold text-gray-900 dark:text-gray-100 mb-4">
                My Hobbies
              </h1>
              <p className="text-xl md:text-2xl font-body text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Exploring creativity through paintings, photography, and music
              </p>
            </div>
          </div>
        </section>

        {/* Paintings Gallery Section */}
        <section className="py-8 pb-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-elegant font-bold text-gray-900 dark:text-gray-100 mb-2">
                Paintings
              </h2>
              <p className="text-lg font-body text-gray-600 dark:text-gray-400">
                A collection of my artistic expressions
              </p>
            </div>

            {/* Carousel for all screen sizes */}
            {paintings.length > 0 && (
              <div className="relative max-w-4xl mx-auto">
                {/* Navigation Arrows - Desktop Only */}
                {paintings.length > 1 && (
                  <>
                    <button
                      onClick={(e) => goToPrevious(e)}
                      className="hidden sm:flex glass-button p-3 rounded-full transition-all duration-300 hover:scale-110 items-center justify-center group shadow-lg"
                      style={{
                        position: 'absolute',
                        left: '-4rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 30
                      }}
                      aria-label="Previous painting"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                    </button>
                    <button
                      onClick={(e) => goToNext(e)}
                      className="hidden sm:flex glass-button p-3 rounded-full transition-all duration-300 hover:scale-110 items-center justify-center group shadow-lg"
                      style={{
                        position: 'absolute',
                        right: '-4rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 30
                      }}
                      aria-label="Next painting"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                    </button>
                  </>
                )}

                <div 
                  className="relative overflow-hidden min-h-[70vh]"
                  style={{ 
                    position: 'relative', 
                    backgroundColor: 'transparent',
                    touchAction: 'pan-y pinch-zoom'
                  }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div 
                    className="flex transition-transform duration-500 ease-in-out h-full"
                    style={{ 
                      transform: `translateX(-${currentIndex * 100}%)` 
                    }}
                  >
                    {paintings.map((painting, index) => {
                      const dimensions = imageDimensions[painting];
                      const caption = captions[painting];
                      const isLandscape = dimensions?.isLandscape ?? false;
                      return (
                        <div 
                          key={painting} 
                          className="w-full shrink-0 px-4 sm:px-8 flex flex-col relative"
                          style={{
                            justifyContent: isLandscape ? 'center' : 'flex-start'
                          }}
                        >
                          <div 
                            className="relative rounded-3xl w-full"
                            style={{ backgroundColor: 'transparent', overflow: 'visible' }}
                          >
                            <div
                              className="relative w-full cursor-pointer rounded-3xl overflow-hidden"
                              style={{ 
                                padding: 0, 
                                aspectRatio: dimensions ? `${dimensions.width} / ${dimensions.height}` : '4 / 5'
                              }}
                              onClick={() => openLightbox(painting)}
                            >
                              <img
                                src={`/paintings/${painting}`}
                                alt={caption || `Painting ${paintings.indexOf(painting) + 1}`}
                                className="w-full h-full object-contain rounded-3xl"
                                style={{ display: 'block', margin: 0, padding: 0 }}
                                loading="lazy"
                              />
                              {/* Gradient overlay on hover */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl" />
                              
                              {/* Zoom icon and text on hover (desktop only) */}
                              <div className="hidden sm:flex absolute inset-0 flex-col items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300 transform translate-y-4 hover:translate-y-0 pointer-events-none">
                                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-3 edge-glow shadow-2xl">
                                  <ZoomIn className="w-8 h-8 text-white" />
                                </div>
                                <p className="text-white font-body text-sm font-semibold px-4 text-center drop-shadow-lg">
                                  Click to view full size
                                </p>
                              </div>
                            </div>
                          </div>
                          {caption && (
                            <p className="mt-4 sm:mt-6 text-center text-gray-700 dark:text-gray-300 font-body text-base sm:text-lg font-medium px-4">
                              {caption}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Dots Indicator */}
                {paintings.length > 1 && (
                  <div className="flex justify-center mt-6 gap-2">
                    {paintings.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full ${
                          index === currentIndex
                            ? 'w-8 h-2 bg-blue-600 dark:bg-blue-400'
                            : 'w-2 h-2 bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500'
                        }`}
                        aria-label={`Go to painting ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-7xl w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`/paintings/${selectedImage}`}
              alt={captions[selectedImage] || "Full size painting"}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
            {captions[selectedImage] && (
              <div className="mt-6 px-4 text-center">
                <p className="text-white font-body text-xl md:text-2xl font-semibold">
                  {captions[selectedImage]}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}


'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Sun, Moon, Home, User, Briefcase, FolderKanban, Palette } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const menuItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About', icon: User },
    { href: '/experience', label: 'Experience', icon: Briefcase },
    { href: '/projects', label: 'Projects', icon: FolderKanban },
    { href: '/hobbies', label: 'Hobbies', icon: Palette }
  ];

  // Normalize pathname for comparison (remove trailing slash, except for root)
  const normalizedPathname = pathname?.replace(/\/$/, '') || '/';
  
  const isActiveRoute = (href: string) => {
    // For root route, match exactly
    if (href === '/') {
      return normalizedPathname === '/';
    }
    // For other routes, match normalized pathname
    return normalizedPathname === href;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? 'border-gray-200/30 dark:border-gray-800/30' 
            : 'border-transparent'
        }`}
        style={!isScrolled ? { 
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          position: 'fixed',
          background: 'transparent'
        } : {
          position: 'fixed',
          background: theme === 'dark' ? 'rgba(10, 10, 15, 0.4)' : 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link 
                href="/" 
                className="text-3xl font-elegant font-bold hover:text-blue-600 transition-all duration-300 text-gray-900 dark:text-gray-100 hover:scale-105"
              >
                lostmartian
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-12">
              {menuItems.map((item, index) => {
                const isActive = isActiveRoute(item.href);
                return (
                  <div key={item.href}>
                    <Link 
                      href={item.href}
                      className={`relative transition-all duration-300 font-body font-medium group ${
                        isActive 
                          ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                          : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    >
                      {item.label}
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 shadow-lg shadow-blue-500/50 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                    </Link>
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              {mounted ? (
                <button
                  onClick={toggleDarkMode}
                  className="glass-button p-3 rounded-xl transition-all duration-300 group"
                  aria-label="Toggle dark mode"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-yellow-500 group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <Moon className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform duration-300" />
                  )}
                </button>
              ) : (
                <div className="glass-button p-3 rounded-xl w-[44px] h-[44px]" />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-gray-200/30 dark:border-gray-800/30 bg-white/95 dark:bg-[#0a0a0f]/95"
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          position: 'fixed',
        }}
      >
        <div className="flex justify-around items-center px-2 py-2">
          {menuItems.map((item) => {
            const isActive = isActiveRoute(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all duration-300 min-w-[60px] ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
                <span className={`text-xs font-body transition-all duration-300 ${isActive ? 'font-semibold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

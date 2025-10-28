'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/experience', label: 'Experience' },
    { href: '/projects', label: 'Projects' }
  ];

  return (
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
            {menuItems.map((item, index) => (
              <div key={item.href}>
                <Link 
                  href={item.href}
                  className="relative text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-body font-medium group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 group-hover:w-full shadow-lg shadow-blue-500/50"></span>
                </Link>
              </div>
            ))}
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

            {/* Mobile menu button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden glass-button p-3 rounded-xl text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="px-6 py-4 space-y-4 glass rounded-2xl mx-2 mb-4 border-t-0">
            {menuItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-body font-medium py-2 hover:translate-x-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

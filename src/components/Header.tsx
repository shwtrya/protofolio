import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useActiveSection } from '../hooks/useActiveSection';
import { navigationItems } from '../data/navigation';
import { scrollToSection } from '../utils/scrollToSection';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = useActiveSection();

  const scrollHandler = React.useCallback((href: string) => {
    scrollToSection(href, location.pathname, navigate);
    setIsMenuOpen(false);
  }, [location.pathname, navigate]);

  // Fix body scroll ketika menu terbuka
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={() => {
                scrollToSection('#home', location.pathname, navigate);
                setIsMenuOpen(false);
              }}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg text-left text-lg font-bold tracking-tight text-gray-900 transition-colors hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-white dark:hover:text-blue-400 sm:text-xl"
              aria-label="Kembali ke beranda Shawava Tritya"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 text-xs font-black text-white">ST</span>
              <span>Shawava <span className="text-blue-600 dark:text-blue-400">Tritya</span></span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollHandler(item.href)}
                className={`px-2 py-2 text-sm font-medium transition-colors relative ${
                  activeSection === item.id
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {item.label}
                {((location.pathname === '/' && activeSection === item.id) ||
                  (location.pathname === item.route && item.route !== '/')) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - SOLUSI TANPA RONGGA */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/30 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Panel - TANPA BORDER & SHADOW yang bikin rongga */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="lg:hidden fixed top-16 left-0 right-0 bg-white dark:bg-gray-900 z-50"
            >
              {/* Container dengan padding yang ketat */}
              <div className="px-0 py-1">
                {navigationItems.map((item, index) => (
                  <div key={item.id} className="border-0">
                    <button
                      onClick={() => scrollHandler(item.href)}
                      className={`w-full text-left px-6 py-4 text-base font-medium transition-all border-0 ${
                        activeSection === item.id
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      } ${index === 0 ? 'rounded-t-lg' : ''} ${
                        index === navigationItems.length - 1 ? 'rounded-b-lg' : ''
                      }`}
                    >
                      {item.label}
                    </button>
                    
                    {/* Separator yang tidak bikin rongga */}
                    {index < navigationItems.length - 1 && (
                      <div className="mx-6 h-px bg-gray-100 dark:bg-gray-800" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

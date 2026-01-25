import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { navigationItems } from '../data/navigation';
import { scrollToSection } from '../utils/scrollToSection';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSocialClick = () => {
    try {
      if (typeof window !== 'undefined') {
        const currentClicks = parseInt(localStorage.getItem('social_clicks') || '0', 10);
        localStorage.setItem('social_clicks', (currentClicks + 1).toString());
      }
    } catch (error) {
      console.warn('Failed to record social click.', error);
    }
  };

  const footerNavItems = navigationItems.filter((item) => item.id !== 'home');

  const handleFooterNavClick = React.useCallback((href: string) => {
    scrollToSection(href, location.pathname, navigate);
  }, [location.pathname, navigate]);

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand & Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              Shawava<span className="text-blue-400 dark:text-blue-300">Tritya</span>
            </h3>
            <p className="text-gray-400 dark:text-gray-300 leading-relaxed">
              Pelajar SMK Teknik Komputer dan Jaringan yang passionate dalam bidang teknologi, 
              Arduino, IoT, dan pengolahan data dengan fokus pada kualitas dan ketelitian.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:text-center"
          >
            <h4 className="text-lg font-semibold mb-4">Navigasi Cepat</h4>
            <div className="space-y-2">
              {footerNavItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleFooterNavClick(item.href)}
                  className="block w-full text-left text-gray-400 dark:text-gray-300 hover:text-white transition-colors duration-300 focus:outline-none focus-visible:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded"
                >
                  {item.footerLabel}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:text-right"
          >
            <h4 className="text-lg font-semibold mb-4">Terhubung dengan Saya</h4>
            <div className="flex md:justify-end space-x-4">
              <motion.a
                href="https://github.com/CyXd404"
                onClick={handleSocialClick}
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors duration-300 focus:outline-none focus-visible:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GitHub profile"
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/shawava-tritya"
                onClick={handleSocialClick}
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-gray-400 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300 focus:outline-none focus-visible:text-blue-400 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit LinkedIn profile"
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a
                href="mailto:shawavatritya@gmail.com"
                onClick={handleSocialClick}
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-gray-400 dark:text-gray-300 hover:text-emerald-400 dark:hover:text-emerald-300 transition-colors duration-300 focus:outline-none focus-visible:text-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded"
                aria-label="Send email"
              >
                <Mail size={24} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Footer bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="border-t border-gray-800 dark:border-gray-700 pt-8 text-center"
        >
          <p className="text-gray-400 dark:text-gray-300 flex items-center justify-center space-x-1">
            <span>© {currentYear} Shawava Tritya. Made with</span>
            <Heart size={16} className="text-red-500" />
            <span>and lots of coffee</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

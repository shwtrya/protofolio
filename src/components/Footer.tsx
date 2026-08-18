import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { navigationItems } from '../data/navigation';
import { scrollToSection } from '../utils/scrollToSection';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  const footerNavItems = navigationItems.filter((item) => item.id !== 'home');

  const handleSocialClick = () => {
    try {
      const currentClicks = parseInt(localStorage.getItem('social_clicks') || '0', 10);
      localStorage.setItem('social_clicks', String(currentClicks + 1));
    } catch {
      // Analytics must never block navigation.
    }
  };

  const goTop = () => {
    if (location.pathname !== '/') {
      navigate('/');
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      <div className="container-responsive py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md"
          >
            <button type="button" onClick={goTop} className="group inline-flex min-h-[44px] items-center text-left">
              <span className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Shawava <span className="text-blue-400">Tritya</span>
              </span>
            </button>
            <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
              Portfolio pribadi berisi pengalaman Teknik Komputer dan Jaringan, Arduino, IoT,
              instalasi jaringan, dan pengolahan data.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="https://github.com/CyXd404" target="_blank" rel="noopener noreferrer" onClick={handleSocialClick} aria-label="GitHub" className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-800 text-slate-400 transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400">
                <Github size={21} />
              </a>
              <a href="https://www.linkedin.com/in/shawava-tritya" target="_blank" rel="noopener noreferrer" onClick={handleSocialClick} aria-label="LinkedIn" className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-800 text-slate-400 transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400">
                <Linkedin size={21} />
              </a>
              <a href="mailto:shawavatritya@gmail.com" onClick={handleSocialClick} aria-label="Email" className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-800 text-slate-400 transition hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400">
                <Mail size={21} />
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">Navigasi</h3>
            <nav className="mt-5 grid grid-cols-2 gap-x-5 gap-y-1 sm:grid-cols-3 lg:grid-cols-1">
              {footerNavItems.map((item) => (
                <button key={item.id} type="button" onClick={() => scrollToSection(item.href, location.pathname, navigate)} className="min-h-[44px] text-left text-sm text-slate-400 transition hover:text-white">
                  {item.footerLabel}
                </button>
              ))}
            </nav>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">Kontak</h3>
            <p className="mt-5 text-sm leading-7 text-slate-400">Terbuka untuk peluang kerja, kolaborasi teknis, dan proyek baru.</p>
            <a href="mailto:shawavatritya@gmail.com" className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-blue-300">
              <Mail size={17} /> Kirim email
            </a>
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Shawava Tritya. Dibuat dengan teliti.</p>
          <button type="button" onClick={goTop} className="inline-flex min-h-[44px] items-center gap-2 self-start text-slate-400 transition hover:text-white sm:self-auto">
            Kembali ke atas <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

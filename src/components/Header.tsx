import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plus, X } from 'lucide-react';
import { profile } from '../data/navigation';
import { scrollToSection } from '../utils/scrollToSection';
import CvPreview from './CvPreview';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = useCallback(
    (href: string) => {
      setOpen(false);
      setTimeout(() => {
        scrollToSection(href, location.pathname, navigate);
      }, 100);
    },
    [location.pathname, navigate]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const navItems = [
    { num: '01', label: 'Home', href: '#home' },
    { num: '02', label: 'About', href: '#about' },
    { num: '03', label: 'Experience', href: '#experience' },
    { num: '04', label: 'Projects', href: '#projects' },
    { num: '05', label: 'Credentials', href: '#certificates' },
    { num: '06', label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 flex items-center justify-between px-6 py-5 sm:px-10 sm:py-6 lg:px-16 pointer-events-none transition-all">
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="flex items-center gap-3 select-none pointer-events-auto group cursor-pointer"
          aria-label="Kembali ke beranda"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111114] text-white font-editorial text-xl italic font-bold shadow-md transition-transform duration-300 group-hover:scale-105">
            S
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] font-semibold text-[#111114] group-hover:text-black transition-colors">
            Shawava / Portfolio
          </span>
        </a>

        {/* Right Action Group */}
        <div className="pointer-events-auto flex items-center gap-3">
          <CvPreview
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#111114]/15 bg-white/85 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#111114] shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-white hover:border-[#111114]/30 cursor-pointer"
            label="Resume"
            showIcon={true}
          />

          {/* Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
            className="inline-flex items-center gap-2 rounded-full border border-[#111114]/15 bg-[#111114] px-4 py-2 sm:px-5 sm:py-2.5 font-mono text-xs uppercase tracking-widest font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#25252a] hover:scale-105 cursor-pointer"
          >
            <span>{open ? 'Close' : 'Menu'}</span>
            {open ? <X size={15} /> : <Plus size={15} />}
          </button>
        </div>
      </header>

      {/* Fullscreen / Drawer Menu Backdrop */}
      {open && (
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Slide-over Menu Panel (matching iqmal.dev) */}
      <aside
        data-lenis-prevent="true"
        aria-hidden={!open}
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-[#18181c] text-[#f4f4f1] z-50 flex flex-col justify-between p-8 sm:p-12 overflow-y-auto shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Top bar inside drawer */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10">
          <span className="font-mono text-xs uppercase tracking-widest text-white/50">
            Navigation
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Tutup menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Big Staggered Nav Links */}
        <nav className="my-auto py-8">
          <ul className="flex flex-col gap-4 sm:gap-6">
            {navItems.map((item) => (
              <li key={item.num} className="overflow-hidden">
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="group flex items-baseline gap-4 text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white/75 transition-all duration-300 hover:text-white hover:translate-x-2"
                >
                  <span className="font-mono text-xs sm:text-sm text-white/30 group-hover:text-white/70 transition-colors">
                    {item.num}
                  </span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Social & Resume Links */}
        <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
          <div className="flex flex-wrap gap-4 font-mono text-xs uppercase tracking-wider text-white/50">
            <CvPreview
              className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-white/50 font-mono text-xs uppercase"
              label="Resume"
            />
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`https://wa.me/${profile.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              WhatsApp
            </a>
          </div>

          <p className="font-mono text-[10px] uppercase text-white/30">
            © 2026 Shawava Tritya. All rights reserved.
          </p>
        </div>
      </aside>
    </>
  );
};

export default Header;

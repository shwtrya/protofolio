import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plus, X } from 'lucide-react';
import { profile } from '../data/navigation';
import { scrollToSection } from '../utils/scrollToSection';
import CvPreview from './CvPreview';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);
  const lastScrollY = useRef(0);
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

  // Smart hide on scroll down & reveal on scroll up (exact iqmal.dev behavior)
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          if (currentY <= 60) {
            setHidden(false);
          } else if (currentY > lastScrollY.current + 10) {
            // Scrolling down
            setHidden(true);
          } else if (currentY < lastScrollY.current - 10) {
            // Scrolling up
            setHidden(false);
          }
          lastScrollY.current = currentY;

          // Check if header is currently over a dark section (#about, #experience, #contact)
          const darkSections = ['about', 'experience', 'contact'];
          let overDark = false;
          for (const id of darkSections) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              // If the top 80px of viewport touches this section
              if (rect.top <= 70 && rect.bottom >= 30) {
                overDark = true;
                break;
              }
            }
          }
          setIsOverDark(overDark);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      {/* Staggered Menu Header matching iqmal.dev exact markup & transitions */}
      <header
        aria-label="Main navigation header"
        className={`staggered-menu-header fixed top-0 left-0 w-full flex items-center justify-between px-6 py-5 sm:px-10 sm:py-6 lg:px-16 pointer-events-none z-40 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        {/* Brand / Logo (Avatar + Pill Copy matching iqmal.dev) */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="sm-logo flex items-center gap-2.5 select-none pointer-events-auto group cursor-pointer"
          aria-label="Kembali ke beranda"
        >
          <span className="sm-logo-mark grid h-9 w-9 place-items-center rounded-full bg-[#111114] text-[#e8e8e5] font-editorial text-xl italic font-bold shadow-md transition-transform duration-300 group-hover:scale-105">
            <span className="block -translate-x-[1px]">S</span>
          </span>
          <span
            className={`sm-logo-copy rounded-full px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md shadow-sm transition-all duration-300 ${
              isOverDark
                ? 'border border-white/20 bg-[#18181c]/90 text-[#f4f4f1] shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                : 'border border-[#111114]/12 bg-[#e8e8e5]/90 text-[#111114] shadow-[0_4px_20px_rgba(17,17,20,0.06)]'
            }`}
          >
            Shawava / Portfolio
          </span>
        </a>

        {/* Menu Toggle Pill Button (exact iqmal.dev) */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          aria-expanded={open}
          className={`sm-toggle pointer-events-auto relative inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-105 cursor-pointer ${
            isOverDark
              ? 'border border-white/20 bg-[#18181c]/90 text-[#f4f4f1] shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:bg-[#25252a]'
              : 'border border-[#111114]/12 bg-[#e8e8e5]/90 text-[#111114] shadow-[0_4px_20px_rgba(17,17,20,0.06)] hover:bg-white'
          }`}
        >
          <span>{open ? 'Close' : 'Menu'}</span>
          <span className="relative w-3.5 h-3.5 inline-flex items-center justify-center">
            {open ? <X size={14} /> : <Plus size={14} />}
          </span>
        </button>
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
            className="rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
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

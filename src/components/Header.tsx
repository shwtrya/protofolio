import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plus, X } from 'lucide-react';
import { profile } from '../data/navigation';
import { scrollToSection } from '../utils/scrollToSection';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const lastScrollYRef = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll direction detection: hide when scrolling down, show when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      if (currentScrollY <= 60) {
        setHidden(false);
      } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 6) {
        setHidden(true);
      } else if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 6) {
        setHidden(false);
      }

      lastScrollYRef.current = currentScrollY;

      // Detect dark section intersection
      const darkSections = document.querySelectorAll('#about, #experience, #contact');
      let overDark = false;
      const headerLine = 48; // px from top
      darkSections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= headerLine && rect.bottom >= headerLine) {
          overDark = true;
        }
      });
      setIsDarkSection(overDark);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Credentials', href: '#certificates' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = useCallback(
    (href: string) => {
      setOpen(false);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollToSection(href), 150);
      } else {
        scrollToSection(href);
      }
    },
    [location.pathname, navigate]
  );

  return (
    <>
      {/* Top Header - Exact iqmal.dev layout & padding */}
      <header
        role="banner"
        aria-label="Navigasi Utama"
        className={`fixed top-0 left-0 w-full z-40 px-6 sm:px-10 lg:px-24 py-5 sm:py-6 lg:py-8 flex items-center justify-between pointer-events-none transition-transform duration-500 will-change-transform ${
          hidden && !open ? '-translate-y-[120%]' : 'translate-y-0'
        }`}
      >
        {/* Brand / Logo (Left) */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="flex items-center gap-2.5 select-none pointer-events-auto group cursor-pointer"
          aria-label="Kembali ke beranda"
        >
          {/* Logo Mark */}
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#111114] text-[#e8e8e5] font-serif italic text-lg leading-none shadow-md transition-transform duration-300 group-hover:scale-105">
            <span className="block -translate-x-[1px]">S</span>
          </span>

          {/* Logo Copy Pill */}
          <span
            className={`h-9 inline-flex items-center px-3.5 border rounded-full font-mono text-[11px] font-semibold tracking-[0.18em] uppercase shadow-sm backdrop-blur-md transition-all duration-300 ${
              isDarkSection
                ? 'bg-[#18181c]/90 border-white/20 text-[#f4f4f1]'
                : 'bg-[#e8e8e5]/90 border-[#111114]/12 text-[#111114]'
            }`}
          >
            Shawava / Portfolio
          </span>
        </a>

        {/* Menu Toggle Button (Right) */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Tutup navigasi' : 'Buka navigasi'}
          className={`pointer-events-auto h-9 inline-flex items-center gap-2 px-4 border rounded-full font-mono text-xs font-semibold tracking-[0.12em] uppercase shadow-sm backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-105 ${
            isDarkSection
              ? 'bg-[#18181c]/90 border-white/20 text-[#f4f4f1]'
              : 'bg-[#e8e8e5]/90 border-[#111114]/12 text-[#111114]'
          }`}
        >
          <span>{open ? 'Close' : 'Menu'}</span>
          <span className="relative w-3.5 h-3.5 inline-flex items-center justify-center">
            {open ? <X size={14} /> : <Plus size={14} />}
          </span>
        </button>
      </header>

      {/* Slide-over Drawer Backdrop */}
      {open && (
        <div
          role="presentation"
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        />
      )}

      {/* Slide-over Drawer Panel */}
      <aside
        id="navigation-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Panel Navigasi"
        className={`fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[420px] bg-[#111114] text-[#e8e8e5] p-8 sm:p-10 flex flex-col justify-between transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? 'translate-x-0 shadow-2xl' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#111114] font-serif italic text-base leading-none font-bold">
              <span className="block -translate-x-[1px]">S</span>
            </span>
            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-white/70">
              Navigasi
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Tutup panel navigasi"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Drawer Nav Links */}
        <nav aria-label="Daftar Seksi Halaman" className="flex flex-col gap-2 my-auto py-6">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="group flex items-center justify-between py-3 border-b border-white/5 transition-all duration-300 hover:pl-2"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-white/30 group-hover:text-white/70 transition-colors">
                  0{index + 1}
                </span>
                <span className="font-serif text-2xl sm:text-3xl text-white/80 group-hover:text-white transition-colors">
                  {item.label}
                </span>
              </div>
              <span className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                →
              </span>
            </a>
          ))}
        </nav>

        {/* Drawer Footer Info */}
        <div className="border-t border-white/10 pt-6 flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs font-mono text-white/50">
            <span>STATUS</span>
            <span className="flex items-center gap-2 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Siap Bekerja &amp; PKL
            </span>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-white/50">
            <span>LOKASI</span>
            <span className="text-white/80">Bogor, Jawa Barat</span>
          </div>

          <div className="flex gap-4 pt-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-white/60 hover:text-white transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-white/60 hover:text-white transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-xs text-white/60 hover:text-white transition-colors"
            >
              Email ↗
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;

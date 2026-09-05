import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle, Plus, X } from 'lucide-react';
import { profile } from '../data/navigation';
import { scrollToSection } from '../utils/scrollToSection';
import CvPreview from './CvPreview';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { num: '01', id: 'home', href: '#home', label: 'Home' },
    { num: '02', id: 'about', href: '#about', label: 'About' },
    { num: '03', id: 'experience', href: '#experience', label: 'Experiences' },
    { num: '04', id: 'projects', href: '#projects', label: 'Projects' },
    { num: '05', id: 'credentials', href: '#credentials', label: 'Credentials' },
    { num: '06', id: 'contact', href: '#contact', label: 'Contact' },
  ];

  const handleNavClick = useCallback(
    (href: string) => {
      scrollToSection(href, location.pathname, navigate);
      setOpen(false);
    },
    [location.pathname, navigate],
  );

  // Esc key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false);
    };
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-20 items-center justify-between px-5 sm:px-10 lg:px-16 pointer-events-none">
        {/* Left: Brand badge */}
        <button
          type="button"
          onClick={() => handleNavClick('#home')}
          className="pointer-events-auto group flex items-center gap-3 rounded-full border border-foreground/10 bg-background/80 px-2 py-1.5 backdrop-blur-md transition-all hover:border-foreground/30 shadow-sm"
          aria-label="Ke Beranda"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background font-editorial text-xl font-bold italic transition-transform group-hover:scale-105">
            S
          </span>
          <span className="font-mono text-[0.68rem] font-semibold tracking-[0.2em] text-foreground pr-2 sm:pr-3">
            SHAWAVA <span className="opacity-40">/</span> PORTFOLIO
          </span>
        </button>

        {/* Right: Pill Menu Trigger */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group flex items-center gap-2 rounded-full border border-foreground/15 bg-background/85 px-4 py-2 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-foreground backdrop-blur-md transition-all hover:bg-foreground hover:text-background shadow-sm"
            aria-expanded={open}
            aria-label="Buka Menu"
          >
            <span>MENU</span>
            <Plus size={15} className="transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-[#141416] text-[#f4f4f1] transition-all duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu Navigasi"
      >
        {/* Top bar inside menu */}
        <div className="flex h-20 items-center justify-between px-5 sm:px-10 lg:px-16 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#141416] font-editorial text-xl font-bold italic">
              S
            </span>
            <span className="font-mono text-[0.68rem] font-semibold tracking-[0.2em] text-white/80">
              SHAWAVA <span className="opacity-40">/</span> NAVIGATION
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-[#141416]"
            aria-label="Tutup Menu"
          >
            <span>CLOSE</span>
            <X size={15} />
          </button>
        </div>

        {/* Center: Large staggered links */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-14 lg:px-24 max-w-6xl mx-auto w-full py-8 overflow-y-auto">
          <nav className="flex flex-col space-y-3 sm:space-y-4" aria-label="Navigasi Utama">
            {menuItems.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.href)}
                style={{
                  transitionDelay: open ? `${idx * 40}ms` : '0ms',
                  transform: open ? 'translateY(0)' : 'translateY(15px)',
                }}
                className="group flex items-baseline gap-4 sm:gap-6 text-left transition-all duration-300 py-1"
              >
                <span className="font-mono text-xs sm:text-sm text-white/40 tracking-[0.2em] group-hover:text-white transition-colors">
                  {item.num}
                </span>
                <span className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white/80 group-hover:text-white group-hover:translate-x-3 transition-all duration-200">
                  {item.label}
                </span>
                <ArrowUpRight
                  size={24}
                  className="opacity-0 -translate-x-2 text-white transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 hidden sm:inline"
                />
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom bar: Socials & Quick actions */}
        <div className="border-t border-white/10 px-6 sm:px-14 lg:px-24 py-6">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-white/70">
              <span className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-white/40 mr-1">
                Sosial:
              </span>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`https://wa.me/${profile.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>

            <div className="flex items-center gap-4">
              <CvPreview
                className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-[0.68rem] tracking-[0.18em] uppercase text-white hover:bg-white hover:text-[#141416] transition-colors"
                label="RESUME CV"
              />
              <span className="font-mono text-[0.68rem] text-white/40">
                CILEUNGSI, ID
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

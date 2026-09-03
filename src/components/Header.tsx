import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useActiveSection } from '../hooks/useActiveSection';
import { navigationItems } from '../data/navigation';
import { scrollToSection } from '../utils/scrollToSection';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = useActiveSection();

  const scrollHandler = useCallback(
    (href: string) => {
      scrollToSection(href, location.pathname, navigate);
      setOpen(false);
    },
    [location.pathname, navigate],
  );

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    document.body.style.touchAction = open ? 'none' : '';
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [open]);

  const isActive = (id: string, route: string) =>
    (location.pathname === '/' && activeSection === id) ||
    (route !== '/' && location.pathname === route);

  return (
    <header className="header-bar fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b border-line backdrop-blur-md">
      <div className="container-responsive flex h-full items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => scrollHandler('#home')}
          className="flex flex-shrink-0 items-center gap-2 text-left font-bold tracking-tight text-fg"
          aria-label="Ke beranda"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-accent text-[10px] font-black text-accent-fg">
            ST
          </span>
          <span className="hidden sm:inline">
            Shawava <span className="text-accent">Tritya</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Navigasi utama">
          {navigationItems.map((item) => {
            const active = isActive(item.id, item.route);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollHandler(item.href)}
                aria-current={active ? 'true' : undefined}
                className={`relative rounded-[8px] px-3 py-2 text-sm font-medium transition-colors ${
                  active ? 'text-accent' : 'text-muted hover:text-fg'
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-accent" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex flex-shrink-0 items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="lg:hidden btn-icon"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <>
          <div
            className="fixed inset-0 top-[var(--header-h)] z-40 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <nav
            className="fixed left-0 right-0 top-[var(--header-h)] z-50 max-h-[calc(100vh-var(--header-h))] overflow-y-auto border-b border-line bg-bg px-4 pb-5 pt-2 lg:hidden"
            aria-label="Navigasi mobile"
          >
            {navigationItems.map((item) => {
              const active = isActive(item.id, item.route);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollHandler(item.href)}
                  aria-current={active ? 'true' : undefined}
                  className={`block w-full rounded-[8px] px-4 py-3 text-left text-base font-medium transition-colors ${
                    active ? 'bg-accent-soft text-accent' : 'text-fg hover:bg-surface'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;

import { Github, Linkedin, Mail } from 'lucide-react';
import { navigationItems, profile } from '../data/navigation';
import { scrollToSectionById } from '../utils/scrollToSection';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface py-12">
      <div className="container-responsive flex flex-col gap-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-md">
            <p className="font-bold text-fg">
              Shawava <span className="text-accent">Tritya</span>
            </p>
            <p className="t-body mt-1 text-sm">
              Lulusan SMK Negeri 1 Cileungsi (TKJ). Berfokus pada Arduino, IoT, instalasi
              jaringan, dan pekerjaan data.
            </p>
          </div>

          {/* Quick nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Navigasi footer">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSectionById(item.id)}
                className="text-muted hover:text-fg transition-colors"
              >
                {item.footerLabel}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-xs text-muted">
          <p>© {year} {profile.name}</p>

          <div className="flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-fg transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-fg transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-muted hover:text-fg transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

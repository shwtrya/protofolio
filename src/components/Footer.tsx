import { ArrowUpRight } from 'lucide-react';
import { profile } from '../data/navigation';
import CvPreview from './CvPreview';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="relative z-10 w-full bg-[#141416] text-white flex flex-col justify-between overflow-hidden px-6 py-20 sm:px-10 text-center lg:px-24 lg:py-24"
    >
      {/* Watermark text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center text-center text-[clamp(5rem,20vw,20rem)] font-bold leading-none tracking-[-0.075em] text-white/[0.025] blur-[3px]"
      >
        CONTACT
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between items-center gap-12 sm:gap-16">
        {/* Kicker */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-white/50">
            GET IN TOUCH
          </p>
        </div>

        {/* Big Headline & Email */}
        <div className="flex flex-col items-center gap-8 max-w-4xl">
          <h2
            id="contact-heading"
            className="text-[clamp(3rem,8.5vw,7.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-white"
          >
            <span>Let's Work</span>
            <br />
            <span className="font-editorial font-normal italic lowercase text-white/90">
              together.
            </span>
          </h2>

          <div className="mt-4 flex flex-col items-center gap-8">
            <a
              href={`mailto:${profile.email}`}
              className="group relative inline-flex items-center gap-2 text-xl sm:text-3xl lg:text-4xl font-light text-white/80 transition-colors duration-300 hover:text-white"
            >
              <span>{profile.email}</span>
              <ArrowUpRight
                size={24}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
              <span className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </a>

            {/* Social / Direct Links */}
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 font-mono text-xs uppercase tracking-wider text-white/50">
              <CvPreview
                className="hover:text-white transition-colors duration-300 cursor-pointer bg-transparent border-0 p-0 text-white/50"
                label="Resume"
              />
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                Github
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                Linkedin
              </a>
              <a
                href={`https://wa.me/${profile.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Mascot / Icon & Copyright */}
        <div className="flex flex-col items-center gap-5 pt-8 border-t border-white/10 w-full max-w-3xl">
          {/* Subtle 8-bit / tech robot mascot matching iqmal.dev */}
          <div className="text-white/40 hover:text-white transition-colors duration-300">
            <svg
              width="36"
              height="36"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="animate-pulse"
              style={{ animationDuration: '3s' }}
            >
              <rect x="2" y="1" width="2" height="3" />
              <rect x="12" y="1" width="2" height="3" />
              <rect x="4" y="3" width="8" height="9" />
              <rect x="3" y="4" width="10" height="7" />
              <rect x="5" y="6" width="1" height="1" fill="#10b981" />
              <rect x="10" y="6" width="1" height="1" fill="#10b981" />
              <rect x="7" y="8" width="2" height="1" fill="#111114" />
              <rect x="3" y="12" width="2" height="2" />
              <rect x="11" y="12" width="2" height="2" />
            </svg>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between w-full font-mono text-[10px] uppercase tracking-widest text-white/35 gap-2">
            <span>CILEUNGSI, BOGOR (WIB · UTC+7)</span>
            <span>© {currentYear} Shawava Tritya. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

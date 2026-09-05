import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '../data/navigation';
import CvPreview from './CvPreview';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (wordsRef.current && footerRef.current) {
        const words = wordsRef.current.querySelectorAll('.contact-word');
        gsap.fromTo(
          words,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 0.6,
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="contact-section relative z-10 w-full bg-[#141416] text-white flex flex-col justify-between overflow-hidden px-6 py-20 sm:px-10 text-center md:sticky md:bottom-0 md:min-h-[560px] md:px-24 md:py-20"
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
            ref={wordsRef}
            id="contact-heading"
            className="text-[clamp(3rem,8.5vw,7.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-white"
          >
            <span className="inline-block overflow-hidden py-1">
              <span className="contact-word inline-block will-change-transform">
                Let's
              </span>
            </span>{' '}
            <span className="inline-block overflow-hidden py-1">
              <span className="contact-word inline-block will-change-transform">
                Work
              </span>
            </span>
            <br />
            <span className="inline-block overflow-hidden py-1">
              <span className="contact-word font-editorial font-normal italic lowercase text-white/90 inline-block will-change-transform">
                together.
              </span>
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

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full border-t border-white/10 pt-8 font-mono text-[0.72rem] text-white/40">
          <p>© {currentYear} Shawava Tritya. All rights reserved.</p>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Cileungsi, Bogor (WIB · UTC+7)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

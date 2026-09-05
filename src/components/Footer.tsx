import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { profile } from '../data/navigation';
import CvPreview from './CvPreview';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Exact GSAP matchMedia scroll trigger from iqmal.dev
  useGSAP(
    () => {
      const section = sectionRef.current;
      const headline = headlineRef.current;
      const watermark = watermarkRef.current;
      const email = emailRef.current;
      const bottom = bottomRef.current;

      if (!section || !headline || !watermark || !email || !bottom) return;

      const mm = gsap.matchMedia();

      return mm.add(
        {
          isAll: '(min-width: 0px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { reduceMotion } = context.conditions ?? {};
          const words = headline.querySelectorAll('.contact-word');

          if (reduceMotion) {
            gsap.set([headline, watermark, email, bottom, words], { clearProps: 'all' });
            return;
          }

          // Watermark parallax
          gsap.fromTo(
            watermark,
            { yPercent: -15, opacity: 0 },
            {
              yPercent: 15,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: true,
              },
            }
          );

          // Words curtain stagger reveal
          gsap
            .timeline({
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: 0.85,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(
              words,
              { yPercent: 100, opacity: 0 },
              { yPercent: 0, opacity: 1, stagger: 0.15, duration: 1.2, ease: 'power2.out' },
              0
            )
            .fromTo(email, { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: 'power1.out', duration: 1 }, 0.4)
            .fromTo(bottom, { y: 40, opacity: 0 }, { y: 0, opacity: 1, ease: 'power1.out', duration: 0.8 }, 0.65);
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <footer
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="contact-section relative z-20 w-full bg-[#141416] text-white flex flex-col justify-between overflow-hidden px-6 py-20 sm:px-10 text-center md:min-h-[580px] md:px-24 md:py-24"
    >
      {/* Watermark background text (exact iqmal.dev parallax) */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center text-center font-serif text-[clamp(5rem,20vw,20rem)] font-bold italic leading-none tracking-tight text-white/[0.03] blur-[2px] will-change-transform"
      >
        CONTACT
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between items-center gap-12 sm:gap-16">
        {/* Kicker */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-white/50">
            05 / GET IN TOUCH
          </p>
        </div>

        {/* Big Headline & Email */}
        <div className="flex flex-col items-center gap-8 max-w-4xl">
          <h2
            ref={headlineRef}
            id="contact-heading"
            className="text-[clamp(3rem,8.5vw,7.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-white"
          >
            <span className="inline-block overflow-hidden py-1">
              <span className="contact-word inline-block will-change-transform">Let's</span>
            </span>{' '}
            <span className="inline-block overflow-hidden py-1">
              <span className="contact-word inline-block will-change-transform">Work</span>
            </span>
            <br />
            <span className="inline-block overflow-hidden py-1">
              <span className="contact-word inline-block font-editorial font-normal italic lowercase text-white/90 will-change-transform">
                together.
              </span>
            </span>
          </h2>

          <div ref={emailRef} className="mt-4 flex flex-col items-center gap-8">
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
                showIcon={false}
              />
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                LinkedIn
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

        {/* Bottom Colophon Bar */}
        <div
          ref={bottomRef}
          className="flex w-full flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8 font-mono text-[0.7rem] text-white/40"
        >
          <div>
            © {currentYear} Shawava Tritya. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>GMT+7 · BOGOR, ID</span>
            <span className="inline-flex items-center gap-1.5 text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              STATUS: OPEN TO WORK
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

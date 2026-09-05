import { useEffect, useRef } from 'react';
import { Award, Briefcase, Cpu } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text scrub animation
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0.25, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 0.8,
            },
          }
        );
      }

      // Cards staggered reveal
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative z-20 bg-[#18181c] text-[#f4f4f1] px-6 pt-24 pb-20 sm:px-10 sm:pt-32 sm:pb-28 lg:px-20 curved-dark-entry shadow-[0_-25px_50px_rgba(0,0,0,0.2)]"
    >
      <h2 id="about-heading" className="sr-only">
        Tentang Shawava Tritya
      </h2>

      <div className="relative z-10 mx-auto max-w-5xl flex flex-col items-center text-center">
        {/* Kicker */}
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-white/50">
          PHILOSOPHY &amp; BACKGROUND
        </p>

        {/* Big Statement Typography */}
        <p
          ref={textRef}
          className="mt-8 text-2xl sm:text-4xl lg:text-5xl font-medium leading-[1.35] tracking-tight text-white/45 transition-colors"
        >
          Saya merancang{' '}
          <span className="text-white font-semibold">
            solusi jaringan &amp; perangkat keras IoT
          </span>{' '}
          dengan{' '}
          <span className="text-white font-semibold">eksekusi disiplin</span>,{' '}
          <span className="text-white font-semibold">infrastruktur handal</span>, dan{' '}
          <span className="text-white font-semibold">alur kerja terstruktur</span>
          —membantu tim mewujudkan sistem teknis yang efisien dan siap pakai.
        </p>

        {/* Bento Stats Row */}
        <div
          ref={cardsRef}
          className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-left"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm transition-transform duration-300 hover:border-white/20">
            <div className="flex items-center gap-3 text-white/40 mb-4">
              <Award size={20} />
              <span className="font-mono text-[0.68rem] tracking-[0.2em] uppercase">
                Pendidikan
              </span>
            </div>
            <div className="font-editorial text-4xl sm:text-5xl font-bold text-white italic">
              85 / 100
            </div>
            <p className="mt-2 text-sm text-white/60 leading-relaxed">
              Nilai rata-rata Ijazah SMK Negeri 1 Cileungsi kompetensi Teknik Komputer dan Jaringan.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm transition-transform duration-300 hover:border-white/20">
            <div className="flex items-center gap-3 text-white/40 mb-4">
              <Briefcase size={20} />
              <span className="font-mono text-[0.68rem] tracking-[0.2em] uppercase">
                Pengalaman
              </span>
            </div>
            <div className="font-editorial text-4xl sm:text-5xl font-bold text-white italic">
              3+ Peran
            </div>
            <p className="mt-2 text-sm text-white/60 leading-relaxed">
              Pengalaman nyata: Magang produksi di PT Rekadaya, PT Serin, serta freelance data entry.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm transition-transform duration-300 hover:border-white/20">
            <div className="flex items-center gap-3 text-white/40 mb-4">
              <Cpu size={20} />
              <span className="font-mono text-[0.68rem] tracking-[0.2em] uppercase">
                Kompetensi
              </span>
            </div>
            <div className="font-editorial text-4xl sm:text-5xl font-bold text-white italic">
              100% Praktik
            </div>
            <p className="mt-2 text-sm text-white/60 leading-relaxed">
              Fokus pada wiring prototype, konfigurasi perangkat router/switch, dan troubleshooting langsung.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import { useRef } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: string;
  num: string;
  title: string;
  org: string;
  place: string;
  period: string;
  duration: string;
  type: string;
  overview: string;
  highlights: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 'rekadaya',
    num: '01',
    title: 'Operator Produksi',
    org: 'PT Rekadaya Multi Adiprima',
    place: 'Ciangsana, Bogor',
    period: 'Sep 2024 — Des 2024',
    duration: '4 bulan',
    type: 'PKL / Industri',
    overview:
      'Menjalankan tugas lini produksi manufaktur otomotif dengan memprioritaskan ketelitian sortasi material, perakitan part presisi, dan standardisasi kualitas.',
    highlights: [
      'Sortir material & verifikasi spesifikasi fisik komponen',
      'Assembly double tape pada part felt secara presisi dan rapi',
      'Quality check produk akhir sebelum masuk packaging distribusi',
      'Mencapai target output kerja harian dengan kedisiplinan tinggi',
    ],
  },
  {
    id: 'serin',
    num: '02',
    title: 'Operator Produksi',
    org: 'PT Serin Indonesia',
    place: 'Bekasi, Jawa Barat',
    period: 'Jun 2024 — Sep 2024',
    duration: '4 bulan',
    type: 'PKL / Industri',
    overview:
      'Mendukung kelancaran lini produksi perlengkapan dan tas dengan mematuhi instruksi kerja, persiapan komponen, serta pengeleman rapi sesuai standar.',
    highlights: [
      'Pemasangan aksesoris silinder pada zipper tas sesuai SOP',
      'Aplikasi perekat dan lem presisi pada material sebelum penjahitan',
      'Pemeriksaan kerapian visual dan fungsi mekanik komponen',
      'Menjaga kebersihan area kerja (5S) serta perawatan alat produksi',
    ],
  },
  {
    id: 'wova',
    num: '03',
    title: 'Data Entry Specialist',
    org: 'PT Wova Group Indonesia',
    place: 'Cileungsi, Bogor',
    period: '2023 — 2025',
    duration: 'Freelance',
    type: 'Administrasi',
    overview:
      'Menginput, merapikan, dan memverifikasi data operasional pelanggan secara teliti untuk memastikan konsistensi database digital dan kemudahan pembuatan laporan.',
    highlights: [
      'Input data berkala dan validasi field untuk mencegah duplikasi',
      'Pembersihan dan standardisasi format record berulang',
      'Penyusunan rekapitulasi data siap baca untuk tim administrasi',
      'Pemanfaatan spreadsheet digital mempercepat verifikasi data',
    ],
  },
];

export const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  // Exact GSAP matchMedia scroll trigger from iqmal.dev
  useGSAP(
    () => {
      const section = sectionRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      const progressBar = progressBarRef.current;
      const watermark = watermarkRef.current;
      const header = headerRef.current;
      const mobileContainer = mobileContainerRef.current;

      if (!section || !watermark || !header) return;

      const mm = gsap.matchMedia();

      return mm.add(
        {
          isDesktop: '(min-width: 1024px)',
          isMobileTablet: '(max-width: 1023px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isDesktop, isMobileTablet, reduceMotion } = context.conditions ?? {};
          const desktopCards = track?.querySelectorAll('[data-experience-card]') ?? [];
          const mobileCards = mobileContainer?.querySelectorAll('[data-experience-card]') ?? [];

          if (reduceMotion) {
            gsap.set([track, progressBar, watermark, header, desktopCards, mobileCards], {
              clearProps: 'all',
            });
            return;
          }

          // Watermark blur, scale, and opacity scrub
          ScrollTrigger.create({
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            animation: gsap.fromTo(
              watermark,
              { opacity: 0, filter: 'blur(20px)', scale: 0.8 },
              { opacity: 1, filter: 'blur(3px)', scale: 1, ease: 'none' }
            ),
            invalidateOnRefresh: true,
          });

          // Mobile / Tablet layout
          if (isMobileTablet) {
            gsap.fromTo(
              header,
              { opacity: 0, y: 18 },
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: 'power2.out',
                scrollTrigger: { trigger: section, start: 'top 72%' },
              }
            );

            gsap.fromTo(
              mobileCards,
              { opacity: 0, y: 70, scale: 0.96 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.12,
                duration: 0.75,
                ease: 'power3.out',
                scrollTrigger: { trigger: mobileContainer, start: 'top 78%' },
              }
            );
            return;
          }

          // Desktop horizontal pin & scroll
          if (!isDesktop || !viewport || !track || !progressBar) return;

          const scrollDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${scrollDistance() + window.innerHeight}`,
              pin: true,
              scrub: 0.85,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          gsap.set(header, { opacity: 0, y: 20 });
          gsap.set(desktopCards, { opacity: 0, y: 120, scale: 0.92 });

          tl.fromTo(header, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0)
            .fromTo(
              desktopCards,
              { opacity: 0, y: 120, scale: 0.92 },
              { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.8, ease: 'power2.out' },
              0.05
            )
            .to(track, { x: () => -scrollDistance(), ease: 'none' }, 0.2);

          tl.to(progressBar, { scaleX: 1, ease: 'none' }, 0.2);
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-labelledby="experience-heading"
      className="relative bg-[#111114] text-[#f4f4f1] py-24 sm:py-32 overflow-hidden"
    >
      {/* Background Parallax Watermark (exact iqmal.dev) */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-serif text-[clamp(5rem,18vw,16rem)] font-bold italic tracking-tight text-white/[0.03] leading-none will-change-transform"
      >
        EXPERIENCE
      </div>

      {/* Top Subtle Track Bar */}
      <div className="absolute top-0 inset-x-0 h-1 bg-white/10">
        <div
          ref={progressBarRef}
          className="h-full w-full bg-white origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Header Container */}
      <div ref={headerRef} className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 mb-12 sm:mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-white/50">
              02 / Work &amp; Roles
            </p>
            <h2
              id="experience-heading"
              className="mt-2 font-serif text-4xl sm:text-6xl text-white tracking-tight"
            >
              Pengalaman <span className="font-editorial italic font-normal text-white/80">Kerja.</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-white/60 max-w-md">
            Rekam jejak praktik lapangan di sektor industri manufaktur otomotif, garmen, dan entri data administrasi digital.
          </p>
        </div>
      </div>

      {/* Desktop Horizontal Pinning Track (min-width: 1024px) */}
      <div
        ref={viewportRef}
        className="relative z-10 hidden lg:block w-full overflow-hidden px-6 sm:px-10"
      >
        <div
          ref={trackRef}
          className="flex gap-8 will-change-transform w-fit pb-8"
        >
          {experiences.map((exp) => (
            <div
              key={exp.id}
              data-experience-card="true"
              className="w-[440px] shrink-0 rounded-3xl border border-white/10 bg-white/[0.035] p-8 sm:p-10 backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <span className="font-mono text-xs text-white/40">{exp.num}</span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-white/80">
                    {exp.type}
                  </span>
                </div>
                <h3 className="font-serif text-3xl text-white font-normal leading-tight">
                  {exp.title}
                </h3>
                <p className="mt-1 font-sans text-base text-white/90 font-medium">
                  {exp.org}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/50 font-sans">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} /> {exp.place}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} /> {exp.period}
                  </span>
                </div>
                <p className="mt-6 text-sm text-white/70 leading-relaxed">
                  {exp.overview}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="font-mono text-[0.65rem] uppercase tracking-wider text-white/40 mb-3">
                  Tanggung Jawab Utama
                </p>
                <ul className="space-y-2 text-xs text-white/75">
                  {exp.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-white/40 mt-0.5">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile & Tablet Vertical Stack (max-width: 1023px) */}
      <div
        ref={mobileContainerRef}
        className="relative z-10 lg:hidden px-6 sm:px-10 space-y-6"
      >
        {experiences.map((exp) => (
          <div
            key={exp.id}
            data-experience-card="true"
            className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-8 backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <span className="font-mono text-xs text-white/40">{exp.num}</span>
              <span className="font-mono text-[0.65rem] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-white/80">
                {exp.type}
              </span>
            </div>
            <h3 className="font-serif text-2xl text-white font-normal">
              {exp.title}
            </h3>
            <p className="mt-0.5 font-sans text-sm text-white/90 font-medium">
              {exp.org}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/50">
              <span className="flex items-center gap-1">
                <MapPin size={12} /> {exp.place}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={12} /> {exp.period}
              </span>
            </div>
            <p className="mt-4 text-xs sm:text-sm text-white/70 leading-relaxed">
              {exp.overview}
            </p>
            <div className="mt-5 pt-4 border-t border-white/10">
              <ul className="space-y-1.5 text-xs text-white/75">
                {exp.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-white/40 mt-0.5">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;

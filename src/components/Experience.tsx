import { useRef } from 'react';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';
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
  image: string;
  imageAlt: string;
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
      'Menjalankan tugas lini produksi manufaktur komponen felt otomotif dengan memprioritaskan ketelitian sortasi material, perakitan part presisi, dan kepatuhan standar kualitas pabrik.',
    highlights: [
      'Sortir material & verifikasi spesifikasi fisik komponen',
      'Assembly double tape pada part felt secara presisi dan rapi',
      'Quality check produk akhir sebelum masuk packaging distribusi',
      'Mencapai target output kerja harian dengan kedisiplinan 5S',
    ],
    image: '/proof/preview-Sertifikat_PKL_PT_Rekadaya_2025.webp',
    imageAlt: 'Sertifikat Praktik Kerja Lapangan PT Rekadaya Multi Adiprima',
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
      'Mendukung kelancaran lini perakitan tas dan perlengkapan dengan mematuhi instruksi kerja SOP pabrik, persiapan komponen, serta pengeleman material secara rapi dan presisi.',
    highlights: [
      'Pemasangan aksesoris silinder pada zipper tas sesuai SOP',
      'Aplikasi perekat dan lem presisi sebelum proses penjahitan',
      'Pemeriksaan kerapian visual dan fungsi mekanis komponen',
      'Menjaga keselamatan kerja, kebersihan area (5S), & alat produksi',
    ],
    image: '/proof/instalasi-isp-proses.webp',
    imageAlt: 'Praktik kerja teknis operasional dan perakitan peralatan',
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
      'Menginput, merapikan, dan memverifikasi data operasional pelanggan secara teliti untuk memastikan konsistensi database digital, mencegah duplikasi, dan mempermudah rekapitulasi.',
    highlights: [
      'Input data berkala dan validasi field untuk cegah duplikasi data',
      'Pembersihan dan standardisasi format record berulang',
      'Penyusunan rekapitulasi data siap baca untuk tim administrasi',
      'Pemanfaatan spreadsheet digital mempercepat verifikasi akurasi',
    ],
    image: '/proof/preview-cv.webp',
    imageAlt: 'Dokumentasi rekapitulasi data administrasi dan berkas operasional',
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

  // Exact GSAP matchMedia horizontal pinning matching iqmal.dev
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
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: 'power2.out',
                scrollTrigger: { trigger: section, start: 'top 75%' },
              }
            );

            gsap.fromTo(
              mobileCards,
              { opacity: 0, y: 50, scale: 0.96 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.15,
                duration: 0.75,
                ease: 'power3.out',
                scrollTrigger: { trigger: mobileContainer, start: 'top 80%' },
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
              end: () => `+=${scrollDistance() + 400}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to(track, { x: () => -scrollDistance(), ease: 'none' }, 0);
          tl.to(progressBar, { scaleX: 1, ease: 'none' }, 0);
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
      className="relative z-20 min-h-screen bg-[#18181c] text-[#f4f4f1] py-16 sm:py-20 lg:py-12 flex flex-col justify-between overflow-hidden"
    >
      {/* Background Parallax Watermark (exact iqmal.dev) */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center text-center text-[clamp(5rem,17vw,17rem)] font-bold leading-none tracking-[-0.075em] text-white/5 blur-[3px]"
      >
        EXPERIENCES
      </div>

      {/* Top Subtle Progress Track Bar */}
      <div className="absolute top-0 inset-x-0 h-1 bg-white/10 z-30">
        <div
          ref={progressBarRef}
          className="h-full w-full bg-white origin-left will-change-transform"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Header Container */}
      <div
        ref={headerRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-24 mb-8 sm:mb-10 shrink-0"
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="font-mono text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.28em] text-white/45">
              02 / Work &amp; Roles
            </p>
            <h2
              id="experience-heading"
              className="mt-2 text-[clamp(1.9rem,6vw,2.75rem)] font-semibold uppercase leading-none tracking-[-0.035em] text-white"
            >
              Pengalaman <span className="font-editorial italic font-normal text-white/80">Kerja.</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-white/50 max-w-md sm:text-right leading-relaxed">
            Rekam jejak praktik industri manufaktur otomotif, perlengkapan, dan operasional entri data digital.
          </p>
        </div>
      </div>

      {/* Desktop Horizontal Pinning Track (min-width: 1024px) */}
      <div
        ref={viewportRef}
        className="relative z-10 hidden lg:block w-full overflow-hidden px-6 sm:px-10 lg:px-24 flex-1 min-h-0"
      >
        <div
          ref={trackRef}
          className="flex gap-10 lg:gap-14 will-change-transform w-fit h-[540px] xl:h-[580px]"
        >
          {experiences.map((exp) => (
            <article
              key={exp.id}
              data-experience-card="true"
              className="experience-card grid h-full w-[min(1080px,calc(100vw-12rem))] shrink-0 grid-cols-[1.25fr_0.95fr] overflow-hidden rounded-3xl border border-white/10 bg-[#f4f4f1] text-[#111114] shadow-[0_32px_90px_rgba(0,0,0,0.35)]"
            >
              {/* Left Column: Role Details & Highlights */}
              <div className="flex min-h-0 flex-col justify-between overflow-hidden p-8 sm:p-10 lg:p-12">
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#111114]/50 pb-4 border-b border-[#111114]/10">
                    <span>Pengalaman Kerja</span>
                    <span className="rounded-full border border-[#111114]/15 bg-[#111114]/5 px-3 py-1 font-semibold text-[#111114]">
                      {exp.type}
                    </span>
                  </div>

                  {/* Title & Company */}
                  <h3 className="mt-6 font-serif text-3xl xl:text-4xl font-normal leading-[1.05] tracking-tight text-[#111114]">
                    {exp.title}
                  </h3>
                  <p className="mt-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.08em] text-[#111114]/75">
                    {exp.org}
                  </p>

                  {/* Overview */}
                  <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#111114]/80">
                    {exp.overview}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="mt-6 pt-5 border-t border-[#111114]/10">
                  <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#111114]/45 mb-3">
                    Aktivitas &amp; Tanggung Jawab
                  </p>
                  <ol className="grid sm:grid-cols-2 gap-2.5">
                    {exp.highlights.map((h, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs leading-relaxed text-[#111114]/85"
                      >
                        <span className="font-mono text-[10px] font-bold text-[#111114]/40 mt-0.5 shrink-0">
                          0{idx + 1}
                        </span>
                        <span className="font-medium">{h}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Right Column: Visual Media & Meta Overlay (exact iqmal.dev setup) */}
              <div className="group/media relative min-h-full overflow-hidden border-l border-[#111114]/10 bg-[#0c0c0e]">
                {/* Photo / Proof Media */}
                <img
                  src={exp.image}
                  alt={exp.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover object-center grayscale contrast-105 transition-all duration-700 group-hover/media:scale-105 group-hover/media:grayscale-0 opacity-80"
                />

                {/* Gradient Shadows */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />

                {/* Big Index Number (Top Right) */}
                <span className="absolute right-6 top-6 font-mono text-4xl sm:text-5xl font-bold text-white/90">
                  {exp.num}
                </span>

                {/* Metadata Pill & Location (Bottom) */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-white/90 uppercase tracking-[0.16em]">
                    <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                      <Calendar size={13} className="text-white/60" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                      <MapPin size={13} className="text-white/60" />
                      {exp.place}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Mobile & Tablet Vertical Stack (max-width: 1023px) */}
      <div
        ref={mobileContainerRef}
        className="relative z-10 lg:hidden px-4 sm:px-8 space-y-6 w-full max-w-3xl mx-auto"
      >
        {experiences.map((exp) => (
          <article
            key={exp.id}
            data-experience-card="true"
            className="experience-card overflow-hidden rounded-3xl border border-white/10 bg-[#f4f4f1] text-[#111114] shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          >
            {/* Top Media Banner */}
            <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-[#0c0c0e]">
              <img
                src={exp.image}
                alt={exp.imageAlt}
                loading="lazy"
                className="h-full w-full object-cover grayscale opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <span className="absolute right-4 top-4 font-mono text-2xl sm:text-3xl font-bold text-white/90">
                {exp.num}
              </span>
              <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center gap-2 font-mono text-[11px] text-white/90">
                <span className="bg-black/60 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/15">
                  {exp.period}
                </span>
                <span className="bg-black/60 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/15">
                  {exp.place}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#111114]/10">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#111114]/50">
                  Pengalaman Kerja
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#111114]/5 border border-[#111114]/10 text-[#111114] font-semibold">
                  {exp.type}
                </span>
              </div>

              <h3 className="mt-4 font-serif text-2xl sm:text-3xl font-normal leading-tight text-[#111114]">
                {exp.title}
              </h3>
              <p className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-[#111114]/75">
                {exp.org}
              </p>

              <p className="mt-3.5 text-xs sm:text-sm text-[#111114]/80 leading-relaxed">
                {exp.overview}
              </p>

              <div className="mt-5 pt-4 border-t border-[#111114]/10">
                <p className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#111114]/45 mb-2.5">
                  Tanggung Jawab Utama
                </p>
                <ul className="space-y-1.5 text-xs text-[#111114]/85">
                  {exp.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-mono text-[10px] font-bold text-[#111114]/40 mt-0.5 shrink-0">
                        0{idx + 1}
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;

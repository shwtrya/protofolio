import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

export interface ExperienceItem {
  id: string;
  num: string;
  role: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  type: string;
  summary: string;
  highlights: string[];
  image: string;
  imageAlt: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: 'rekadaya',
    num: '01',
    role: 'Operator Produksi',
    company: 'PT Rekadaya Multi Adiprima',
    location: 'Ciangsana, Bogor',
    period: 'Sep 2024 — Des 2024',
    duration: '4 bulan',
    type: 'PKL / Industri',
    summary:
      'Menjalankan tugas lini produksi manufaktur otomotif dengan memprioritaskan ketelitian sortasi material, perakitan part felt presisi, dan standardisasi kualitas.',
    highlights: [
      'Sortir material & verifikasi spesifikasi komponen',
      'Assembly double tape felt presisi & rapi',
      'Quality check produk akhir sebelum packaging',
      'Mencapai target harian dengan disiplin 5S',
    ],
    image: '/proof/preview-Sertifikat_PKL_PT_Rekadaya_2025.webp',
    imageAlt: 'Sertifikat Praktik Kerja Lapangan PT Rekadaya Multi Adiprima',
  },
  {
    id: 'serin',
    num: '02',
    role: 'Operator Produksi',
    company: 'PT Serin Indonesia',
    location: 'Bekasi, Jawa Barat',
    period: 'Jun 2024 — Sep 2024',
    duration: '4 bulan',
    type: 'PKL / Industri',
    summary:
      'Mendukung kelancaran lini perakitan tas dan perlengkapan industri dengan mematuhi SOP, persiapan komponen, serta aplikasi pengeleman material secara rapi.',
    highlights: [
      'Pemasangan aksesoris silinder pada zipper tas',
      'Aplikasi perekat & lem presisi material jahitan',
      'Pemeriksaan kerapian visual & fungsi mekanik',
      'Menjaga kebersihan area kerja (5S) & mesin',
    ],
    image: '/proof/instalasi-isp-proses.webp',
    imageAlt: 'Praktik kerja teknis operasional dan perakitan peralatan',
  },
  {
    id: 'wova',
    num: '03',
    role: 'Data Entry Specialist',
    company: 'PT Wova Group Indonesia',
    location: 'Cileungsi, Bogor',
    period: '2023 — 2025',
    duration: 'Freelance',
    type: 'Administrasi',
    summary:
      'Menginput, merapikan, dan memverifikasi data operasional pelanggan secara teliti untuk memastikan konsistensi database digital dan kemudahan rekapitulasi.',
    highlights: [
      'Input data berkala & validasi cegah duplikasi',
      'Pembersihan & standardisasi format record berulang',
      'Penyusunan rekapitulasi data siap baca untuk tim',
      'Pemanfaatan spreadsheet digital percepat kerja',
    ],
    image: '/proof/preview-cv.webp',
    imageAlt: 'Dokumentasi rekapitulasi data administrasi dan berkas operasional',
  },
];

interface ExperienceCardProps {
  experience: ExperienceItem;
  index: number;
  className?: string;
}

function ExperienceCard({ experience: exp, index, className = '' }: ExperienceCardProps) {
  return (
    <article
      data-experience-card="true"
      className={`experience-card grid h-full w-[calc(100vw-2rem)] shrink-0 snap-center grid-rows-[auto_minmax(10rem,1fr)] overflow-hidden border border-white/10 bg-[#f4f4f1] text-[#111114] shadow-[0_32px_90px_rgba(0,0,0,0.28)] sm:w-[calc(100vw-5rem)] sm:grid-rows-[auto_minmax(12rem,1fr)] md:snap-none md:grid-cols-[1.28fr_0.92fr] md:grid-rows-none lg:w-[min(1120px,calc(100vw-12rem))] motion-reduce:h-auto motion-reduce:w-full motion-reduce:snap-none ${className}`}
    >
      {/* Content Column */}
      <div className="flex min-h-0 flex-col overflow-hidden px-5 py-4 sm:px-8 sm:py-6 lg:px-14 lg:py-12">
        <header>
          <div className="flex flex-wrap items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.24em] text-[#111114]/50 sm:gap-3 sm:text-[0.65rem]">
            <span>Pengalaman Profesional</span>
            <span className="rounded-full border border-[#111114]/14 px-2 py-0.5 text-[0.48rem] font-semibold tracking-[0.18em] text-[#111114]/65 sm:px-2.5 sm:text-[0.58rem]">
              {exp.type}
            </span>
          </div>
          <h3 className="mt-3 max-w-[16ch] font-sans text-[clamp(1.45rem,6.8vw,1.9rem)] font-bold uppercase leading-[0.9] tracking-[-0.055em] sm:mt-4 sm:text-[clamp(2rem,4.2vw,4rem)] sm:leading-[0.93] lg:mt-7 text-[#111114]">
            {exp.role}
          </h3>
          <p className="mt-3 font-sans text-[0.68rem] font-bold uppercase leading-relaxed tracking-[0.08em] sm:mt-4 sm:text-sm lg:mt-5 lg:text-base text-[#111114]/85">
            {exp.company}
          </p>
        </header>

        <p className="mt-3 max-w-[55ch] text-[0.72rem] leading-[1.4] text-[#111114]/75 sm:mt-6 sm:text-base sm:leading-[1.55] lg:mt-auto lg:pt-10 lg:text-lg lg:leading-[1.65]">
          {exp.summary}
        </p>

        <div className="mt-3 sm:mt-6 lg:mt-10">
          <p className="mb-1.5 text-[0.55rem] font-bold uppercase tracking-[0.24em] text-[#111114]/50 sm:mb-3 sm:text-xs lg:mb-4">
            Highlights
          </p>
          <ol className="grid sm:grid-cols-2">
            {exp.highlights.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 border-t border-[#111114]/18 py-1.5 pr-2 sm:min-h-12 sm:gap-3 sm:py-3 sm:pr-4 lg:min-h-16 lg:gap-4 lg:py-4"
              >
                <span className="font-mono text-[0.55rem] font-semibold text-[#111114]/45 sm:text-xs">
                  0{idx + 1}
                </span>
                <span className="text-[0.58rem] font-semibold uppercase leading-[1.25] tracking-[0.06em] sm:text-[0.72rem] sm:leading-relaxed lg:text-[0.8rem] text-[#111114]">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Media Column */}
      <div className="group/media relative min-h-0 overflow-hidden border-t border-[#111114]/12 bg-black/90 md:min-h-full md:border-l md:border-t-0">
        <img
          src={exp.image}
          alt={exp.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover object-center grayscale contrast-105 transition-[filter,transform] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover/media:scale-105 group-hover/media:grayscale-0"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
        <p className="absolute right-5 top-4 font-mono text-3xl font-semibold text-white sm:right-7 sm:top-6 sm:text-4xl">
          0{index + 1}
        </p>
        <p className="absolute bottom-4 left-5 flex max-w-[calc(100%-2.5rem)] flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-white sm:bottom-6 sm:left-7 sm:max-w-[calc(100%-3.5rem)] sm:text-xs sm:tracking-[0.22em]">
          <span>{exp.period}</span>
          <span aria-hidden="true">·</span>
          <span>{exp.duration}</span>
        </p>
      </div>
    </article>
  );
}

export const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const swiperContainerRef = useRef<HTMLDivElement>(null);

  // Exact GSAP matchMedia horizontal pinning from iqmal.dev
  useGSAP(
    () => {
      const section = sectionRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      const progressBar = progressBarRef.current;
      const watermark = watermarkRef.current;
      const header = headerRef.current;
      const swiperContainer = swiperContainerRef.current;

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
          const mobileCards = swiperContainer?.querySelectorAll('[data-experience-card]') ?? [];

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
                scrollTrigger: { trigger: swiperContainer, start: 'top 78%' },
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
              { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.5, ease: 'power2.out' },
              0.2
            )
            .to(track, { x: () => -scrollDistance(), duration: 1.2 }, 0.8)
            .fromTo(progressBar, { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left center', duration: 1.2 }, 0.8);
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
      className="relative z-20 h-svh overflow-hidden bg-[#18181c] text-[#f4f4f1] px-4 py-5 sm:px-8 sm:py-7 lg:px-24 lg:py-10 motion-reduce:h-auto motion-reduce:min-h-svh motion-reduce:overflow-visible"
    >
      <h2 id="experience-heading" className="sr-only">
        Pengalaman Profesional Shawava Tritya
      </h2>

      {/* Parallax Watermark Text (exact iqmal.dev) */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center text-center text-[clamp(5rem,17vw,17rem)] font-bold leading-none tracking-[-0.075em] text-white/[0.045] blur-[3px]"
      >
        EXPERIENCES
      </div>

      <div className="relative z-10 mx-auto flex h-full min-h-0 max-w-7xl flex-col">
        {/* Header (exact iqmal.dev layout) */}
        <div
          ref={headerRef}
          className="mb-4 flex shrink-0 items-end justify-between gap-6 sm:mb-5 lg:mb-8"
        >
          <div>
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-white/45 sm:text-[0.65rem]">
              Career archive
            </p>
            <p className="mt-2 text-[clamp(1.9rem,9vw,2.6rem)] font-semibold uppercase leading-none tracking-[-0.035em] text-white sm:mt-3 lg:text-3xl">
              experiences
            </p>
          </div>
          <p className="hidden max-w-[26rem] text-right text-sm leading-relaxed text-white/45 md:block">
            Roles, systems, and the work behind them.
          </p>
        </div>

        {/* Mobile & Tablet Interactive Swiper (< 1024px) */}
        <div
          ref={swiperContainerRef}
          data-experience-swiper="true"
          data-lenis-prevent="true"
          className="min-h-0 flex-1 overflow-hidden lg:hidden"
        >
          <Swiper
            modules={[Pagination, A11y, Keyboard]}
            className="experience-swiper"
            slidesPerView={1}
            spaceBetween={16}
            speed={720}
            grabCursor={true}
            keyboard={{ enabled: true, onlyInViewport: true }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1.04, spaceBetween: 24 },
              768: { slidesPerView: 1.08, spaceBetween: 28 },
            }}
          >
            {experiences.map((exp, idx) => (
              <SwiperSlide key={exp.id} className="h-full">
                <ExperienceCard
                  experience={exp}
                  index={idx}
                  className="h-full w-full sm:w-full lg:w-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Viewport & Track (min-width: 1024px) */}
        <div
          ref={viewportRef}
          data-experience-viewport="true"
          className="hidden min-h-0 flex-1 overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:block lg:overflow-visible motion-reduce:overflow-visible"
        >
          <div
            ref={trackRef}
            data-experience-track="true"
            className="experience-track mx-auto flex h-full w-max gap-4 will-change-transform sm:gap-8 motion-reduce:h-auto motion-reduce:w-full motion-reduce:flex-col motion-reduce:will-change-auto"
          >
            {experiences.map((exp, idx) => (
              <ExperienceCard key={exp.id} experience={exp} index={idx} />
            ))}
          </div>
        </div>

        {/* Desktop Bottom Progress Line */}
        <div
          aria-hidden="true"
          className="mt-6 hidden h-px shrink-0 overflow-hidden bg-white/12 lg:block motion-reduce:hidden"
        >
          <div
            ref={progressBarRef}
            className="h-full w-full origin-left scale-x-0 bg-white/70 will-change-transform"
          />
        </div>
      </div>
    </section>
  );
};

export default Experience;

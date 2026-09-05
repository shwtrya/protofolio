import { useRef, useState } from 'react';
import { ArrowUpRight, Cpu, Eye, Network } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CaseStudy from './CaseStudy';
import ProofImage from './ProofImage';
import { projects, type PortfolioProject } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  // Exact GSAP matchMedia scroll trigger from iqmal.dev
  useGSAP(
    () => {
      const section = sectionRef.current;
      const container = containerRef.current;
      const watermark = watermarkRef.current;

      if (!section || !container || !watermark) return;

      const mm = gsap.matchMedia();

      return mm.add(
        {
          isDesktop: '(min-width: 768px)',
          isMobile: '(max-width: 767px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isDesktop, isMobile, reduceMotion } = context.conditions ?? {};
          const cards = container.querySelectorAll('[data-project-card]');

          if (reduceMotion) {
            gsap.set([section, watermark, cards], { clearProps: 'all' });
            return;
          }

          if (isMobile) {
            gsap.set([section, watermark], { clearProps: 'all' });
            cards.forEach((card) => {
              gsap.fromTo(
                card,
                { opacity: 0, y: 36 },
                {
                  opacity: 1,
                  y: 0,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: card,
                    start: 'top 92%',
                    end: 'top 62%',
                    scrub: 0.25,
                    invalidateOnRefresh: true,
                  },
                }
              );
            });
            return;
          }

          if (isDesktop) {
            // Section upward parallax overlap
            gsap.fromTo(
              section,
              { yPercent: 12 },
              {
                yPercent: 0,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: section,
                  start: 'top bottom',
                  end: 'top 58%',
                  scrub: 0.65,
                  invalidateOnRefresh: true,
                },
              }
            );

            // Watermark vertical parallax
            gsap.fromTo(
              watermark,
              { y: -100, opacity: 0 },
              {
                y: 100,
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            );

            // Individual project card zooming & floating up
            cards.forEach((card) => {
              gsap.fromTo(
                card,
                { opacity: 0, y: 56, scale: 0.97 },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.75,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: card,
                    start: 'top 112%',
                    end: 'top 72%',
                    scrub: 0.35,
                  },
                }
              );
            });
          }
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-heading"
      className="projects-section relative z-30 rounded-t-[2.5rem] md:rounded-t-[3.5rem] bg-[#e8e8e5] text-[#111114] px-6 pt-20 pb-28 sm:px-10 sm:pt-28 sm:pb-36 lg:px-20 -mt-10 md:-mt-[10vh] shadow-[0_-30px_60px_rgba(0,0,0,0.18)] overflow-hidden"
    >
      {/* Parallax Watermark Text (exact iqmal.dev) */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-16 select-none text-center font-serif text-[clamp(5rem,18vw,16rem)] font-bold italic tracking-tight text-[#111114]/[0.04] leading-none will-change-transform"
      >
        PROJECTS
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 sm:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#111114]/10 pb-8">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#111114]/60">
              03 / Portfolio Showcase
            </p>
            <h2
              id="projects-heading"
              className="mt-3 font-serif text-4xl sm:text-6xl text-[#111114] tracking-tight"
            >
              Proyek <span className="font-editorial italic font-normal text-[#111114]/80">Unggulan.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#111114]/70 leading-relaxed">
            Eksplorasi teknis perangkat keras IoT, pemetaan jaringan FTTH, dan konfigurasi router MikroTik yang terdokumentasi.
          </p>
        </div>

        {/* Project Cards List */}
        <div ref={containerRef} className="space-y-20 sm:space-y-28">
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <article
                key={project.id}
                data-project-card="true"
                className={`group relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-center will-change-transform ${
                  isEven ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Project Image View */}
                <div className="lg:col-span-7">
                  <div
                    onClick={() => setActiveProject(project)}
                    className="cursor-pointer relative overflow-hidden rounded-3xl border border-[#111114]/15 bg-white/40 shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]"
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-200">
                      <ProofImage
                        src={project.image}
                        alt={project.title}
                        title={project.title}
                        aspectRatio="16/10"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="flex flex-col justify-center lg:col-span-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#111114]/40">
                      0{idx + 1}
                    </span>
                    <span className="h-px w-6 bg-[#111114]/20" />
                    <span className="font-mono text-[0.68rem] uppercase tracking-wider text-[#111114]/70 flex items-center gap-1.5">
                      {project.category === 'IoT & Hardware' ? (
                        <Cpu size={13} className="text-emerald-700" />
                      ) : (
                        <Network size={13} className="text-sky-700" />
                      )}
                      {project.category}
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif text-3xl sm:text-4xl text-[#111114] leading-tight group-hover:text-black transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#111114]/75">
                    {project.shortDescription}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#111114]/15 bg-white/70 px-3.5 py-1 font-mono text-[0.7rem] font-medium text-[#111114]/80 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center gap-4">
                    <button
                      onClick={() => setActiveProject(project)}
                      className="inline-flex items-center gap-2 rounded-full border border-[#111114]/20 bg-[#111114] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#25252a] hover:gap-3 cursor-pointer shadow-md"
                    >
                      <Eye size={14} />
                      Detail Case Study
                    </button>

                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#111114]/15 bg-white/80 px-4 py-3 font-mono text-xs font-semibold text-[#111114] transition-all hover:bg-white"
                        aria-label="Lihat repository GitHub"
                      >
                        Code <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      {activeProject && (
        <CaseStudy
          project={activeProject}
          isOpen={!!activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;

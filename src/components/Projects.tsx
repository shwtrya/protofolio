import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, Cpu, Eye, Network } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CaseStudy from './CaseStudy';
import ProofImage from './ProofImage';
import { projects, type PortfolioProject } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Watermark subtle parallax
      if (watermarkRef.current && sectionRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { y: -50, opacity: 0.01 },
          {
            y: 50,
            opacity: 0.045,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // Parallax scroll on individual project articles
      if (cardsContainerRef.current) {
        const articles = cardsContainerRef.current.querySelectorAll('article');
        articles.forEach((art) => {
          gsap.fromTo(
            art,
            { opacity: 0, y: 60, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: art,
                start: 'top 85%',
                end: 'top 50%',
                scrub: 0.35,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-heading"
      className="relative z-30 curved-light-entry bg-[#e8e8e5] text-[#111114] px-6 pt-24 pb-28 sm:px-10 sm:pt-32 sm:pb-36 lg:px-20 -mt-10 sm:-mt-14 shadow-[0_-30px_60px_rgba(0,0,0,0.15)] overflow-hidden"
    >
      {/* Watermark text */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="watermark-bg top-12 text-[#111114]/[0.04]"
      >
        PROJECTS
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 sm:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#111114]/10 pb-8">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-[#111114]/60">
              PORTFOLIO SHOWCASE
            </p>
            <h2
              id="projects-heading"
              className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[-0.03em] text-[#111114]"
            >
              Selected Projects
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[#111114]/65 leading-relaxed">
            Dokumentasi konkret dari prototype hardware, mikrokontroler, serta instalasi jaringan FTTH yang pernah saya rancang dan uji.
          </p>
        </div>

        {/* Project List */}
        <div ref={cardsContainerRef} className="space-y-24 sm:space-y-32">
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <article
                key={project.title}
                className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-center"
              >
                {/* Media Image Column */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div
                    onClick={() => setActiveProject(project)}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#111114]/12 bg-[#dededb] shadow-md transition-all duration-300 hover:shadow-xl"
                  >
                    {/* Aspect ratio frame */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <ProofImage
                        src={project.image}
                        alt={project.imageAlt}
                        width={1200}
                        height={750}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Dark overlay on hover */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                        <span className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 font-mono text-xs font-semibold text-[#111114] shadow-lg backdrop-blur-sm">
                          <Eye size={15} />
                          Lihat Dokumentasi
                        </span>
                      </div>
                    </div>

                    {/* Counter pill */}
                    <div className="absolute left-4 top-4">
                      <span className="font-mono text-xs font-bold tracking-wider rounded-full bg-[#111114]/80 text-white px-3 py-1 backdrop-blur-md">
                        0{idx + 1} / 0{projects.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details Column */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-center ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  {/* Category & Status */}
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#111114]">
                      {project.category === 'Networking' ? (
                        <Network size={14} />
                      ) : (
                        <Cpu size={14} />
                      )}
                      {project.category}
                    </span>
                    <span className="text-[#111114]/30">·</span>
                    <span className="font-mono text-xs text-[#111114]/60">
                      {project.period}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111114] uppercase">
                    {project.title}
                  </h3>

                  {/* Summary */}
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#111114]/70">
                    {project.summary}
                  </p>

                  {/* Highlights List */}
                  <div className="mt-6 border-t border-[#111114]/12 pt-5">
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-[#111114]/50 mb-3">
                      HIGHLIGHTS
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {project.caseStudy.work.slice(0, 4).map((w, i) => (
                        <li
                          key={w}
                          className="flex items-start gap-2 text-xs text-[#111114]/80 leading-snug"
                        >
                          <span className="font-mono text-[#111114]/40 text-[0.65rem] mt-0.5">
                            0{i + 1}
                          </span>
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-[#111114]/15 bg-white/40 px-2.5 py-1 font-mono text-[0.68rem] font-medium text-[#111114]/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Link Button */}
                  <div className="mt-8 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-[#111114] border-b-2 border-[#111114] pb-1 hover:text-[#111114]/60 hover:border-[#111114]/60 transition-colors"
                    >
                      <span>Lihat Dokumentasi</span>
                      <ArrowUpRight size={16} />
                    </button>
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
          isOpen={Boolean(activeProject)}
          onClose={() => setActiveProject(null)}
          project={activeProject}
        />
      )}
    </section>
  );
};

export default Projects;

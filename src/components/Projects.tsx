import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Cpu, Eye, Network } from 'lucide-react';
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (watermarkRef.current && sectionRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { opacity: 0, filter: 'blur(16px)', scale: 0.85 },
          {
            opacity: 1,
            filter: 'blur(3px)',
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'top 20%',
              scrub: true,
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
      id="projects"
      aria-labelledby="projects-heading"
      className="projects-section relative z-30 rounded-t-[2.5rem] md:rounded-t-[3.5rem] bg-[#e8e8e5] text-[#111114] px-6 pt-20 pb-28 sm:px-10 sm:pt-28 sm:pb-36 lg:px-20 -mt-10 md:-mt-[10vh] shadow-[0_-30px_60px_rgba(0,0,0,0.18)] overflow-hidden"
    >
      {/* Watermark text */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="watermark-bg top-10 sm:top-14 text-[#111114]/[0.04]"
      >
        PROJECTS
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 sm:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#111114]/10 pb-8">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#111114]/60">
              Portfolio Showcase
            </p>
            <h2
              id="projects-heading"
              className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#111114]"
            >
              Selected Projects
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-[#111114]/65 leading-relaxed">
            Dokumentasi konkret dari prototype hardware IoT dan praktik instalasi jaringan FTTH yang pernah saya rancang dan uji.
          </p>
        </div>

        {/* Project List */}
        <div className="space-y-20 sm:space-y-28">
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <article
                key={project.title}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* Image Column */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div
                    onClick={() => setActiveProject(project)}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#111114]/12 bg-[#dededb] shadow-md transition-all duration-300 hover:shadow-2xl"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <ProofImage
                        src={project.image}
                        alt={project.imageAlt}
                        width={1200}
                        height={750}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="eager"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                        <span className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#111114] shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                          <Eye size={15} />
                          Lihat Dokumentasi
                        </span>
                      </div>
                    </div>

                    {/* Project Index Pill */}
                    <div className="absolute left-4 top-4 z-10">
                      <span className="font-mono text-xs font-bold tracking-wider rounded-full bg-[#111114]/85 text-white px-3.5 py-1 backdrop-blur-md">
                        0{idx + 1}
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
                  {/* Category & Role */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-[#111114]/80">
                      {project.category === 'Networking' ? (
                        <Network size={14} className="text-[#111114]" />
                      ) : (
                        <Cpu size={14} className="text-[#111114]" />
                      )}
                      {project.category}
                    </span>
                    <span className="text-[#111114]/30">·</span>
                    <span className="font-mono text-xs text-[#111114]/60">
                      {project.role}
                    </span>
                  </div>

                  <h3 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#111114]">
                    {project.title}
                  </h3>

                  <p className="mt-4 text-sm sm:text-base text-[#111114]/70 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Highlights */}
                  <div className="mt-6 border-t border-[#111114]/12 pt-4">
                    <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#111114]/70 mb-3">
                      Highlights
                    </p>
                    <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2.5">
                      {project.caseStudy.work.slice(0, 4).map((w, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 border-t border-[#111114]/8 pt-2 text-xs text-[#111114]/80"
                        >
                          <span className="font-mono text-[11px] font-bold text-[#111114]/50">
                            0{i + 1}
                          </span>
                          <span className="leading-snug">{w}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags & Action Button */}
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#111114]/12 pt-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#111114]/15 bg-white/60 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[#111114]/75"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="inline-flex items-center gap-2 rounded-full border border-[#111114] bg-[#111114] px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all duration-300 hover:bg-transparent hover:text-[#111114]"
                    >
                      <span>Lihat Dokumentasi</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Case Study Lightbox Modal */}
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

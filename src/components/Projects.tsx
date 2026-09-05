import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Cpu, Eye, Network } from 'lucide-react';
import CaseStudy from './CaseStudy';
import ProofImage from './ProofImage';
import { projects, type PortfolioProject } from '../data/projects';

export const Projects = () => {
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative z-30 curved-light-entry bg-[#e8e8e5] text-[#111114] px-6 pt-24 pb-28 sm:px-10 sm:pt-32 sm:pb-36 lg:px-20 -mt-10 sm:-mt-14 shadow-[0_-30px_60px_rgba(0,0,0,0.15)] overflow-hidden"
    >
      {/* Watermark text */}
      <div
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
        <div className="space-y-24 sm:space-y-32">
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
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#111114]/70">
                      {project.category === 'Networking' ? (
                        <Network size={14} className="text-[#111114]" />
                      ) : (
                        <Cpu size={14} className="text-[#111114]" />
                      )}
                      {project.category}
                    </span>
                    <span className="text-[#111114]/30">•</span>
                    <span className="font-mono text-xs text-[#111114]/60">
                      {project.role}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111114]">
                    {project.title}
                  </h3>

                  {/* Summary */}
                  <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#111114]/75">
                    {project.summary}
                  </p>

                  {/* Numbered Highlights */}
                  <div className="mt-6 space-y-2.5">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[#111114]/50 font-bold mb-3">
                      HIGHLIGHTS
                    </p>
                    {project.caseStudy.work.slice(0, 4).map((w, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 border-t border-[#111114]/10 pt-2 text-sm text-[#111114]/80"
                      >
                        <span className="font-mono text-xs font-semibold text-[#111114]/40 pt-0.5">
                          0{i + 1}
                        </span>
                        <span>{w}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-[#111114]/15 bg-white/40 px-2.5 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-wide text-[#111114]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="group inline-flex items-center gap-2 border-b-2 border-[#111114] pb-1 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#111114] transition-all hover:border-[#111114]/40"
                    >
                      <span>Lihat Dokumentasi Lengkap</span>
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
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

import { useMemo, useState } from 'react';
import { ArrowUpRight, CheckCircle2, Cpu, Layers, Network, Wrench } from 'lucide-react';
import CaseStudy from './CaseStudy';
import ProofImage from './ProofImage';
import { projects, type PortfolioProject } from '../data/projects';
import { Reveal, SectionHeader } from './ui/Section';
import Scroll3D from './ui/Scroll3D';
import TiltCard from './ui/TiltCard';

export const Projects = () => {
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  const stats = useMemo(() => {
    const tools = new Set(projects.flatMap((p) => [...p.tags, ...p.caseStudy.tools]));
    return [
      { value: String(projects.length), label: 'Proyek Nyata' },
      { value: String(tools.size), label: 'Tools & Teknologi' },
      { value: '2', label: 'Sertifikat Kompetensi' },
      { value: '3', label: 'Pengalaman Kerja' },
    ];
  }, []);

  const categoryIcon = (category: PortfolioProject['category']) => {
    switch (category) {
      case 'Networking':
        return <Network size={14} className="text-accent" />;
      case 'IoT & Hardware':
        return <Cpu size={14} className="text-accent" />;
      default:
        return <Layers size={14} className="text-accent" />;
    }
  };

  return (
    <section id="projects" className="section bg-bg">
      <div className="container-responsive">
        <SectionHeader
          kicker="DOKUMENTASI KERJA"
          title="Proyek & Bukti Praktik"
          lead="Mini case study dari prototype hardware dan praktik instalasi jaringan yang pernah saya kerjakan secara nyata."
        />

        {/* Quick stats — bukti kuantitatif sebelum masuk detail proyek */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="card h-full p-4 text-center sm:p-5">
                <div className="t-display text-2xl sm:text-3xl">{s.value}</div>
                <div className="t-mono mt-1">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 space-y-10">
          {projects.map((project, idx) => (
            <Reveal key={project.title} delay={idx * 0.1}>
              <Scroll3D rotateX={5} rotateY={idx % 2 === 0 ? 1.5 : -1.5} drift={26}>
                <TiltCard maxTilt={5} className="h-full rounded-[14px]">
                  <article className="card card-interactive group overflow-hidden">
                <div className="grid lg:grid-cols-[1.1fr_1.3fr]">
                  {/* Visual preview */}
                  <div className="relative overflow-hidden border-b border-line bg-surface2 lg:border-b-0 lg:border-r">
                    <ProofImage
                      src={project.image}
                      alt={project.imageAlt}
                      width={600}
                      height={400}
                      className="h-60 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] sm:h-72 lg:h-full"
                      loading="lazy"
                    />
                    <div className="absolute left-3 top-3">
                      <span className="tag tag-accent bg-bg/90 backdrop-blur-sm">
                        {project.statusLabel}
                      </span>
                    </div>
                  </div>

                  {/* Case study body */}
                  <div className="flex flex-col justify-between p-6 sm:p-8">
                    <div>
                      {/* Meta header */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent">
                          {categoryIcon(project.category)}
                          {project.category}
                        </span>
                        <span className="text-faint">·</span>
                        <span className="t-mono">{project.period}</span>
                      </div>

                      <h3 className="t-h3 mt-2">{project.title}</h3>

                      <p className="t-body mt-3">{project.summary}</p>

                      {/* Technical specifications */}
                      <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-line pt-4 text-sm">
                        <div>
                          <dt className="t-mono text-[11px]">PERAN</dt>
                          <dd className="mt-1 font-medium text-fg">{project.role}</dd>
                        </div>
                        <div>
                          <dt className="t-mono text-[11px]">SOLUSI</dt>
                          <dd className="mt-1 text-muted">{project.caseStudy.solution}</dd>
                        </div>
                      </dl>

                      {/* Tool tags */}
                      <div className="mt-6 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Hasil — highlight bukti konkret */}
                      <p className="mt-5 flex items-start gap-2 text-sm text-muted">
                        <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                        {project.caseStudy.result}
                      </p>
                    </div>

                    {/* Action */}
                    <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-5">
                      <button
                        type="button"
                        onClick={() => setActiveProject(project)}
                        className="btn btn-primary text-sm"
                      >
                        Buka Case Study Lengkap
                        <ArrowUpRight size={15} />
                      </button>

                      {project.proofAssets.some((a) => a.type === 'video') && (
                        <span className="t-mono flex items-center gap-1.5 text-faint">
                          <Wrench size={13} />
                          Ada video dokumentasi
                        </span>
                      )}
                      <span className="t-mono flex items-center gap-1.5 text-faint">
                        <span className="text-accent">+</span>
                        Buka untuk detail, proses &amp; bukti
                      </span>
                    </div>
                  </div>
                </div>
                  </article>
                </TiltCard>
              </Scroll3D>
            </Reveal>
          ))}
        </div>
      </div>

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

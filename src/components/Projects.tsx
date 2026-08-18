import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, ExternalLink, Mail, Github } from 'lucide-react';
import CaseStudy from './CaseStudy';
import ProofImage from './ProofImage';
import { projects } from '../data/projects';
import type { PortfolioProject } from '../data/projects';

const getRequestCtaLabel = (status: PortfolioProject['status']) => {
  if (status === 'documentation_on_request') {
    return 'Minta Dokumentasi';
  }

  return 'Minta Demo';
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);

  const openCaseStudy = (project: PortfolioProject) => {
    try {
      if (typeof window !== 'undefined') {
        const currentViews = parseInt(localStorage.getItem('project_views') || '0', 10);
        localStorage.setItem('project_views', (currentViews + 1).toString());
      }
    } catch (error) {
      console.warn('Failed to record project view.', error);
    }
    setSelectedProject(project);
    setIsCaseStudyOpen(true);
  };

  return (
    <section id="projects" className="py-16 sm:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-2">
            Proof of Work
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Pengalaman Project
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Beberapa proyek dan pengalaman teknis yang menunjukkan cara saya belajar,
            merakit, menguji, dan menyelesaikan masalah secara praktis.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="relative overflow-hidden">
                <ProofImage
                  src={project.image}
                  alt={project.imageAlt}
                  width={600}
                  height={400}
                  className="w-full h-44 sm:h-52 object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute left-4 top-4 rounded-md bg-white/95 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm dark:bg-gray-900/95 dark:text-blue-300">
                  {project.statusLabel}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {project.summary}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mb-5 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Peran</p>
                    <p className="text-gray-600 dark:text-gray-300">{project.role}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Periode</p>
                    <p className="text-gray-600 dark:text-gray-300">{project.period}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => openCaseStudy(project)}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    aria-label={`Buka detail proyek ${project.title}`}
                  >
                    <Eye size={18} />
                    Detail Proyek
                  </button>

                  {project.links.demoUrl ? (
                    <a
                      href={project.links.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
                    >
                      <ExternalLink size={18} />
                      Demo
                    </a>
                  ) : (
                    <Link
                      to="/contact"
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
                    >
                      <Mail size={18} />
                      {getRequestCtaLabel(project.status)}
                    </Link>
                  )}

                  {project.links.sourceUrl && (
                    <a
                      href={project.links.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
                    >
                      <Github size={18} />
                      Source
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {selectedProject && (
          <CaseStudy
            isOpen={isCaseStudyOpen}
            onClose={() => setIsCaseStudyOpen(false)}
            project={selectedProject}
          />
        )}
      </div>
    </section>
  );
};

export default Projects;

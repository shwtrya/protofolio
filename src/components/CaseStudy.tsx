import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Image as ImageIcon,
  Mail,
  Wrench
} from 'lucide-react';
import ProofImage from './ProofImage';
import type { PortfolioProject } from '../data/projects';

interface CaseStudyProps {
  isOpen: boolean;
  onClose: () => void;
  project: PortfolioProject;
}

const tabs = [
  { id: 'overview', label: 'Ringkasan' },
  { id: 'process', label: 'Proses' },
  { id: 'results', label: 'Hasil' }
] as const;

type CaseStudyTab = (typeof tabs)[number]['id'];

const getRequestCtaLabel = (status: PortfolioProject['status']) => {
  if (status === 'documentation_on_request') {
    return 'Minta Dokumentasi';
  }

  return 'Minta Demo';
};

const CaseStudy: React.FC<CaseStudyProps> = ({ isOpen, onClose, project }) => {
  const [activeTab, setActiveTab] = useState<CaseStudyTab>('overview');
  const caseStudy = project.caseStudy;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 16 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-2xl dark:bg-gray-800"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
        >
          <div className="flex items-start justify-between gap-4 border-b border-gray-200 p-5 dark:border-gray-700 sm:p-6">
            <div>
              <span className="mb-2 inline-flex rounded-md bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                {project.statusLabel}
              </span>
              <h2 id="case-study-title" className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                {caseStudy.title}
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {project.role} - {project.period}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
              aria-label="Tutup detail proyek"
            >
              <X size={22} />
            </button>
          </div>

          <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-[44px] px-5 py-3 text-sm font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="max-h-[62vh] overflow-y-auto p-5 sm:p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  className="space-y-6"
                >
                  <section>
                    <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                      Deskripsi Proyek
                    </h3>
                    <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                      {caseStudy.overview}
                    </p>
                  </section>

                  <div className="grid gap-4 md:grid-cols-2">
                    <section className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                      <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                        Masalah
                      </h4>
                      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                        {caseStudy.problem}
                      </p>
                    </section>
                    <section className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                      <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                        Solusi
                      </h4>
                      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                        {caseStudy.solution}
                      </p>
                    </section>
                  </div>

                  <section>
                    <h4 className="mb-3 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                      <Wrench size={18} className="text-blue-600 dark:text-blue-400" />
                      Tools
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </section>
                </motion.div>
              )}

              {activeTab === 'process' && (
                <motion.div
                  key="process"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  className="space-y-6"
                >
                  <section>
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
                      <ClipboardList size={20} className="text-blue-600 dark:text-blue-400" />
                      Peran Saya
                    </h3>
                    <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                      {caseStudy.role}
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                      Yang Saya Kerjakan
                    </h3>
                    <ul className="space-y-3">
                      {caseStudy.work.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                      Alur Pengerjaan
                    </h3>
                    <div className="space-y-4">
                      {caseStudy.timeline.map((item, index) => (
                        <div key={item.phase} className="flex gap-4">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-blue-600 text-sm font-bold text-white">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {item.phase}
                            </h4>
                            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </motion.div>
              )}

              {activeTab === 'results' && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  className="space-y-6"
                >
                  <section>
                    <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                      Hasil
                    </h3>
                    <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                      {caseStudy.result}
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
                      <GraduationCap size={20} className="text-blue-600 dark:text-blue-400" />
                      Hal yang Saya Pelajari
                    </h3>
                    <ul className="space-y-3">
                      {caseStudy.learnings.map((learning) => (
                        <li key={learning} className="flex items-start gap-3">
                          <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                            {learning}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                                      <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
                                        <ImageIcon size={20} className="text-blue-600 dark:text-blue-400" />
                                        Bukti & Catatan
                                      </h3>
                                      <div className="grid gap-4 sm:grid-cols-2">
                                        {project.proofAssets.map((asset) => (
                                          <figure key={asset.label} className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                                            {asset.type === 'video' ? (
                                              <video 
                                                controls 
                                                className="h-48 w-full object-contain bg-slate-900"
                                                poster={asset.videoProps?.poster}
                                              >
                                                <source src={asset.src} type="video/mp4" />
                                                <p className="p-4 text-sm text-gray-600 dark:text-gray-300">
                                                  Browser Anda tidak mendukung video HTML5. <a href={asset.src} className="text-blue-600 hover:underline">Download video</a> untuk melihat.
                                                </p>
                                              </video>
                                            ) : (
                                              <ProofImage
                                                src={asset.src}
                                                alt={asset.alt}
                                                width={asset.width || 600}
                                                height={asset.height || 400}
                                                className="h-48 w-full object-contain bg-slate-900"
                                                loading="lazy"
                                              />
                                            )}
                                            <figcaption className="p-3 text-xs font-medium text-gray-600 dark:text-gray-300">
                                              {asset.label}
                                              {asset.type === 'video' && asset.videoProps?.duration && (
                                                <span className="ml-2 text-gray-500">
                                                  ({Math.floor(asset.videoProps.duration / 60)}:{(asset.videoProps.duration % 60).toString().padStart(2, '0')})
                                                </span>
                                              )}
                                            </figcaption>
                                          </figure>
                                        ))}
                                      </div>
                                      <p className="mt-3 rounded-lg bg-gray-50 p-4 text-sm leading-relaxed text-gray-600 dark:bg-gray-900 dark:text-gray-300">
                                        {caseStudy.proofNotes}
                                      </p>
                                    </section>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      window.setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
                    }}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <Mail size={18} />
                    {getRequestCtaLabel(project.status)}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CaseStudy;

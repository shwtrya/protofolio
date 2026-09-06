import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  FileText,
  HelpCircle,
  Lightbulb,
  Mail,
  Workflow,
  ExternalLink,
} from 'lucide-react';
import Modal from './ui/Modal';
import ProofImage from './ProofImage';
import type { PortfolioProject } from '../data/projects';

interface CaseStudyProps {
  isOpen: boolean;
  onClose: () => void;
  project: PortfolioProject;
}

const tabs = [
  { id: 'overview', label: 'Ringkasan', icon: FileText },
  { id: 'process', label: 'Proses & Alur', icon: Workflow },
  { id: 'results', label: 'Hasil & Bukti', icon: CheckCircle2 },
] as const;

type TabId = (typeof tabs)[number]['id'];

export const CaseStudy = ({ isOpen, onClose, project }: CaseStudyProps) => {
  const [tab, setTab] = useState<TabId>('overview');
  const cs = project.caseStudy;

  const ctaLabel =
    project.status === 'documentation_on_request'
      ? 'Minta Dokumentasi / Bahas Proyek Ini'
      : 'Minta Demo / Diskusi Teknis';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-5xl"
      title={cs.title}
      subtitle={
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-[#111114]">{project.category}</span>
          <span className="text-[#111114]/30">·</span>
          <span>{project.period}</span>
          <span className="text-[#111114]/30">·</span>
          <span className="rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 text-[10px] font-mono font-semibold">
            {project.statusLabel}
          </span>
        </span>
      }
      toolbar={
        <div
          role="tablist"
          aria-label="Bagian case study"
          className="flex border-b border-[#111114]/10 bg-[#f0f0ed] px-4 sm:px-8 overflow-x-auto"
        >
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setTab(t.id)}
                className={`relative flex min-h-[48px] items-center gap-2 px-4 text-xs sm:text-sm font-semibold uppercase tracking-wider font-mono transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? 'text-[#111114] border-b-2 border-[#111114]'
                    : 'text-[#111114]/50 hover:text-[#111114]'
                }`}
              >
                <Icon size={15} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      }
    >
      {/* 1. RINGKASAN */}
      {tab === 'overview' && (
        <div className="flex flex-col gap-6">
          {/* Overview Statement */}
          <section className="rounded-2xl border border-[#111114]/10 bg-white/70 p-6 sm:p-7 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#111114]/50 font-semibold">
              Ikhtisar Proyek
            </span>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-[#111114]/85">
              {cs.overview}
            </p>
          </section>

          {/* Problem & Solution side-by-side cards */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#111114]/10 bg-white/70 p-6 shadow-sm">
              <div className="flex items-center gap-2.5 text-amber-700">
                <HelpCircle size={18} />
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider">
                  Masalah / Konteks
                </h4>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#111114]/75">
                {cs.problem}
              </p>
            </div>

            <div className="rounded-2xl border border-[#111114]/10 bg-white/70 p-6 shadow-sm">
              <div className="flex items-center gap-2.5 text-emerald-700">
                <Lightbulb size={18} />
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider">
                  Solusi Yang Dibuat
                </h4>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#111114]/75">
                {cs.solution}
              </p>
            </div>
          </div>

          {/* Tools & Components grid */}
          <section className="rounded-2xl border border-[#111114]/10 bg-white/70 p-6 shadow-sm">
            <div className="flex items-center gap-2.5 text-[#111114]">
              <Cpu size={18} />
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider">
                Tools, Modul &amp; Komponen Teknis
              </h4>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {cs.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-[#111114]/12 bg-[#111114]/[0.03] px-3.5 py-1.5 font-mono text-xs font-medium text-[#111114] hover:bg-[#111114] hover:text-white transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* 2. PROSES & ALUR */}
      {tab === 'process' && (
        <div className="flex flex-col gap-6">
          <section className="rounded-2xl border border-[#111114]/10 bg-white/70 p-6 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#111114]/50 font-semibold">
              Peran &amp; Tanggung Jawab
            </span>
            <p className="mt-2.5 text-base sm:text-lg font-medium text-[#111114]">
              {cs.role}
            </p>
          </section>

          <section className="rounded-2xl border border-[#111114]/10 bg-white/70 p-6 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#111114]/50 font-semibold">
              Aktivitas Teknis Yang Dikerjakan
            </span>
            <ul className="mt-4 grid gap-3">
              {cs.work.map((w, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-[#111114]/8 bg-[#fdfdfc] p-4 text-sm text-[#111114]/80"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                    <CheckCircle2 size={13} />
                  </span>
                  <span className="leading-relaxed">{w}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Timeline / Step by Step */}
          <section className="rounded-2xl border border-[#111114]/10 bg-white/70 p-6 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#111114]/50 font-semibold">
              Tahapan Pengerjaan &amp; Alur Kerja
            </span>
            <ol className="mt-6 flex flex-col gap-6 border-l-2 border-[#111114]/15 pl-6 sm:pl-8">
              {cs.timeline.map((step, i) => (
                <li key={step.phase} className="relative">
                  <span
                    className="absolute -left-[35px] sm:-left-[43px] top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#111114] font-mono text-[10px] font-bold text-white shadow-sm"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <p className="font-serif text-lg font-bold text-[#111114]">
                    Tahap {i + 1}: {step.phase}
                  </p>
                  <p className="mt-1.5 text-sm text-[#111114]/70 leading-relaxed">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      )}

      {/* 3. HASIL & BUKTI */}
      {tab === 'results' && (
        <div className="flex flex-col gap-6">
          <section className="rounded-2xl border border-[#111114]/10 bg-white/70 p-6 shadow-sm">
            <div className="flex items-center gap-2.5 text-emerald-700">
              <CheckCircle2 size={20} />
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider">
                Hasil Yang Dicapai
              </h3>
            </div>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-[#111114]/85">
              {cs.result}
            </p>
          </section>

          <section className="rounded-2xl border border-[#111114]/10 bg-white/70 p-6 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#111114]/50 font-semibold">
              Pembelajaran Teknis &amp; Evaluasi
            </span>
            <ul className="mt-4 grid gap-3">
              {cs.learnings.map((l, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-[#111114]/8 bg-[#fdfdfc] p-4 text-sm text-[#111114]/80"
                >
                  <span className="mt-0.5 text-[#111114] font-bold">✦</span>
                  <span className="leading-relaxed">{l}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Proof gallery */}
          <section className="rounded-2xl border border-[#111114]/10 bg-white/70 p-6 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#111114]/50 font-semibold">
              Dokumentasi Foto, Video &amp; Skema
            </span>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              {project.proofAssets.map((asset) => (
                <figure
                  key={asset.label}
                  className="overflow-hidden rounded-2xl border border-[#111114]/15 bg-white shadow-sm"
                >
                  {asset.type === 'video' ? (
                    <div className="relative bg-black aspect-video flex items-center justify-center">
                      <video
                        controls
                        preload="metadata"
                        className="h-full w-full object-contain"
                        poster={asset.videoProps?.poster}
                      >
                        <source src={asset.src} type="video/mp4" />
                      </video>
                    </div>
                  ) : (
                    <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
                      <ProofImage
                        src={asset.src}
                        alt={asset.alt}
                        width={asset.width || 600}
                        height={asset.height || 400}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <figcaption className="border-t border-[#111114]/10 p-3.5 text-xs text-[#111114]/75 bg-white">
                    <span className="font-semibold text-[#111114]">{asset.label}</span>
                    {asset.type === 'video' && ' · Putar video demo operasional'}
                  </figcaption>
                </figure>
              ))}
            </div>

            {cs.proofNotes && (
              <p className="mt-4 rounded-xl border border-[#111114]/8 bg-[#fdfdfc] p-4 text-xs sm:text-sm text-[#111114]/70 leading-relaxed">
                {cs.proofNotes}
              </p>
            )}
          </section>
        </div>
      )}

      {/* Footer Bottom Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#111114]/10 pt-5">
        <a
          href={`https://wa.me/6285883281031?text=Halo%20Shawava,%20saya%20ingin%20membahas%20detail%20proyek%20${encodeURIComponent(
            project.title
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#111114] px-6 py-3 font-mono text-xs font-semibold text-white shadow-sm hover:bg-[#25252a] transition-all"
        >
          <Mail size={15} />
          <span>{ctaLabel}</span>
          <ArrowRight size={15} />
        </a>

        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-full border border-[#111114]/15 bg-white px-5 py-2.5 font-mono text-xs font-semibold text-[#111114] shadow-sm hover:bg-[#111114] hover:text-white transition-all cursor-pointer"
        >
          Tutup Detail Proyek
        </button>
      </div>
    </Modal>
  );
};

export default CaseStudy;

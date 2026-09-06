import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  FileText,
  HelpCircle,
  Lightbulb,
  Workflow,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import Modal from './ui/Modal';
import ProofImage from './ProofImage';
import type { PortfolioProject } from '../data/projects';
import { profile } from '../data/navigation';

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
      title={
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#111114]/50 font-bold block">
            Project Case Study
          </span>
          <h2 className="font-sans text-lg sm:text-2xl font-bold text-[#111114] tracking-tight leading-snug mt-0.5">
            {cs.title}
          </h2>
        </div>
      }
      subtitle={
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-[#111114]">{project.category}</span>
          <span className="text-[#111114]/30">·</span>
          <span>{project.period}</span>
          <span className="text-[#111114]/30">·</span>
          <span className="rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300/80 px-2.5 py-0.5 text-[10px] font-mono font-semibold">
            {project.statusLabel}
          </span>
        </span>
      }
      toolbar={
        <div className="border-b border-[#111114]/10 bg-[#ededeb] px-4 py-2.5 sm:px-8">
          {/* Segmented Pill Tabs */}
          <div className="flex items-center rounded-full bg-[#111114]/8 p-1 border border-[#111114]/10 w-full sm:w-auto">
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
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#111114] text-white shadow-sm'
                      : 'text-[#111114]/70 hover:text-[#111114]'
                  }`}
                >
                  <Icon size={13} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      }
    >
      {/* 1. RINGKASAN */}
      {tab === 'overview' && (
        <div className="flex flex-col gap-6">
          {/* Overview Statement */}
          <section className="rounded-2xl border border-[#111114]/12 bg-white p-5 sm:p-7 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#111114]/50 font-bold block mb-2">
              Ikhtisar Proyek
            </span>
            <p className="text-sm sm:text-base leading-relaxed text-[#111114]/85">
              {cs.overview}
            </p>
          </section>

          {/* Problem & Solution side-by-side cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2 text-amber-900 font-mono text-xs font-bold uppercase tracking-wider mb-2.5">
                <HelpCircle size={16} />
                <span>Masalah / Konteks</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-[#111114]/80">
                {cs.problem}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-900 font-mono text-xs font-bold uppercase tracking-wider mb-2.5">
                <Lightbulb size={16} />
                <span>Solusi Yang Dibuat</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-[#111114]/80">
                {cs.solution}
              </p>
            </div>
          </div>

          {/* Tools & Components grid */}
          <section className="rounded-2xl border border-[#111114]/12 bg-white p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 text-[#111114] font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <Cpu size={16} />
              <span>Modul, Komponen &amp; Tools Teknis</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {cs.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-[#111114]/12 bg-[#111114]/[0.04] px-3.5 py-1 font-mono text-xs font-semibold text-[#111114]"
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
          <section className="rounded-2xl border border-[#111114]/12 bg-white p-5 sm:p-6 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#111114]/50 font-bold block mb-1">
              Peran &amp; Tanggung Jawab
            </span>
            <p className="text-sm sm:text-base font-semibold text-[#111114]">
              {cs.role}
            </p>
          </section>

          <section className="rounded-2xl border border-[#111114]/12 bg-white p-5 sm:p-6 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#111114]/50 font-bold block mb-3">
              Aktivitas Teknis Yang Dikerjakan
            </span>
            <ul className="grid gap-2.5">
              {cs.work.map((w, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 rounded-xl border border-[#111114]/8 bg-[#fbfbf9] p-3.5 text-xs sm:text-sm text-[#111114]/85 leading-relaxed"
                >
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    ✓
                  </span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Timeline / Step by Step */}
          <section className="rounded-2xl border border-[#111114]/12 bg-white p-5 sm:p-6 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#111114]/50 font-bold block mb-4">
              Tahapan Pengerjaan &amp; Alur Kerja
            </span>
            <ol className="flex flex-col gap-5 border-l-2 border-[#111114]/15 pl-5 sm:pl-6 ml-2">
              {cs.timeline.map((step, i) => (
                <li key={step.phase} className="relative">
                  <span
                    className="absolute -left-[29px] sm:-left-[33px] top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#111114] font-mono text-[10px] font-bold text-white shadow-sm"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <p className="font-sans text-sm sm:text-base font-bold text-[#111114]">
                    Tahap {i + 1}: {step.phase}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-[#111114]/75 leading-relaxed">
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
          <section className="rounded-2xl border border-[#111114]/12 bg-white p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-800 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <CheckCircle2 size={16} />
              <span>Hasil Yang Dicapai</span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-[#111114]/85">
              {cs.result}
            </p>
          </section>

          <section className="rounded-2xl border border-[#111114]/12 bg-white p-5 sm:p-6 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#111114]/50 font-bold block mb-3">
              Pembelajaran Teknis &amp; Evaluasi
            </span>
            <ul className="grid gap-2.5">
              {cs.learnings.map((l, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 rounded-xl border border-[#111114]/8 bg-[#fbfbf9] p-3.5 text-xs sm:text-sm text-[#111114]/85 leading-relaxed"
                >
                  <span className="mt-0.5 text-emerald-700 font-bold">✦</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Proof gallery */}
          <section className="rounded-2xl border border-[#111114]/12 bg-white p-5 sm:p-6 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#111114]/50 font-bold block mb-4">
              Dokumentasi Foto, Video &amp; Demo
            </span>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.proofAssets.map((asset) => (
                <figure
                  key={asset.label}
                  className="overflow-hidden rounded-xl border border-[#111114]/15 bg-neutral-50 shadow-sm"
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
                  <figcaption className="border-t border-[#111114]/10 p-3 text-xs text-[#111114]/75 bg-white">
                    <span className="font-semibold text-[#111114]">{asset.label}</span>
                    {asset.type === 'video' && ' · Putar video demo operasional'}
                  </figcaption>
                </figure>
              ))}
            </div>

            {cs.proofNotes && (
              <p className="mt-4 rounded-xl border border-[#111114]/8 bg-[#fbfbf9] p-3.5 text-xs text-[#111114]/70 leading-relaxed">
                {cs.proofNotes}
              </p>
            )}
          </section>
        </div>
      )}

      {/* Footer Bottom Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#111114]/10 pt-5">
        <a
          href={`https://wa.me/${profile.whatsapp}?text=Halo%20Shawava,%20saya%20ingin%20membahas%20detail%20proyek%20${encodeURIComponent(
            project.title
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#111114] px-6 py-2.5 font-mono text-xs font-semibold text-white shadow-sm hover:bg-[#25252a] transition-all"
        >
          <MessageCircle size={14} />
          <span>{ctaLabel}</span>
          <ArrowRight size={14} />
        </a>

        <button
          type="button"
          onClick={onClose}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#111114]/15 bg-white px-5 py-2.5 font-mono text-xs font-semibold text-[#111114] shadow-sm hover:bg-[#111114] hover:text-white transition-all cursor-pointer"
        >
          Tutup Detail Proyek
        </button>
      </div>
    </Modal>
  );
};

export default CaseStudy;

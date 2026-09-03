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

const CaseStudy = ({ isOpen, onClose, project }: CaseStudyProps) => {
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
      title={cs.title}
      subtitle={
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-accent">{project.category}</span>
          <span className="text-faint">·</span>
          <span>{project.period}</span>
          <span className="text-faint">·</span>
          <span className="rounded bg-accent-soft px-1.5 py-0.5 text-[11px] text-accent">
            {project.statusLabel}
          </span>
        </span>
      }
      toolbar={
        <div
          role="tablist"
          aria-label="Bagian case study"
          className="flex border-b border-line bg-surface/50 px-4 sm:px-6"
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
                className={`relative flex min-h-[46px] items-center gap-2 px-3 text-sm font-semibold transition-colors sm:px-4 ${
                  active ? 'text-accent' : 'text-muted hover:text-fg'
                }`}
              >
                <Icon size={15} />
                <span>{t.label}</span>
                {active && (
                  <span
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-accent"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      }
    >
      {/* 1. RINGKASAN */}
      {tab === 'overview' && (
        <div className="flex flex-col gap-6">
          <section>
            <h3 className="t-mono t-mono-accent">IKHTISAR PROYEK</h3>
            <p className="t-body mt-2 text-[1.02rem]">{cs.overview}</p>
          </section>

          {/* Problem & Solution side-by-side cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card p-5">
              <div className="flex items-center gap-2 text-accent">
                <HelpCircle size={17} />
                <h4 className="t-mono font-semibold">MASALAH / KONTEKS</h4>
              </div>
              <p className="t-body mt-2.5 text-[0.9375rem]">{cs.problem}</p>
            </div>

            <div className="card p-5">
              <div className="flex items-center gap-2 text-accent">
                <Lightbulb size={17} />
                <h4 className="t-mono font-semibold">SOLUSI YANG DIBUAT</h4>
              </div>
              <p className="t-body mt-2.5 text-[0.9375rem]">{cs.solution}</p>
            </div>
          </div>

          {/* Tools & Components grid */}
          <section className="card p-5">
            <div className="flex items-center gap-2 text-accent">
              <Cpu size={17} />
              <h4 className="t-mono font-semibold">TOOLS &amp; KOMPONEN</h4>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {cs.tools.map((tool) => (
                <span key={tool} className="tag tag-accent text-xs">
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
          <section className="card p-5">
            <h3 className="t-mono t-mono-accent">PERAN &amp; TANGGUNG JAWAB</h3>
            <p className="t-body mt-2 font-medium text-fg">{cs.role}</p>
          </section>

          <section>
            <h3 className="t-mono t-mono-accent">AKTIVITAS TEKNIS YANG DIKERJAKAN</h3>
            <ul className="mt-3 grid gap-2.5">
              {cs.work.map((w) => (
                <li
                  key={w}
                  className="card flex items-start gap-3 p-3.5 text-[0.9375rem] text-fg"
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <CheckCircle2 size={13} />
                  </span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Timeline */}
          <section>
            <h3 className="t-mono t-mono-accent">TAHAPAN PENGERJAAN</h3>
            <ol className="mt-4 flex flex-col gap-5 border-l-2 border-line pl-5 sm:pl-6">
              {cs.timeline.map((step, i) => (
                <li key={step.phase} className="relative">
                  <span
                    className="absolute -left-[27px] sm:-left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-bg bg-accent text-[9px] font-bold text-accent-fg"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <p className="font-semibold text-fg">
                    Tahap {i + 1}: {step.phase}
                  </p>
                  <p className="t-body mt-1 text-sm">{step.description}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      )}

      {/* 3. HASIL & BUKTI */}
      {tab === 'results' && (
        <div className="flex flex-col gap-6">
          <section className="card p-5">
            <div className="flex items-center gap-2 text-accent">
              <CheckCircle2 size={18} />
              <h3 className="t-mono font-semibold">HASIL YANG DICAPAI</h3>
            </div>
            <p className="t-body mt-2.5 text-[0.95rem]">{cs.result}</p>
          </section>

          <section>
            <h3 className="t-mono t-mono-accent">PEMBELAJARAN TEKNIS</h3>
            <ul className="mt-3 grid gap-2.5">
              {cs.learnings.map((l) => (
                <li
                  key={l}
                  className="card flex items-start gap-3 p-3.5 text-[0.9375rem] text-muted"
                >
                  <span className="mt-0.5 text-accent font-bold">→</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Proof gallery */}
          <section>
            <h3 className="t-mono t-mono-accent">DOKUMENTASI FOTO &amp; VIDEO</h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {project.proofAssets.map((asset) => (
                <figure
                  key={asset.label}
                  className="overflow-hidden rounded-[12px] border border-line bg-surface"
                >
                  {asset.type === 'video' ? (
                    <div className="relative bg-black">
                      <video
                        controls
                        preload="metadata"
                        className="h-52 w-full object-contain"
                        poster={asset.videoProps?.poster}
                      >
                        <source src={asset.src} type="video/mp4" />
                      </video>
                    </div>
                  ) : (
                    <ProofImage
                      src={asset.src}
                      alt={asset.alt}
                      width={asset.width || 600}
                      height={asset.height || 400}
                      className="h-52 w-full bg-surface2 object-cover"
                      loading="lazy"
                    />
                  )}
                  <figcaption className="border-t border-line p-3 text-xs text-muted">
                    <span className="font-semibold text-fg">{asset.label}</span>
                    {asset.type === 'video' && ' · Putar video untuk melihat demo'}
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="t-body mt-4 rounded-[10px] border border-line bg-surface p-4 text-sm">
              {cs.proofNotes}
            </p>
          </section>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <button
              type="button"
              onClick={() => {
                onClose();
                window.setTimeout(
                  () =>
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
                  200,
                );
              }}
              className="btn btn-primary text-sm"
            >
              <Mail size={15} />
              {ctaLabel}
              <ArrowRight size={15} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary text-sm"
            >
              Tutup Case Study
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CaseStudy;

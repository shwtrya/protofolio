import React from 'react';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Database,
  FileText,
  Network,
  Server,
  Wrench
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { scrollToSectionById } from '../utils/scrollToSection';

type SkillAccent = 'blue' | 'emerald' | 'purple' | 'orange';

interface RelatedProof {
  label: string;
  to: string;
}

interface SkillGroup {
  title: string;
  icon: LucideIcon;
  accent: SkillAccent;
  readinessLabel: string;
  summary: string;
  evidence: string[];
  tools: string[];
  relatedProof: RelatedProof[];
}

const Skills = () => {
  const skillGroups: SkillGroup[] = [
    {
      title: 'Arduino & IoT',
      icon: Cpu,
      accent: 'blue',
      readinessLabel: 'Praktik proyek',
      summary:
        'Dipakai untuk prototype smart home, pembacaan sensor, dan kontrol output sederhana.',
      evidence: [
        'Merakit Arduino, sensor, relay, dan modul pendukung.',
        'Menulis program dasar untuk membaca sensor dan mengontrol perangkat.',
        'Menguji wiring, power, dan respons sistem saat troubleshooting.'
      ],
      tools: ['Arduino Uno', 'Arduino IDE', 'Sensor', 'Relay'],
      relatedProof: [
        { label: 'Smart Home', to: '#projects' },
        { label: 'Pendidikan TKJ', to: '#education' }
      ]
    },
    {
      title: 'Jaringan Komputer',
      icon: Network,
      accent: 'emerald',
      readinessLabel: 'Bersertifikat + praktik',
      summary:
        'Dipakai saat praktik instalasi ISP, konfigurasi router, dan pengecekan koneksi.',
      evidence: [
        'Membantu persiapan perangkat dan penataan kabel jaringan.',
        'Membantu konfigurasi dasar router sesuai kebutuhan koneksi.',
        'Melakukan pengecekan konektivitas dan troubleshooting sederhana.'
      ],
      tools: ['Router', 'Kabel UTP', 'LAN tester', 'Topologi'],
      relatedProof: [
        { label: 'Instalasi ISP', to: '#projects' },
        { label: 'Sertifikat Networking', to: '#certificates' }
      ]
    },
    {
      title: 'Data & Administrasi',
      icon: Database,
      accent: 'purple',
      readinessLabel: 'Terbiasa kerja data',
      summary:
        'Dipakai dalam pekerjaan data entry, validasi data pelanggan, dan laporan administrasi.',
      evidence: [
        'Menginput dan memeriksa data agar rapi serta konsisten.',
        'Menyusun laporan sederhana menggunakan tools perkantoran.',
        'Menjaga ketelitian saat menangani data berulang.'
      ],
      tools: ['Microsoft Word', 'Excel', 'PowerPoint', 'Canva'],
      relatedProof: [
        { label: 'Pengalaman Data Entry', to: '#experience' },
        { label: 'Tools pendidikan', to: '#education' }
      ]
    },
    {
      title: 'Operasional Produksi',
      icon: Wrench,
      accent: 'orange',
      readinessLabel: 'Pengalaman industri',
      summary:
        'Dipakai saat magang produksi untuk assembly, quality check, packing, dan kerja tim.',
      evidence: [
        'Menyortir material sesuai standar kualitas.',
        'Mengerjakan assembly dan packing dengan rapi.',
        'Menjaga disiplin, kebersihan area, dan target kerja harian.'
      ],
      tools: ['Quality check', 'Assembly', 'Packing', 'Teamwork'],
      relatedProof: [
        { label: 'Pengalaman Produksi', to: '#experience' },
        { label: 'Sertifikat PKL', to: '#certificates' }
      ]
    }
  ];

  const accentClasses: Record<
    SkillAccent,
    {
      icon: string;
      text: string;
      badge: string;
      link: string;
    }
  > = {
    blue: {
      icon: 'bg-blue-600 dark:bg-blue-500',
      text: 'text-blue-700 dark:text-blue-300',
      badge: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      link:
        'border-blue-200 text-blue-700 hover:border-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/30'
    },
    emerald: {
      icon: 'bg-emerald-600 dark:bg-emerald-500',
      text: 'text-emerald-700 dark:text-emerald-300',
      badge:
        'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
      link:
        'border-emerald-200 text-emerald-700 hover:border-emerald-600 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-900/30'
    },
    purple: {
      icon: 'bg-purple-600 dark:bg-purple-500',
      text: 'text-purple-700 dark:text-purple-300',
      badge: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      link:
        'border-purple-200 text-purple-700 hover:border-purple-600 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/30'
    },
    orange: {
      icon: 'bg-orange-600 dark:bg-orange-500',
      text: 'text-orange-700 dark:text-orange-300',
      badge: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
      link:
        'border-orange-200 text-orange-700 hover:border-orange-600 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-900/30'
    }
  };

  return (
    <section id="skills" className="py-16 bg-gray-50 transition-colors duration-300 dark:bg-gray-800/50">
      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            Skill Evidence
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Keahlian yang Saya Miliki
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {skillGroups.map((group, index) => {
            const colors = accentClasses[group.accent as keyof typeof accentClasses];
            const GroupIcon = group.icon;

            return (
              <motion.article
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-lg dark:border-gray-700 dark:bg-gray-900 sm:p-6"
              >
                <div className="mb-4 flex items-start gap-4">
                  <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md text-white ${colors.icon}`}>
                    <GroupIcon size={22} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={`text-lg font-bold ${colors.text}`}>
                        {group.title}
                      </h3>
                      <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${colors.badge}`}>
                        {group.readinessLabel}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      {group.summary}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {group.evidence.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {group.tools.map((tool) => (
                    <span
                      key={tool}
                      className={`rounded-md px-3 py-1 text-xs font-semibold ${colors.badge}`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="mt-5 border-t border-gray-100 pt-4 dark:border-gray-800">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Bukti terkait
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.relatedProof.map((proof) => (
                      <button
                        type="button"
                        key={proof.label}
                        onClick={() => scrollToSectionById(proof.to)}
                        className={`inline-flex min-h-[44px] items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-semibold transition ${colors.link}`}
                      >
                        {proof.label}
                        <ArrowRight size={14} />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 rounded-lg border border-gray-200 bg-white p-5 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900"
        >
          <Server className="mx-auto mb-3 h-9 w-9 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Siap Belajar di Lingkungan Profesional
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            Saya mencari kesempatan untuk menerapkan kemampuan TKJ, membantu pekerjaan teknis,
            dan berkembang melalui bimbingan serta pekerjaan nyata.
          </p>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={() => {
                scrollToSectionById('#projects');
              }}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Lihat Proyek
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollToSectionById('#certificates')}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
            >
              <FileText size={16} />
              Lihat Sertifikat
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

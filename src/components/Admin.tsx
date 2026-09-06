import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { initialExperiences, type ExperienceItem } from '../data/experience';
import { projects as initialProjects, type PortfolioProject } from '../data/projects';
import { initialCertificates, type Certificate } from '../data/certificates';
import {
  getStoredExperiences,
  saveStoredExperiences,
  getStoredProjects,
  saveStoredProjects,
  getStoredCertificates,
  saveStoredCertificates,
} from '../lib/portfolioStore';
import { supabaseConfigured } from '../lib/supabase';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Download,
  RotateCcw,
  Eye,
  X,
  ExternalLink,
} from 'lucide-react';

const OWNER_EMAIL = 'shawavatritya@gmail.com';
const OWNER_PASS = 'Sawava110608';
const AUTH_KEY = 'portfolio_admin_auth';

export const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'experience' | 'projects' | 'certificates'>(
    'experience'
  );
  const [experiences, setExperiences] = useState<ExperienceItem[]>(initialExperiences);
  const [projectsList, setProjectsList] = useState<PortfolioProject[]>(initialProjects);
  const [certificatesList, setCertificatesList] = useState<Certificate[]>(initialCertificates);

  const [deleteConfirm, setDeleteConfirm] = useState<{
    tab: 'experience' | 'projects' | 'certificates';
    index: number;
    title: string;
  } | null>(null);

  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      void getStoredExperiences().then(setExperiences);
      void getStoredProjects().then(setProjectsList);
      void getStoredCertificates().then(setCertificatesList);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === OWNER_EMAIL && password === OWNER_PASS) {
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_KEY, 'true');
      setAuthError('');
    } else {
      setAuthError('Email atau password salah!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
    navigate('/');
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setStatusMsg(null);

    const expOk = await saveStoredExperiences(experiences);
    const projOk = await saveStoredProjects(projectsList);
    const certOk = await saveStoredCertificates(certificatesList);

    setSaving(false);
    if (expOk && projOk && certOk) {
      setStatusMsg({
        type: 'success',
        text: `Data portfolio berhasil disimpan! ${
          supabaseConfigured ? '(Tersinkron ke Supabase & Local)' : '(Tersimpan Lokal)'
        }`,
      });
    } else {
      setStatusMsg({
        type: 'error',
        text: 'Gagal sinkron penuh ke Supabase, namun data lokal tetap tersimpan.',
      });
    }
    setTimeout(() => setStatusMsg(null), 5000);
  };

  const handleBackupDownload = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      experiences,
      projects: projectsList,
      certificates: certificatesList,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Kembalikan semua data ke pengaturan bawaan awal? Perubahan belum tersimpan akan hilang.')) {
      setExperiences(initialExperiences);
      setProjectsList(initialProjects);
      setCertificatesList(initialCertificates);
      setStatusMsg({
        type: 'success',
        text: 'Data dikembalikan ke default. Klik "Simpan Perubahan" untuk memfinalisasi.',
      });
      setTimeout(() => setStatusMsg(null), 4000);
    }
  };

  // Delete confirmation execution
  const executeDelete = () => {
    if (!deleteConfirm) return;
    const { tab, index } = deleteConfirm;
    if (tab === 'experience') {
      setExperiences(experiences.filter((_, i) => i !== index));
    } else if (tab === 'projects') {
      setProjectsList(projectsList.filter((_, i) => i !== index));
    } else if (tab === 'certificates') {
      setCertificatesList(certificatesList.filter((_, i) => i !== index));
    }
    setDeleteConfirm(null);
  };

  // Experience handlers
  const handleExpChange = (index: number, field: keyof ExperienceItem, value: any) => {
    const next = [...experiences];
    next[index] = { ...next[index], [field]: value };
    setExperiences(next);
  };

  const handleExpHighlightChange = (expIdx: number, hlIdx: number, val: string) => {
    const next = [...experiences];
    const hls = [...next[expIdx].highlights];
    hls[hlIdx] = val;
    next[expIdx] = { ...next[expIdx], highlights: hls };
    setExperiences(next);
  };

  const handleAddExpHighlight = (expIdx: number) => {
    const next = [...experiences];
    next[expIdx] = { ...next[expIdx], highlights: [...next[expIdx].highlights, ''] };
    setExperiences(next);
  };

  const handleRemoveExpHighlight = (expIdx: number, hlIdx: number) => {
    const next = [...experiences];
    next[expIdx] = {
      ...next[expIdx],
      highlights: next[expIdx].highlights.filter((_, i) => i !== hlIdx),
    };
    setExperiences(next);
  };

  const handleAddExperience = () => {
    const newId = `exp_${Date.now()}`;
    const nextNum = String(experiences.length + 1).padStart(2, '0');
    setExperiences([
      ...experiences,
      {
        id: newId,
        num: nextNum,
        role: 'Role Baru',
        company: 'Nama Perusahaan',
        location: 'Lokasi',
        period: 'Periode',
        duration: 'Durasi',
        type: 'PKL / Industri',
        summary: 'Deskripsi pekerjaan...',
        highlights: ['Poin pertama'],
        image: '/proof/preview-cv.webp',
        imageAlt: 'Foto dokumentasi kerja',
      },
    ]);
  };

  // Projects handlers
  const handleProjChange = (index: number, field: keyof PortfolioProject, value: any) => {
    const next = [...projectsList];
    next[index] = { ...next[index], [field]: value };
    setProjectsList(next);
  };

  const handleAddProject = () => {
    setProjectsList([
      ...projectsList,
      {
        title: 'Proyek Baru',
        category: 'Networking',
        summary: 'Ringkasan singkat proyek...',
        role: 'Teknisi Jaringan & Konfigurasi',
        period: '2025',
        image: '/proof/smart-home-komponen.webp',
        imageAlt: 'Dokumentasi proyek',
        tags: ['Networking', 'MikroTik'],
        status: 'documentation_on_request',
        statusLabel: 'Dokumentasi on request',
        links: {},
        proofAssets: [],
        caseStudy: {
          title: 'Proyek Baru',
          overview: 'Ikhtisar proyek...',
          role: 'Peran dalam proyek...',
          problem: 'Tantangan...',
          solution: 'Solusi...',
          work: ['Langkah 1'],
          tools: ['Router'],
          result: 'Hasil kerja...',
          learnings: ['Pelajaran didapat...'],
          timeline: [],
          proofNotes: '',
        },
      },
    ]);
  };

  // Certificate handlers
  const handleCertChange = (index: number, field: keyof Certificate, value: any) => {
    const next = [...certificatesList];
    next[index] = { ...next[index], [field]: value };
    setCertificatesList(next);
  };

  const handleAddCertificate = () => {
    setCertificatesList([
      ...certificatesList,
      {
        title: 'Sertifikat Baru',
        issuer: 'Lembaga Penerbit',
        period: '2025',
        description: 'Deskripsi kompetensi yang diuji...',
        preview: '/proof/preview-Sertifikat_IT_Specialist_Networking_2025.webp',
        tags: ['Networking', 'Kompetensi'],
      },
    ]);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111114] px-4">
        <div className="w-full max-w-md bg-[#18181c] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div>
              <h1 className="font-serif text-2xl font-bold text-white">Login Admin</h1>
              <p className="font-mono text-xs text-white/50 mt-1">Khusus Owner Portofolio</p>
            </div>
            <Link
              to="/"
              className="text-xs font-mono text-white/60 hover:text-white flex items-center gap-1"
            >
              <ArrowLeft size={14} /> Beranda
            </Link>
          </div>

          {authError && (
            <div className="mb-5 flex items-center gap-2 rounded-lg bg-rose-500/10 border border-rose-500/20 p-3 text-xs text-rose-400">
              <AlertCircle size={15} />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-mono text-xs text-white/60 uppercase mb-1.5">
                Email Owner
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-white/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-white/60 uppercase mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-white/40 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-white text-[#111114] py-3 text-sm font-semibold hover:bg-[#e8e8e5] transition-all cursor-pointer mt-2"
            >
              Masuk Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111114] text-[#f4f4f1] pb-32">
      {/* Top Navbar Responsive */}
      <header className="sticky top-0 z-40 bg-[#18181c]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 font-mono text-xs text-white/60 hover:text-white"
          >
            <ArrowLeft size={15} /> <span className="hidden sm:inline">Lihat</span> Web
          </Link>
          <span className="text-white/20">|</span>
          <span className="font-serif font-bold text-base sm:text-lg">Portfolio Editor</span>
          <span className="hidden md:inline-flex rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400">
            {supabaseConfigured ? 'Supabase Connected' : 'Local Storage'}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Actions Backup & Reset */}
          <button
            onClick={handleBackupDownload}
            title="Download Backup JSON"
            className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 font-mono text-xs text-white/70 hover:bg-white/10 cursor-pointer"
          >
            <Download size={13} /> Backup
          </button>
          <button
            onClick={handleResetToDefault}
            title="Reset ke Default"
            className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 font-mono text-xs text-white/70 hover:bg-white/10 cursor-pointer"
          >
            <RotateCcw size={13} /> Reset
          </button>

          {/* Desktop Save */}
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="hidden sm:flex items-center gap-2 rounded-full bg-white text-[#111114] px-4 py-1.5 font-semibold text-xs hover:bg-[#e8e8e5] transition-all disabled:opacity-50 cursor-pointer shadow-md"
          >
            <Save size={13} />
            <span>{saving ? 'Menyimpan...' : 'Simpan'}</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 font-mono text-xs text-white/70 hover:bg-white/10 cursor-pointer"
          >
            <LogOut size={13} /> <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {/* Status Notification */}
        {statusMsg && (
          <div
            className={`mb-6 flex items-center gap-2 rounded-xl border p-4 text-sm ${
              statusMsg.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
            }`}
          >
            {statusMsg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Tab Controls (Scrollable on Mobile) */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-white/10 mb-6 [scrollbar-width:none]">
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'experience'
                ? 'bg-white text-[#111114]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            Pengalaman ({experiences.length})
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-white text-[#111114]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            Proyek ({projectsList.length})
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'certificates'
                ? 'bg-white text-[#111114]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            Sertifikat ({certificatesList.length})
          </button>
        </div>

        {/* 1. EXPERIENCE TAB */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl sm:text-2xl font-bold">Daftar Pengalaman Kerja</h2>
              <button
                onClick={handleAddExperience}
                className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-3 py-2 font-mono text-xs text-white hover:bg-white/10 cursor-pointer min-h-[40px]"
              >
                <Plus size={14} /> Tambah
              </button>
            </div>

            {experiences.map((exp, expIdx) => (
              <div
                key={exp.id || expIdx}
                className="rounded-2xl border border-white/10 bg-[#18181c] p-5 sm:p-6 space-y-4 relative"
              >
                <button
                  onClick={() =>
                    setDeleteConfirm({
                      tab: 'experience',
                      index: expIdx,
                      title: `${exp.role} di ${exp.company}`,
                    })
                  }
                  title="Hapus Pengalaman"
                  className="absolute top-5 right-5 p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pr-10">
                  <div>
                    <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                      Jabatan / Role
                    </label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => handleExpChange(expIdx, 'role', e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                      Perusahaan
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleExpChange(expIdx, 'company', e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                      Tipe Pekerjaan
                    </label>
                    <select
                      value={exp.type}
                      onChange={(e) => handleExpChange(expIdx, 'type', e.target.value)}
                      className="w-full rounded-lg bg-[#222226] border border-white/10 px-3 py-2 text-sm text-white focus:border-white/30 focus:outline-none"
                    >
                      <option value="PKL / Industri">PKL / Industri</option>
                      <option value="Magang">Magang</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Administrasi">Administrasi</option>
                      <option value="Kontrak">Kontrak</option>
                      <option value="Full-time">Full-time</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                      Lokasi
                    </label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => handleExpChange(expIdx, 'location', e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                      Periode
                    </label>
                    <input
                      type="text"
                      placeholder="Sep 2024 — Des 2024"
                      value={exp.period}
                      onChange={(e) => handleExpChange(expIdx, 'period', e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                      Durasi
                    </label>
                    <input
                      type="text"
                      placeholder="4 bulan"
                      value={exp.duration}
                      onChange={(e) => handleExpChange(expIdx, 'duration', e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                    Ringkasan Tugas
                  </label>
                  <textarea
                    rows={3}
                    value={exp.summary}
                    onChange={(e) => handleExpChange(expIdx, 'summary', e.target.value)}
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white leading-relaxed focus:border-white/30 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                    Poin Highlights
                  </label>
                  <div className="space-y-2">
                    {exp.highlights.map((hl, hlIdx) => (
                      <div key={hlIdx} className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={hl}
                          onChange={(e) => handleExpHighlightChange(expIdx, hlIdx, e.target.value)}
                          className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs text-white"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveExpHighlight(expIdx, hlIdx)}
                          className="p-2 text-white/40 hover:text-rose-400 cursor-pointer min-h-[36px]"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddExpHighlight(expIdx)}
                      className="text-xs font-mono text-emerald-400 hover:underline cursor-pointer pt-1 block min-h-[36px]"
                    >
                      + Tambah Poin Highlight
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                    Path Gambar / Dokumen (/proof/...)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={exp.image}
                      onChange={(e) => handleExpChange(expIdx, 'image', e.target.value)}
                      className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                    />
                    {exp.image && (
                      <div className="h-10 w-12 shrink-0 rounded border border-white/10 bg-black/40 overflow-hidden">
                        <img
                          src={exp.image}
                          alt="preview"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl sm:text-2xl font-bold">Daftar Proyek Portofolio</h2>
              <button
                onClick={handleAddProject}
                className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-3 py-2 font-mono text-xs text-white hover:bg-white/10 cursor-pointer min-h-[40px]"
              >
                <Plus size={14} /> Tambah
              </button>
            </div>

            {projectsList.map((proj, projIdx) => (
              <div
                key={proj.title || projIdx}
                className="rounded-2xl border border-white/10 bg-[#18181c] p-5 sm:p-6 space-y-4 relative"
              >
                <button
                  onClick={() =>
                    setDeleteConfirm({
                      tab: 'projects',
                      index: projIdx,
                      title: proj.title,
                    })
                  }
                  title="Hapus Proyek"
                  className="absolute top-5 right-5 p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pr-10">
                  <div className="sm:col-span-2">
                    <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                      Judul Proyek
                    </label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => handleProjChange(projIdx, 'title', e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                      Kategori
                    </label>
                    <select
                      value={proj.category}
                      onChange={(e) => handleProjChange(projIdx, 'category', e.target.value)}
                      className="w-full rounded-lg bg-[#222226] border border-white/10 px-3 py-2 text-sm text-white"
                    >
                      <option value="Networking">Networking</option>
                      <option value="IoT & Hardware">IoT & Hardware</option>
                      <option value="Data">Data</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                      Peran Anda
                    </label>
                    <input
                      type="text"
                      value={proj.role}
                      onChange={(e) => handleProjChange(projIdx, 'role', e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                      Periode
                    </label>
                    <input
                      type="text"
                      value={proj.period}
                      onChange={(e) => handleProjChange(projIdx, 'period', e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                    Ringkasan Proyek
                  </label>
                  <textarea
                    rows={2}
                    value={proj.summary}
                    onChange={(e) => handleProjChange(projIdx, 'summary', e.target.value)}
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                    Tags / Teknologi (pisahkan koma)
                  </label>
                  <input
                    type="text"
                    value={proj.tags.join(', ')}
                    onChange={(e) =>
                      handleProjChange(
                        projIdx,
                        'tags',
                        e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                      )
                    }
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                    Path Gambar Utama
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={proj.image}
                      onChange={(e) => handleProjChange(projIdx, 'image', e.target.value)}
                      className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                    />
                    {proj.image && (
                      <div className="h-10 w-12 shrink-0 rounded border border-white/10 bg-black/40 overflow-hidden">
                        <img
                          src={proj.image}
                          alt="preview"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. CERTIFICATES TAB */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl sm:text-2xl font-bold">Daftar Sertifikat</h2>
              <button
                onClick={handleAddCertificate}
                className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-3 py-2 font-mono text-xs text-white hover:bg-white/10 cursor-pointer min-h-[40px]"
              >
                <Plus size={14} /> Tambah
              </button>
            </div>

            {certificatesList.map((cert, certIdx) => (
              <div
                key={cert.title || certIdx}
                className="rounded-2xl border border-white/10 bg-[#18181c] p-5 sm:p-6 space-y-4 relative"
              >
                <button
                  onClick={() =>
                    setDeleteConfirm({
                      tab: 'certificates',
                      index: certIdx,
                      title: cert.title,
                    })
                  }
                  title="Hapus Sertifikat"
                  className="absolute top-5 right-5 p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pr-10">
                  <div className="sm:col-span-2">
                    <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                      Judul Sertifikat
                    </label>
                    <input
                      type="text"
                      value={cert.title}
                      onChange={(e) => handleCertChange(certIdx, 'title', e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                      Penerbit (Issuer)
                    </label>
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => handleCertChange(certIdx, 'issuer', e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                      Periode / Tahun
                    </label>
                    <input
                      type="text"
                      value={cert.period}
                      onChange={(e) => handleCertChange(certIdx, 'period', e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                      Tags (pisahkan koma)
                    </label>
                    <input
                      type="text"
                      value={cert.tags.join(', ')}
                      onChange={(e) =>
                        handleCertChange(
                          certIdx,
                          'tags',
                          e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                        )
                      }
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                    Deskripsi Kompetensi
                  </label>
                  <textarea
                    rows={2}
                    value={cert.description}
                    onChange={(e) => handleCertChange(certIdx, 'description', e.target.value)}
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                    Path Preview Gambar (/proof/...)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={cert.preview}
                      onChange={(e) => handleCertChange(certIdx, 'preview', e.target.value)}
                      className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                    />
                    {cert.preview && (
                      <div className="h-10 w-12 shrink-0 rounded border border-white/10 bg-black/40 overflow-hidden">
                        <img
                          src={cert.preview}
                          alt="preview"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Floating Bottom Action Bar for Mobile & Quick Save */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#18181c]/95 backdrop-blur-lg border-t border-white/15 px-4 py-3 sm:hidden flex items-center justify-between gap-3 shadow-2xl">
        <div className="flex items-center gap-2">
          <button
            onClick={handleBackupDownload}
            title="Download Backup"
            className="p-2.5 rounded-xl border border-white/15 text-white/80 hover:bg-white/10 cursor-pointer"
          >
            <Download size={16} />
          </button>
          <button
            onClick={handleResetToDefault}
            title="Reset"
            className="p-2.5 rounded-xl border border-white/15 text-white/80 hover:bg-white/10 cursor-pointer"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white text-[#111114] py-2.5 font-bold text-xs uppercase tracking-wider hover:bg-[#e8e8e5] transition-all disabled:opacity-50 cursor-pointer shadow-lg"
        >
          <Save size={15} />
          <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
        </button>
      </div>

      {/* Confirmation Modal for Delete */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-[#18181c] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-base">Konfirmasi Hapus</h3>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="text-white/50 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-xs text-white/80 leading-relaxed">
              Apakah Anda yakin ingin menghapus{' '}
              <strong className="text-rose-400 font-semibold">{deleteConfirm.title}</strong>?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="rounded-xl border border-white/15 px-4 py-2 text-xs font-mono text-white/70 hover:bg-white/10 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={executeDelete}
                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-500 transition-all cursor-pointer shadow-md"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

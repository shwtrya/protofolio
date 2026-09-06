import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { initialExperiences, type ExperienceItem } from '../data/experience';
import { projects as initialProjects, type PortfolioProject } from '../data/projects';
import {
  getStoredExperiences,
  saveStoredExperiences,
  getStoredProjects,
  saveStoredProjects,
} from '../lib/portfolioStore';
import { supabaseConfigured } from '../lib/supabase';
import { ArrowLeft, Save, Plus, Trash2, LogOut, CheckCircle2, AlertCircle } from 'lucide-react';

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

  const [activeTab, setActiveTab] = useState<'experience' | 'projects'>('experience');
  const [experiences, setExperiences] = useState<ExperienceItem[]>(initialExperiences);
  const [projectsList, setProjectsList] = useState<PortfolioProject[]>(initialProjects);

  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      void getStoredExperiences().then(setExperiences);
      void getStoredProjects().then(setProjectsList);
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

    setSaving(false);
    if (expOk && projOk) {
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
        role: 'Peran Baru',
        company: 'Nama Perusahaan',
        location: 'Lokasi',
        period: '2026',
        duration: 'Bulan / Durasi',
        type: 'PKL / Industri',
        summary: 'Deskripsi pekerjaan...',
        highlights: ['Tugas 1'],
        image: '/proof/preview-cv.webp',
        imageAlt: 'Dokumentasi pekerjaan',
      },
    ]);
  };

  const handleRemoveExperience = (index: number) => {
    if (!confirm('Hapus item pengalaman ini?')) return;
    setExperiences(experiences.filter((_, i) => i !== index));
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
        title: 'Judul Proyek Baru',
        category: 'Networking',
        summary: 'Ringkasan proyek...',
        role: 'Perancang & Teknisi',
        period: '2026',
        image: '/proof/instalasi-isp-proses.webp',
        imageAlt: 'Foto Proyek',
        tags: ['MikroTik', 'LAN'],
        status: 'documentation_on_request',
        statusLabel: 'Dokumentasi on request',
        links: {},
        proofAssets: [],
        caseStudy: {
          title: 'Judul Proyek Baru',
          overview: 'Overview proyek...',
          role: 'Peran teknis',
          problem: 'Masalah yang diselesaikan',
          solution: 'Solusi teknis',
          work: ['Langkah 1'],
          tools: ['Alat 1'],
          result: 'Hasil yang dicapai',
          learnings: ['Pelajaran didapat'],
          timeline: [],
          proofNotes: '',
        },
      },
    ]);
  };

  const handleRemoveProject = (index: number) => {
    if (!confirm('Hapus proyek ini?')) return;
    setProjectsList(projectsList.filter((_, i) => i !== index));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#111114] text-[#f4f4f1] flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-md bg-[#18181c] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#111114] font-serif italic text-xl font-bold">
              S
            </span>
            <div>
              <h1 className="font-serif text-2xl font-bold">Owner Admin Panel</h1>
              <p className="font-mono text-xs text-white/50">Shawava Tritya Portfolio</p>
            </div>
          </div>

          {authError && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-rose-500/10 border border-rose-500/20 p-3 text-sm text-rose-400">
              <AlertCircle size={16} />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-mono text-xs text-white/70 uppercase mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="shawavatritya@gmail.com"
                className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-sm text-white focus:border-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-white/70 uppercase mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-sm text-white focus:border-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 rounded-xl bg-white text-[#111114] font-semibold py-3 text-sm hover:bg-[#e8e8e5] transition-all cursor-pointer"
            >
              Masuk ke Admin
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-white/50 hover:text-white"
            >
              <ArrowLeft size={14} /> Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111114] text-[#f4f4f1] pb-24">
      {/* Top Navbar */}
      <div className="sticky top-0 z-40 bg-[#18181c]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 font-mono text-xs text-white/60 hover:text-white"
          >
            <ArrowLeft size={16} /> Lihat Web
          </Link>
          <span className="text-white/20">|</span>
          <span className="font-serif font-bold text-lg">Portfolio Editor</span>
          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400">
            {supabaseConfigured ? 'Supabase Connected' : 'Local Storage'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="flex items-center gap-2 rounded-full bg-white text-[#111114] px-5 py-2 font-semibold text-xs hover:bg-[#e8e8e5] transition-all disabled:opacity-50 cursor-pointer shadow-lg"
          >
            <Save size={14} />
            <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 font-mono text-xs text-white/70 hover:bg-white/10 cursor-pointer"
          >
            <LogOut size={14} /> Keluar
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-8">
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

        {/* Tab Controls */}
        <div className="flex gap-2 border-b border-white/10 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-5 py-2.5 rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'experience'
                ? 'bg-white text-[#111114]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            Pengalaman Kerja ({experiences.length})
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-5 py-2.5 rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-white text-[#111114]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            Proyek Portfolio ({projectsList.length})
          </button>
        </div>

        {/* EXPERIENCE TAB */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold">Daftar Pengalaman Kerja</h2>
              <button
                onClick={handleAddExperience}
                className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-4 py-2 font-mono text-xs text-white hover:bg-white/10 cursor-pointer"
              >
                <Plus size={14} /> Tambah Pengalaman
              </button>
            </div>

            {experiences.map((exp, expIdx) => (
              <div
                key={exp.id || expIdx}
                className="rounded-2xl border border-white/10 bg-[#18181c] p-6 space-y-4 relative"
              >
                <button
                  onClick={() => handleRemoveExperience(expIdx)}
                  title="Hapus Pengalaman"
                  className="absolute top-6 right-6 p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 cursor-pointer"
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
                      Tipe (PKL / Industri / Freelance)
                    </label>
                    <input
                      type="text"
                      value={exp.type}
                      onChange={(e) => handleExpChange(expIdx, 'type', e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                    />
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
                      Periode (contoh: Sep 2024 — Des 2024)
                    </label>
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) => handleExpChange(expIdx, 'period', e.target.value)}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                      Durasi (contoh: 4 bulan)
                    </label>
                    <input
                      type="text"
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
                    rows={2}
                    value={exp.summary}
                    onChange={(e) => handleExpChange(expIdx, 'summary', e.target.value)}
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                    Poin Highlights
                  </label>
                  <div className="space-y-2">
                    {exp.highlights.map((hl, hlIdx) => (
                      <div key={hlIdx} className="flex gap-2">
                        <input
                          type="text"
                          value={hl}
                          onChange={(e) => handleExpHighlightChange(expIdx, hlIdx, e.target.value)}
                          className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-white"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveExpHighlight(expIdx, hlIdx)}
                          className="p-1.5 text-white/40 hover:text-rose-400 cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddExpHighlight(expIdx)}
                      className="text-xs font-mono text-emerald-400 hover:underline cursor-pointer pt-1"
                    >
                      + Tambah Poin Highlight
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-white/50 uppercase mb-1">
                    Path Gambar / Dokumen (/proof/...)
                  </label>
                  <input
                    type="text"
                    value={exp.image}
                    onChange={(e) => handleExpChange(expIdx, 'image', e.target.value)}
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold">Daftar Proyek</h2>
              <button
                onClick={handleAddProject}
                className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-4 py-2 font-mono text-xs text-white hover:bg-white/10 cursor-pointer"
              >
                <Plus size={14} /> Tambah Proyek
              </button>
            </div>

            {projectsList.map((proj, projIdx) => (
              <div
                key={projIdx}
                className="rounded-2xl border border-white/10 bg-[#18181c] p-6 space-y-4 relative"
              >
                <button
                  onClick={() => handleRemoveProject(projIdx)}
                  title="Hapus Proyek"
                  className="absolute top-6 right-6 p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-10">
                  <div>
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
                      Kategori (Networking / IoT &amp; Hardware / Data)
                    </label>
                    <input
                      type="text"
                      value={proj.category}
                      onChange={(e) => handleProjChange(projIdx, 'category', e.target.value as any)}
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
                      Tags (pisahkan dengan koma)
                    </label>
                    <input
                      type="text"
                      value={proj.tags.join(', ')}
                      onChange={(e) =>
                        handleProjChange(
                          projIdx,
                          'tags',
                          e.target.value.split(',').map((t) => t.trim())
                        )
                      }
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;

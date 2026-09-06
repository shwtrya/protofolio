import { supabaseConfigured } from './supabase';
import { initialExperiences, type ExperienceItem } from '../data/experience';
import { projects as initialProjects, type PortfolioProject } from '../data/projects';
import { initialCertificates, type Certificate } from '../data/certificates';

const baseUrl = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const STORAGE_KEY_EXP = 'portfolio_experiences_cache';
const STORAGE_KEY_PROJ = 'portfolio_projects_cache';
const STORAGE_KEY_CERT = 'portfolio_certificates_cache';

// Experiences
export const getStoredExperiences = async (): Promise<ExperienceItem[]> => {
  if (supabaseConfigured) {
    try {
      const res = await fetch(`${baseUrl}/rest/v1/portfolio_data?key=eq.experiences&select=data`, {
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
        },
      });
      if (res.ok) {
        const rows = await res.json();
        if (rows && rows.length > 0 && Array.isArray(rows[0].data)) {
          localStorage.setItem(STORAGE_KEY_EXP, JSON.stringify(rows[0].data));
          return rows[0].data;
        }
      }
    } catch (e) {
      console.warn('Supabase fetch experiences failed, falling back:', e);
    }
  }

  try {
    const cached = localStorage.getItem(STORAGE_KEY_EXP);
    if (cached) return JSON.parse(cached);
  } catch (e) {
    console.warn('localStorage read failed:', e);
  }

  return initialExperiences;
};

export const saveStoredExperiences = async (items: ExperienceItem[]): Promise<boolean> => {
  localStorage.setItem(STORAGE_KEY_EXP, JSON.stringify(items));

  if (supabaseConfigured) {
    try {
      const res = await fetch(`${baseUrl}/rest/v1/portfolio_data`, {
        method: 'POST',
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates',
        },
        body: JSON.stringify({
          key: 'experiences',
          data: items,
          updated_at: new Date().toISOString(),
        }),
      });
      return res.ok;
    } catch (e) {
      console.error('Failed to upsert experiences to Supabase:', e);
      return false;
    }
  }
  return true;
};

// Projects
export const getStoredProjects = async (): Promise<PortfolioProject[]> => {
  if (supabaseConfigured) {
    try {
      const res = await fetch(`${baseUrl}/rest/v1/portfolio_data?key=eq.projects&select=data`, {
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
        },
      });
      if (res.ok) {
        const rows = await res.json();
        if (rows && rows.length > 0 && Array.isArray(rows[0].data)) {
          localStorage.setItem(STORAGE_KEY_PROJ, JSON.stringify(rows[0].data));
          return rows[0].data;
        }
      }
    } catch (e) {
      console.warn('Supabase fetch projects failed, falling back:', e);
    }
  }

  try {
    const cached = localStorage.getItem(STORAGE_KEY_PROJ);
    if (cached) return JSON.parse(cached);
  } catch (e) {
    console.warn('localStorage read failed:', e);
  }

  return initialProjects;
};

export const saveStoredProjects = async (items: PortfolioProject[]): Promise<boolean> => {
  localStorage.setItem(STORAGE_KEY_PROJ, JSON.stringify(items));

  if (supabaseConfigured) {
    try {
      const res = await fetch(`${baseUrl}/rest/v1/portfolio_data`, {
        method: 'POST',
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates',
        },
        body: JSON.stringify({
          key: 'projects',
          data: items,
          updated_at: new Date().toISOString(),
        }),
      });
      return res.ok;
    } catch (e) {
      console.error('Failed to upsert projects to Supabase:', e);
      return false;
    }
  }
  return true;
};

// Certificates
export const getStoredCertificates = async (): Promise<Certificate[]> => {
  if (supabaseConfigured) {
    try {
      const res = await fetch(`${baseUrl}/rest/v1/portfolio_data?key=eq.certificates&select=data`, {
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
        },
      });
      if (res.ok) {
        const rows = await res.json();
        if (rows && rows.length > 0 && Array.isArray(rows[0].data)) {
          localStorage.setItem(STORAGE_KEY_CERT, JSON.stringify(rows[0].data));
          return rows[0].data;
        }
      }
    } catch (e) {
      console.warn('Supabase fetch certificates failed, falling back:', e);
    }
  }

  try {
    const cached = localStorage.getItem(STORAGE_KEY_CERT);
    if (cached) return JSON.parse(cached);
  } catch (e) {
    console.warn('localStorage read failed:', e);
  }

  return initialCertificates;
};

export const saveStoredCertificates = async (items: Certificate[]): Promise<boolean> => {
  localStorage.setItem(STORAGE_KEY_CERT, JSON.stringify(items));

  if (supabaseConfigured) {
    try {
      const res = await fetch(`${baseUrl}/rest/v1/portfolio_data`, {
        method: 'POST',
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates',
        },
        body: JSON.stringify({
          key: 'certificates',
          data: items,
          updated_at: new Date().toISOString(),
        }),
      });
      return res.ok;
    } catch (e) {
      console.error('Failed to upsert certificates to Supabase:', e);
      return false;
    }
  }
  return true;
};

import type { NavigateFunction } from 'react-router-dom';

const ROUTE_TO_ID: Record<string, string> = {
  '/': 'home',
  '/about': 'about',
  '/experience': 'experience',
  '/projects': 'projects',
  '/education': 'education',
  '/skills': 'skills',
  '/certificates': 'certificates',
  '/contact': 'contact',
};

const targetId = (href: string) => {
  const value = href.replace(/^#/, '');
  return ROUTE_TO_ID[href] ?? value;
};

const scrollToId = (href: string, attempt = 0) => {
  if (typeof document === 'undefined') return false;
  const id = targetId(href);
  const element = document.getElementById(id);
  if (!element) {
    if (attempt < 20 && typeof window !== 'undefined') {
      window.setTimeout(() => scrollToId(href, attempt + 1), 50);
    }
    return false;
  }
  const headerOffset = 76;
  const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  return true;
};

export const scrollToSection = (href: string, currentPath: string, navigate: NavigateFunction) => {
  if (currentPath !== '/') {
    navigate('/');
    window.setTimeout(() => scrollToId(href), 50);
    return;
  }
  scrollToId(href);
};

export const scrollToSectionById = (href: string) => scrollToId(href);

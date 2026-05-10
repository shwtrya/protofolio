import type { NavigateFunction } from 'react-router-dom';

const DEFAULT_SCROLL_DELAY_MS = 50;

const scrollIntoView = (href: string) => {
  if (typeof document === 'undefined') {
    return;
  }
  const element = document.querySelector(href);
  element?.scrollIntoView({ behavior: 'smooth' });
};

export const scrollToSection = (
  href: string,
  currentPath: string,
  navigate: NavigateFunction,
  delayMs: number = DEFAULT_SCROLL_DELAY_MS,
) => {
  if (currentPath !== '/') {
    navigate('/');
    if (typeof window === 'undefined') {
      scrollIntoView(href);
      return;
    }
    window.setTimeout(() => {
      scrollIntoView(href);
    }, delayMs);
    return;
  }
  scrollIntoView(href);
};

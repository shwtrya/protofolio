import { useEffect, useState } from 'react';
import { navigationItems } from '../data/navigation';

/**
 * Active nav section from scroll position.
 *
 * IntersectionObserver ratio-sorting got stuck on `home` because the hero is
 * shorter than the viewport: it stayed the highest-ratio entry while the next
 * section was already the one being read. Position-based picking has no such
 * hole — the last section whose top has passed the header line wins, and the
 * final section wins outright at the bottom of the page.
 */
export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const read = () => {
      const line = window.innerHeight * 0.3;
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;

      if (atBottom) {
        setActiveSection(navigationItems[navigationItems.length - 1].id);
        return;
      }

      // At the very top of the page nothing has scrolled past the header line,
      // so home is active. This also covers a hero shorter than the viewport —
      // otherwise the position loop below would claim the *last* section.
      if (window.scrollY < 4) {
        setActiveSection('home');
        return;
      }

      let current = navigationItems[0].id;
      for (const { id } of navigationItems) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top != null && top <= line) current = id;
      }
      setActiveSection(current);
    };

    read();
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    return () => {
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
    };
  }, []);

  return activeSection;
};

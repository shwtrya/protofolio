import { useEffect, useState } from 'react';
import { navigationItems } from '../data/navigation';

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = navigationItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-76px 0px -45% 0px', threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeSection;
};

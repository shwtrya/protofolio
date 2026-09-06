import { useEffect, useState } from 'react';

export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-[2.5px] origin-left bg-[#111114] transition-transform duration-75"
      style={{ transform: `scaleX(${progress / 100})` }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;

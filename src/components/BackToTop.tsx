import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-[10px] border border-line bg-bg/90 text-fg backdrop-blur-sm transition-colors hover:border-accent hover:text-accent no-print"
      aria-label="Kembali ke atas"
    >
      <ArrowUp size={18} />
    </button>
  );
};

export default BackToTop;

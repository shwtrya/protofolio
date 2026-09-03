import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Soft-404 guard: SPA catch-all serves HTTP 200, so tell crawlers not to index.
// ponytail: client-side noindex only. Upgrade to a real 404 status via
// prerender/SSR if Search Console still reports soft 404s.
const useNoIndex = () => {
  useEffect(() => {
    const tag = document.createElement('meta');
    tag.name = 'robots';
    tag.content = 'noindex, nofollow';
    document.head.appendChild(tag);
    return () => tag.remove();
  }, []);
};

const NotFound = () => {
  useNoIndex();

  return (
    <div className="flex min-h-[70vh] items-center bg-bg">
      <div className="container-responsive">
        <p className="t-mono t-mono-accent">ERROR 404</p>
        <h1 className="t-display mt-3">Halaman Tidak Ditemukan</h1>
        <p className="t-lead mt-4 max-w-prose">
          Alamat yang Anda buka tidak ada atau sudah dipindahkan.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="btn btn-primary">
            Kembali ke Beranda
          </Link>
          <Link to="/contact" className="btn btn-secondary">
            Hubungi Saya
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

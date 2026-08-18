import React from 'react';

const NotFound: React.FC = () => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 px-4 text-center dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <div>
      <div className="mb-4 text-8xl font-bold text-blue-600 dark:text-blue-400 sm:text-9xl">404</div>
      <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white sm:text-4xl">Halaman Tidak Ditemukan</h1>
      <p className="mx-auto mb-8 max-w-md text-base text-gray-600 dark:text-gray-300 sm:text-lg">
        Halaman yang Anda cari tidak ditemukan atau sudah dipindahkan.
      </p>
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <button type="button" onClick={() => { window.location.href = '/'; }} className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700">
          Kembali ke Beranda
        </button>
        <button type="button" onClick={() => { window.location.href = '/#contact'; }} className="inline-flex min-h-[44px] items-center justify-center rounded-lg border-2 border-gray-300 px-8 py-3 font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-400">
          Hubungi Saya
        </button>
      </div>
    </div>
  </div>
);

export default NotFound;

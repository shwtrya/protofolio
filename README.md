# Protofolio

Protofolio adalah aplikasi portofolio modern yang dibangun dengan Vite + React untuk menampilkan profil, proyek, dan pengalaman secara cepat serta ringan. **Tujuan v1.2** adalah meningkatkan observabilitas, stabilitas, dan kualitas pengalaman pengguna lewat analytics, pelacakan pengunjung, serta penanganan error yang lebih baik.

## Instalasi & Menjalankan Aplikasi

Prasyarat: Node.js (disarankan versi LTS) dan npm.

```bash
npm install
npm run dev
```

Perintah tambahan yang umum digunakan:

```bash
npm run build
npm run preview
```

## Environment Variables

Pastikan variabel berikut tersedia di lingkungan (mis. melalui file `.env`):

- `VITE_SUPABASE_URL` — URL proyek Supabase, digunakan sebagai endpoint utama untuk membaca/menulis data.
- `VITE_SUPABASE_ANON_KEY` — kunci anon (public) Supabase untuk autentikasi client-side yang aman.

Contoh:

```bash
VITE_SUPABASE_URL="https://<project-ref>.supabase.co"
VITE_SUPABASE_ANON_KEY="<your-anon-key>"
```

## Ringkasan Fitur v1.2

- **Analytics & visitor tracking** untuk memantau kunjungan dan perilaku pengguna secara ringkas.
- **Error boundary** agar kegagalan komponen tidak merusak seluruh halaman dan tetap memberikan feedback yang jelas.
- **Peningkatan stabilitas** pada alur loading data dan interaksi UI.

## Deployment (Opsional)

Aplikasi ini siap dideploy sebagai static site.

1. Build aplikasi:
   ```bash
   npm run build
   ```
2. Upload folder `dist/` ke hosting static (Netlify, Vercel, GitHub Pages, atau layanan serupa).
3. Pastikan environment variables diset di platform hosting sesuai kebutuhan.

## Troubleshooting Singkat

- **Blank page / error runtime**: pastikan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` sudah benar.
- **Build gagal**: hapus `node_modules` dan `package-lock.json`, lalu jalankan ulang `npm install`.
- **Data tidak muncul**: cek koneksi jaringan dan status layanan Supabase.

## Lisensi

Tentukan lisensi proyek sesuai kebutuhan (mis. MIT) sebelum rilis publik.

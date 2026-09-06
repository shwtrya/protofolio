export interface ExperienceItem {
  id: string;
  num: string;
  role: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  type: string;
  summary: string;
  highlights: string[];
  image: string;
  imageAlt: string;
}

export const initialExperiences: ExperienceItem[] = [
  {
    id: 'rekadaya',
    num: '01',
    role: 'Operator Produksi',
    company: 'PT Rekadaya Multi Adiprima',
    location: 'Ciangsana, Bogor',
    period: 'Sep 2024 — Des 2024',
    duration: '4 bulan',
    type: 'PKL / Industri',
    summary:
      'Menjalankan tugas lini produksi manufaktur otomotif dengan memprioritaskan ketelitian sortasi material, perakitan part felt presisi, dan standardisasi kualitas.',
    highlights: [
      'Sortir material & verifikasi spesifikasi komponen',
      'Assembly double tape felt presisi & rapi',
      'Quality check produk akhir sebelum packaging',
      'Mencapai target harian dengan disiplin 5S',
    ],
    image: '/proof/preview-Sertifikat_PKL_PT_Rekadaya_2025.webp',
    imageAlt: 'Sertifikat Praktik Kerja Lapangan PT Rekadaya Multi Adiprima',
  },
  {
    id: 'serin',
    num: '02',
    role: 'Operator Produksi',
    company: 'PT Serin Indonesia',
    location: 'Bekasi, Jawa Barat',
    period: 'Jun 2024 — Sep 2024',
    duration: '4 bulan',
    type: 'PKL / Industri',
    summary:
      'Mendukung kelancaran lini perakitan tas dan perlengkapan industri dengan mematuhi SOP, persiapan komponen, serta aplikasi pengeleman material secara rapi.',
    highlights: [
      'Pemasangan aksesoris silinder pada zipper tas',
      'Aplikasi perekat & lem presisi material jahitan',
      'Pemeriksaan kerapian visual & fungsi mekanik',
      'Menjaga kebersihan area kerja (5S) & mesin',
    ],
    image: '/proof/instalasi-isp-proses.webp',
    imageAlt: 'Praktik kerja teknis operasional dan perakitan peralatan',
  },
  {
    id: 'wova',
    num: '03',
    role: 'Data Entry Specialist',
    company: 'PT Wova Group Indonesia',
    location: 'Cileungsi, Bogor',
    period: '2023 — 2025',
    duration: 'Freelance',
    type: 'Administrasi',
    summary:
      'Menginput, merapikan, dan memverifikasi data operasional pelanggan secara teliti untuk memastikan konsistensi database digital dan kemudahan rekapitulasi.',
    highlights: [
      'Input data berkala & validasi cegah duplikasi',
      'Pembersihan & standardisasi format record berulang',
      'Penyusunan rekapitulasi data siap baca untuk tim',
      'Pemanfaatan spreadsheet digital percepat kerja',
    ],
    image: '/proof/preview-cv.webp',
    imageAlt: 'Dokumentasi rekapitulasi data administrasi dan berkas operasional',
  },
];

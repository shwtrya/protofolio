export interface Certificate {
  title: string;
  issuer: string;
  period: string;
  description: string;
  preview: string;
  tags: string[];
}

export const initialCertificates: Certificate[] = [
  {
    title: 'Sertifikat IT Specialist - Networking',
    issuer: 'Certiport / Pearson VUE',
    period: '2025',
    description:
      'Sertifikasi kompetensi global IT Specialist bidang Networking, membuktikan penguasaan konsep jaringan TCP/IP, model OSI, subnetting, switching, routing, dan troubleshooting koneksi.',
    preview: '/proof/preview-Sertifikat_IT_Specialist_Networking_2025.webp',
    tags: ['Networking', 'TCP/IP', 'Routing & Switching', 'Certiport Global'],
  },
  {
    title: 'Sertifikat Praktek Kerja Lapangan (PKL)',
    issuer: 'PT Rekadaya Multi Adiprima',
    period: '2024 — 2025',
    description:
      'Bukti pelaksanaan PKL industri di PT Rekadaya Multi Adiprima dengan predikat sangat baik dalam kedisiplinan, ketelitian perakitan komponen felt manufaktur otomotif, dan standar quality control.',
    preview: '/proof/preview-Sertifikat_PKL_PT_Rekadaya_2025.webp',
    tags: ['PKL Industri', 'Quality Control', 'Manufacturing Assembly'],
  },
];

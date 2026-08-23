export type ProjectStatus = 'demo_on_request' | 'documentation_on_request';

export interface ProjectLinkSet {
  demoUrl?: string;
  sourceUrl?: string;
}

export interface ProofAsset {
  label: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CaseStudyTimelineItem {
  phase: string;
  description: string;
}

export interface ProjectCaseStudy {
  title: string;
  overview: string;
  role: string;
  problem: string;
  solution: string;
  work: string[];
  tools: string[];
  result: string;
  learnings: string[];
  timeline: CaseStudyTimelineItem[];
  proofNotes: string;
}

export interface PortfolioProject {
  title: string;
  summary: string;
  role: string;
  period: string;
  image: string;
  imageAlt: string;
  tags: string[];
  status: ProjectStatus;
  statusLabel: string;
  links: ProjectLinkSet;
  proofAssets: ProofAsset[];
  caseStudy: ProjectCaseStudy;
}

export const projects: PortfolioProject[] = [
  {
    title: 'Smart Home Berbasis Arduino Uno',
    summary:
      'Prototype sistem smart home untuk memantau suhu ruangan dan mengontrol lampu menggunakan Arduino, sensor, relay, dan modul konektivitas.',
    role: 'Perancang dan perakit prototype',
    period: 'Proyek pembelajaran TKJ',
    image: '/proof/smart-home-hasil.jpg',
    imageAlt:
      'Foto hasil prototype smart home berbasis Arduino untuk monitoring suhu dan kontrol lampu',
    tags: ['Arduino', 'IoT', 'Sensor', 'Relay'],
    status: 'demo_on_request',
    statusLabel: 'Demo on request',
    links: {},
    proofAssets: [
      {
        label: 'Proses perakitan prototype smart home',
        src: '/proof/smart-home-proses.jpg',
        alt:
          'Foto proses perakitan rangkaian Arduino, sensor, relay, dan modul pendukung untuk prototype smart home',
        width: 1200,
        height: 800
      },
      {
        label: 'Hasil prototype smart home',
        src: '/proof/smart-home-hasil.jpg',
        alt:
          'Foto hasil prototype smart home berbasis Arduino untuk monitoring suhu dan kontrol lampu',
        width: 1200,
        height: 800
      }
    ],
    caseStudy: {
      title: 'Smart Home Berbasis Arduino Uno',
      overview:
        'Prototype ini dibuat sebagai latihan penerapan mikrokontroler untuk membaca kondisi ruangan dan mengontrol perangkat sederhana.',
      role: 'Saya merancang alur kerja sistem, merakit komponen, menulis program dasar, dan melakukan pengujian fungsi utama.',
      problem:
        'Perangkat elektronik sederhana sering belum memiliki indikator kondisi yang mudah dipantau dan kontrol yang praktis.',
      solution:
        'Membuat rangkaian berbasis Arduino dengan sensor suhu dan relay, lalu menyusun logika kontrol agar perangkat dapat dipantau dan dikendalikan.',
      work: [
        'Menyusun kebutuhan komponen dan alur input-output sistem.',
        'Merakit Arduino, sensor, relay, dan modul pendukung secara bertahap.',
        'Menulis program dasar untuk membaca sensor dan mengaktifkan kontrol relay.',
        'Menguji respons sensor, koneksi komponen, dan kondisi nyala/mati perangkat.'
      ],
      tools: ['Arduino Uno', 'Sensor suhu', 'Relay module', 'ESP8266', 'Arduino IDE'],
      result:
        'Prototype berhasil menunjukkan alur monitoring suhu dan kontrol lampu dalam skala pembelajaran. Dokumentasi demo dapat saya tunjukkan saat dihubungi.',
      learnings: [
        'Lebih memahami pembacaan sensor dan kontrol output pada Arduino.',
        'Belajar memeriksa wiring, power, dan logika program saat troubleshooting.',
        'Membiasakan dokumentasi proses agar proyek mudah dijelaskan kembali.'
      ],
      timeline: [
        {
          phase: 'Riset komponen',
          description: 'Menentukan sensor, relay, dan modul yang sesuai untuk prototype.'
        },
        {
          phase: 'Perakitan',
          description: 'Menghubungkan komponen utama dan mengecek wiring secara bertahap.'
        },
        {
          phase: 'Pemrograman',
          description: 'Membuat program pembacaan sensor dan kontrol output sederhana.'
        },
        {
          phase: 'Pengujian',
          description: 'Menguji respons sistem dan memperbaiki kendala pada rangkaian.'
        }
      ],
      proofNotes:
        'Foto proses dan hasil menjadi dokumentasi utama proyek. Demo atau dokumentasi tambahan dapat saya tunjukkan saat dihubungi.'
    }
  },
  {
    title: 'Instalasi ISP hingga Router',
    summary:
      'Dokumentasi praktik instalasi jaringan FTTH: persiapan perangkat, penataan kabel, konfigurasi router, serta hasil uji konektivitas.',
    role: 'Teknis praktik',
    period: '3 bulan',
    image: '/proof/instalasi-isp-hasil.jpg',
    imageAlt:
      'Foto hasil instalasi jaringan dari perangkat ISP hingga router',
    tags: ['Networking', 'Router', 'FTTH', 'Documentation'],
    status: 'documentation_on_request',
    statusLabel: 'Dokumentasi on request',
    links: {},
    proofAssets: [
      {
        label: 'Proses instalasi jaringan',
        src: '/proof/instalasi-isp-proses.jpg',
        alt:
          'Foto proses instalasi jaringan, penataan kabel, dan persiapan perangkat dari ISP hingga router',
        width: 1200,
        height: 800
      },
      {
        label: 'Hasil instalasi jaringan',
        src: '/proof/instalasi-isp-hasil.jpg',
        alt:
          'Foto hasil instalasi jaringan dan router setelah pengecekan konektivitas',
        width: 1200,
        height: 800
      }
    ],
    caseStudy: {
      title: 'Instalasi ISP hingga Router',
      overview:
        'Pengalaman praktik mendokumentasi alur teknis jaringan dari persiapan perangkat hingga konfigurasi dasar router untuk dokumentasi portofolio.',
      role:
        'Terkatatan praktik instalasi dan konfigurasi router serta verifikasi konektivitas.',
      problem:
        'Keterbatasan dokumentasi visual dan catatan konfigurasi terstruktur saat pelatihan praktik jaringan.',
      solution:
        'Membuat catatan tahap per tahap: persiapan perangkat, jalur kabel, setting router, hasil test konektivitas. Disertai foto referensi hasil instalasi FTTH.',
      work: [
        'Membantu persiapan perangkat jaringan dan kebutuhan instalasi.',
        'Melakukan penataan kabel agar rapi dan mudah diperiksa.',
        'Membantu konfigurasi dasar router sesuai kebutuhan koneksi.',
        'Melakukan pengecekan konektivitas dan troubleshooting sederhana.',
        'Mendokumentasikan setiap tahap dengan foto referensi.'
      ],
      tools: ['Router', 'Kabel UTP', 'LAN tester', 'Mikrotik dasar', 'Topologi jaringan'],
      result:
        'Dokumentasi terstruktur praktik instalasi jaringan FTTH untuk referensi portofolio.',
      learnings: [
        'Kesalahan kecil pada kabel dapat mengganggu konektivitas.',
        'Pentingnya dokumentasi konfigurasi dan topologi yang terstruktur.',
        'Meningkatkan kemampuan troubleshooting dari gejala koneksi ke kemungkinan penyebab.'
      ],
      timeline: [
        {
          phase: 'Persiapan',
          description: 'Menyiapkan perangkat, kabel, dan kebutuhan instalasi.'
        },
        {
          phase: 'Instalasi',
          description: 'Membantu pemasangan perangkat dan penataan kabel jaringan.'
        },
        {
          phase: 'Konfigurasi',
          description: 'Membantu pengaturan dasar router sesuai kebutuhan koneksi.'
        },
        {
          phase: 'Testing',
          description: 'Mengecek konektivitas dan membantu troubleshooting sederhana.'
        }
      ],
      proofNotes:
        'Foto proses dan hasil menjadi dokumentasi utama pengalaman ini. Dokumentasi detail dapat saya jelaskan atau tunjukkan saat dihubungi.'
    }
  }
];

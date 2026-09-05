export interface NavItem {
  id: string;
  href: string;
  route: string;
  label: string;
  footerLabel: string;
}

export const navigationItems: NavItem[] = [
  { id: 'home', href: '#home', route: '/', label: 'Beranda', footerLabel: 'Beranda' },
  { id: 'about', href: '#about', route: '/about', label: 'Tentang', footerLabel: 'Tentang' },
  { id: 'projects', href: '#projects', route: '/projects', label: 'Proyek', footerLabel: 'Proyek' },
  { id: 'skills', href: '#skills', route: '/skills', label: 'Keahlian', footerLabel: 'Keahlian' },
  {
    id: 'experience',
    href: '#experience',
    route: '/experience',
    label: 'Pengalaman',
    footerLabel: 'Pengalaman & Pendidikan',
  },
  {
    id: 'certificates',
    href: '#certificates',
    route: '/certificates',
    label: 'Sertifikat',
    footerLabel: 'Sertifikat',
  },
  { id: 'contact', href: '#contact', route: '/contact', label: 'Kontak', footerLabel: 'Kontak' },
];

/** Data kontak & sosial, satu sumber untuk Hero, Contact, Footer. */
export const profile = {
  name: 'Shawava Tritya',
  role: 'Teknisi Jaringan & IoT',
  location: 'Cileungsi, Kab. Bogor, Jawa Barat',
  email: 'shawavatritya@gmail.com',
  whatsapp: '6285187805786',
  whatsappLabel: '0851 8780 5786',
  github: 'https://github.com/shwtrya',
  linkedin: 'https://www.linkedin.com/in/shawava-tritya',
} as const;

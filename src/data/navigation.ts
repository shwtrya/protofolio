export interface NavItem {
  id: string;
  href: string;
  route: string;
  label: string;
  footerLabel: string;
}

export const navigationItems: NavItem[] = [
  {
    id: 'home',
    href: '#home',
    route: '/',
    label: 'Home',
    footerLabel: 'Beranda',
  },
  {
    id: 'about',
    href: '#about',
    route: '/about',
    label: 'About',
    footerLabel: 'Tentang',
  },
  {
    id: 'experience',
    href: '#experience',
    route: '/experience',
    label: 'Experience',
    footerLabel: 'Pengalaman',
  },
  {
    id: 'projects',
    href: '#projects',
    route: '/projects',
    label: 'Projects',
    footerLabel: 'Proyek',
  },
  {
    id: 'education',
    href: '#education',
    route: '/education',
    label: 'Education',
    footerLabel: 'Pendidikan',
  },
  {
    id: 'contact',
    href: '#contact',
    route: '/contact',
    label: 'Contact',
    footerLabel: 'Kontak',
  },
];

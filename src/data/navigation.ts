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
    footerLabel: 'Home',
  },
  {
    id: 'about',
    href: '#about',
    route: '/about',
    label: 'About',
    footerLabel: 'About',
  },
  {
    id: 'experience',
    href: '#experience',
    route: '/experience',
    label: 'Experience',
    footerLabel: 'Experience',
  },
  {
    id: 'projects',
    href: '#projects',
    route: '/projects',
    label: 'Projects',
    footerLabel: 'Projects',
  },
  {
    id: 'education',
    href: '#education',
    route: '/education',
    label: 'Education',
    footerLabel: 'Education',
  },
  {
    id: 'skills',
    href: '#skills',
    route: '/skills',
    label: 'Skills',
    footerLabel: 'Skills',
  },
  {
    id: 'certificates',
    href: '#certificates',
    route: '/certificates',
    label: 'Certificates',
    footerLabel: 'Certificates',
  },
  {
    id: 'contact',
    href: '#contact',
    route: '/contact',
    label: 'Contact',
    footerLabel: 'Contact',
  },
];

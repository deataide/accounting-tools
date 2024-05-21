import { Icon } from '@iconify/react';

import { SideNavItem } from '../../types/sidenavbar';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: 'NONE',
  },
  {
    title: 'Fiscal',
    path: '/fiscal',
    icon: 'NONE',
    submenu: true,
    subMenuItems: [
      { title: 'Antecipação', path: '/fiscal/antecipacao' },
      { title: 'Calculos', path: '/fiscal/calculos' },

    ],
  },
  {
    title: 'Contabil',
    path: '/contabilidade',
    icon: 'NONE',
    submenu: true,
    subMenuItems: [
    ],
  },
  {
    title: 'De. Pessoal',
    path: '/dp',
    icon: 'NONE',
    submenu: true,
    subMenuItems: [
    ],
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: 'NONE',
    submenu: true,
    subMenuItems: [
      { title: 'Account', path: '/settings/account' },
      { title: 'Clients', path: '/settings/clients' },
      { title: 'Privacy', path: '/settings/privacy' },
    ],
  },
  {
    title: 'Help',
    path: '/help',
    icon: 'NONE',
  },
];
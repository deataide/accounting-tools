import { SideNavItem } from "../../types/sidenavbar";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/dashboard",
    icon: "I - ",
  },
  { title: "Clients", path: "/clients", icon: "I - " },
  {
    title: "Fiscal",
    path: "/fiscal",
    icon: "I - ",
    submenu: true,
    subMenuItems: [
      { title: "Antecipação", path: "/fiscal/antecipacao" },
      { title: "Calculos", path: "/fiscal/calculos" },
    ],
  },
  {
    title: "Contabil",
    path: "/contabilidade",
    icon: "I - ",
    submenu: false,
    subMenuItems: [],
  },
  {
    title: "De. Pessoal",
    path: "/dp",
    icon: "I - ",
    submenu: false,
    subMenuItems: [],
  },
  {
    title: "Settings",
    path: "/settings",
    icon: "I - ",
    submenu: false,
    subMenuItems: [
      { title: "Account", path: "/settings/account" },
      { title: "Clients", path: "/settings/clients" },
      { title: "Privacy", path: "/settings/privacy" },
    ],
  },
  {
    title: "Help",
    path: "/help",
    icon: "I - ",
  },
];

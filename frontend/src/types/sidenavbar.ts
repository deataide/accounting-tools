export type SideNavItem = {
    title: string;
    path: string;
    icon?: JSX.Element | string;
    submenu?: boolean;
    subMenuItems?: SideNavItem[];
  };
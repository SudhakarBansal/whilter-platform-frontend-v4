// index.ts (barrel export)
export { Sidebar } from './components/Sidebar';
export { MenuItem } from './components/MenuItem';
export { SubMenuItem } from './components/SubmenuItem';
export { SidebarHeader } from './components/SidebarHeader';
export { SidebarContent } from './components/SidebarContent';
export { useSidebarExpansion } from './hooks/useSidebarExpansion';
export { menuItems } from './data/menuItems.data';
export { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from './constants/sidebar.constants';
export type * from './types/sidebar.types';
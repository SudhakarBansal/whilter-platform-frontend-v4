// data/menuItems.data.ts
import {
    Dashboard as DashboardIcon,
    Analytics as AnalyticsIcon,
    People as PeopleIcon,
    Settings as SettingsIcon,
    Folder as ProjectsIcon,
    Assignment as TasksIcon,
    FolderOpen,
    Description,
    Group,
    Person,
    Security,
    Notifications,
    Folder,
    Assignment,
  } from '@mui/icons-material';
  import type { MenuItem } from '../types/sidebar.types.js';
  
  export const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'analytics', label: 'Analytics', icon: AnalyticsIcon },
    {
      id: 'projects',
      label: 'Projects',
      icon: ProjectsIcon,
      subItems: [
        { id: 'projects-active', label: 'Active Projects', icon: FolderOpen },
        { id: 'projects-archive', label: 'Archived Projects', icon: Folder },
        { id: 'projects-templates', label: 'Templates', icon: Description },
      ]
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: TasksIcon,
      subItems: [
        { id: 'tasks-my', label: 'My Tasks', icon: Person },
        { id: 'tasks-assigned', label: 'Assigned to Me', icon: Assignment },
        { id: 'tasks-completed', label: 'Completed', icon: TasksIcon },
      ]
    },
    {
      id: 'team',
      label: 'Team',
      icon: PeopleIcon,
      subItems: [
        { id: 'team-members', label: 'Members', icon: Group },
        { id: 'team-roles', label: 'Roles & Permissions', icon: Security },
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: SettingsIcon,
      subItems: [
        { id: 'settings-general', label: 'General', icon: SettingsIcon },
        { id: 'settings-notifications', label: 'Notifications', icon: Notifications },
        { id: 'settings-security', label: 'Security', icon: Security },
      ]
    },
  ];
  
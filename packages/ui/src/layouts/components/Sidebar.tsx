import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
  IconButton,
  Typography,
  Divider,
  Collapse,
  Theme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Folder as ProjectsIcon,
  Assignment as TasksIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
  FolderOpen,
  Description,
  Group,
  Person,
  Security,
  Notifications,
  Folder,
  Assignment,
} from '@mui/icons-material';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedItem: string;
  onItemSelect: (item: string) => void;
  theme: Theme;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType;
  subItems?: SubMenuItem[];
}

interface SubMenuItem {
  id: string;
  label: string;
  icon: React.ComponentType;
}

const menuItems: MenuItem[] = [
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

const SIDEBAR_WIDTH = 280;
const SIDEBAR_COLLAPSED_WIDTH = 64;

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  selectedItem,
  onItemSelect,
  theme
}) => {
  const sidebarWidth = isOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH;
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const handleExpandToggle = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isExpanded = (itemId: string) => expandedItems.includes(itemId);

  const SidebarContent = () => (
    <Box className="h-full flex flex-col">
      {/* Header */}
      <Box className="p-4 flex items-center justify-between min-h-[64px]">
        {isOpen && (
          <Typography variant="h6" className="font-semibold text-primary">
            Dashboard
          </Typography>
        )}
        <IconButton
          onClick={onToggle}
          size="small"
          className="ml-auto"
          sx={{
            backgroundColor: `${theme.palette.text.primary}`,
            border: '1px solid',
            borderColor: 'divider',
            '&:hover': {
              backgroundColor: `${theme.palette.text.secondary}`,
            },
          }}
        >
          {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Divider />

      {/* Navigation Menu */}
      <Box className="flex-1 py-4">
        <List disablePadding>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedItem === item.id || selectedItem.startsWith(item.id + '-');
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const itemExpanded = isExpanded(item.id);

            const mainListItem = (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  selected={isSelected}
                  onClick={() => {
                    if (hasSubItems && isOpen) {
                      handleExpandToggle(item.id);
                    } else {
                      onItemSelect(item.id);
                    }
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: isOpen ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isOpen ? 3 : 'auto',
                      justifyContent: 'center',
                      color: `${theme.palette.text.primary}`
                    }}
                  >
                    <Icon />
                  </ListItemIcon>
                  {isOpen && (
                    <>
                      <ListItemText
                        primary={item.label}
                        slotProps={{
                          primary: {
                            fontSize: '0.875rem',
                            fontWeight: 500,
                          }
                        }}
                      />
                      {hasSubItems && (
                        itemExpanded ? <ExpandLess /> : <ExpandMore />
                      )}
                    </>
                  )}
                </ListItemButton>
              </ListItem>
            );

            if (!isOpen) {
              return (
                <Tooltip
                  key={item.id}
                  title={item.label}
                  placement="right"
                  arrow
                >
                  {mainListItem}
                </Tooltip>
              );
            }

            return (
              <Box key={item.id}>
                {mainListItem}
                {hasSubItems && isOpen && (
                  <Collapse in={itemExpanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems!.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSubSelected = selectedItem === subItem.id;

                        return (
                          <ListItem key={subItem.id} disablePadding>
                            <ListItemButton
                              selected={isSubSelected}
                              onClick={() => onItemSelect(subItem.id)}
                              sx={{
                                minHeight: 40,
                                pl: 4,
                                pr: 2.5,
                              }}
                            >
                                <ListItemIcon
                                sx={{
                                  minWidth: 0,
                                  mr: 3,
                                  justifyContent: 'center',
                                  color: `${theme.palette.text.primary}`,
                                  '& svg': {
                                  fontSize: '1rem', 
                                  },
                                }}
                                >
                                <SubIcon />
                                </ListItemIcon>
                              <ListItemText
                                primary={subItem.label}
                                sx={{
                                  '& .MuiListItemText-primary': {
                                    fontSize: '0.8125rem',
                                    fontWeight: 400,
                                    color: `${theme.palette.text.primary}`
                                  }
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </Box>
            );
          })}
        </List>
      </Box>

      {/* Footer */}
      {isOpen && (
        <Box className="p-4 border-t border-border">
          <Typography variant="body2" className="text-muted-foreground text-center">
            © 2024 Dashboard
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarWidth,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease-in-out',
          overflowX: 'hidden',
          backgroundColor: theme.palette.sidebar.default,
          color: theme.palette.text.primary,
        },
      }}
    >
      <SidebarContent />
    </Drawer>
  );
};

export default Sidebar;
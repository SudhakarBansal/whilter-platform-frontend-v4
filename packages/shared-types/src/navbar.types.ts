import type { Theme } from '@mui/material/styles';
import type { User } from './user';


 export interface NavbarProps {
  children: React.ReactNode;
  onMangeUsers?: (path: string) => void;
  user?: User;
  onNavigate?: (path: string) => void ;
}

 export interface ProfileMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  theme: Theme;
  onSettings?: (path: string) => void;
}

 export interface ProfileSectionProps {
  isOpen: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  theme: Theme;
  user?: User;
}

 export interface ProfileMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  theme: Theme;
  onMangeUsers?: (path: string) => void;
  user?: User;
  onNavigate?: (path: string) => void;
}



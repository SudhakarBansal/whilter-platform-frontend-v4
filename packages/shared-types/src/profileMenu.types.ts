import type { Theme } from '@mui/material/styles';
 export interface ProfileMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  theme: Theme;
  onSettings?: (path: string) => void;
}

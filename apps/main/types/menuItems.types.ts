// types/menu.ts
import type { SvgIconComponent } from "@mui/icons-material";
import { Role } from "@whilter/auth";

export type AppMenuItem = {
  icon: SvgIconComponent;
  label: string;
  href: string;
  allowedRoles?: Role[];
};

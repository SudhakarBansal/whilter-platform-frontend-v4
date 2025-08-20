
import { Role } from "@whilter/auth";
import type { AppMenuItem } from "@/types/menuItems.types";

export const filterMenuByRole = (items: AppMenuItem[], role?: Role) => {
  if (!role) return items.filter(i => !i.allowedRoles); 
  return items.filter(i => !i.allowedRoles || i.allowedRoles.includes(role));
};

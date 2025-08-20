
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import { Role } from "@whilter/auth";
import type { AppMenuItem } from "../../types/menuItems.types"

export const menuItems: AppMenuItem[] = [
  { icon: HomeIcon, label: "Home", href: "/platform" },         
  { icon: GroupIcon, label: "Users", href: "/user-management",
    allowedRoles: [Role.SUPER_ADMIN, Role.ADMIN] },                  
  { icon: ApartmentIcon, label: "Organization", href: "/organization",
    allowedRoles: [Role.SUPER_ADMIN] },                                
  { icon: PersonIcon, label: "My Profile", href: "/my-account" },     
];

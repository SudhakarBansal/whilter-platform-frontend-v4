import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";

export const menuItems = [
  {
    icon: HomeIcon,
    label: "Home",
    href: "/platform",
  },
  {
    icon: GroupIcon,
    label: "Users",
    href: "/user-management",
  },
  {
    icon: ApartmentIcon,
    label: "Organization",
    href: "/organization",
  },
  {
    icon: PersonIcon,
    label: "My Profile",
    href: "/my-account",
  },
];


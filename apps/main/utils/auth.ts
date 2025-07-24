
import { accessMatrix } from "@whilter/auth";
import { Role } from "@whilter/auth";

export const checkServiceAccess = (
  serviceId: string,
  role: string,
  section: string
): boolean => {

  const accessConfig = accessMatrix[serviceId as keyof typeof accessMatrix];
  if (!accessConfig) {
    return false;
  }

  const hasRole = accessConfig.roles.includes(role as Role);
  const hasSection = !accessConfig.sections || accessConfig.sections.includes(section);
  
  return hasRole && hasSection;
};

import { roleAccessMatrix } from '../../contants/accessMatrix';
import { Role } from '../../contants/role';
import type { Section } from '../../contants/role';


export const checkServiceAccess = (
  role: string,
  userSections: string[], 
  targetSection: string
): boolean => {

  if (!role || !Array.isArray(userSections) || !targetSection) return false;

  const roleTyped = role as Role;
  const sectionTyped = targetSection as Section;

  const allowedSections = roleAccessMatrix[roleTyped];
  if (!allowedSections) return false;

  return (
    allowedSections.includes(sectionTyped) &&
    userSections.includes(sectionTyped)
  );
};





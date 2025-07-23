import { Role } from '../config/roles/role';
import { ROLES_HIERARCHY } from '../config/roles/hierachy';
import { RouteAccessConfig } from '../types/route.type';
import { AppIdentifier } from '../types/route.type';

export function getAllInheritedRoles(role: Role): Set<Role> {
  const visited = new Set<Role>();
  const queue: Role[] = [role];

  while (queue.length) {
    const current = queue.shift()!;
    if (!visited.has(current)) {
      visited.add(current);
      const inherits = ROLES_HIERARCHY[current]?.inherits || [];
      queue.push(...inherits);
    }
  }
  return visited;
}

 export function checkAccess(params: {
  userRole: Role;
  userPermissions: string[];
  routeConfig: RouteAccessConfig;
}): boolean {
  const { userRole, userPermissions, routeConfig } = params;

  // Check if role is allowed
  if (routeConfig.allowedRoles && !routeConfig.allowedRoles.includes(userRole)) {
    return false;
  }

  // Check role hierarchy
  const roleHierarchy = ROLES_HIERARCHY[userRole];
  if (routeConfig.allowedRoles && !roleHierarchy.inherits.some(r => routeConfig.allowedRoles?.includes(r))) {
    return false;
  }

  // Check required permissions
  if (routeConfig.requiredPermissions) {
    const hasPermission = routeConfig.requiredPermissions.every(perm => 
      userPermissions.includes(perm) || 
      userPermissions.includes('*') || // SUPER_ADMIN has all permissions
      roleHierarchy.globalPermissions?.includes('*') ||
      roleHierarchy.globalPermissions?.some(p => p === perm) ||
      roleHierarchy.appSpecificPermissions?.[routeConfig.requiredApp as AppIdentifier]?.includes(perm)
    );

    if (!hasPermission) return false;
  }

  // Check required app access
  if (routeConfig.requiredApp && !roleHierarchy.accessibleApps.includes(routeConfig.requiredApp)) {
    return false;
  }

  return true;
}
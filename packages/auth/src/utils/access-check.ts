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

export function checkAccess({
  userRole,
  userPermissions,
  routeConfig,
}: {
  userRole: Role;
  userPermissions: string[];
  routeConfig: RouteAccessConfig;
}): boolean {
  const hierarchy = ROLES_HIERARCHY[userRole];

  // If role is super admin → allow all
  if (hierarchy?.globalPermissions?.includes('*')) return true;

  // Check inherited roles
  const userRoles = getAllInheritedRoles(userRole);

  if (
    routeConfig.allowedRoles &&
    !routeConfig.allowedRoles.some((r) => userRoles.has(r))
  ) {
    return false;
  }

  // App check
  if (
    routeConfig.requiredApp &&
    !hierarchy?.accessibleApps.includes(routeConfig.requiredApp)
  ) {
    return false;
  }

  // Permissions check
  const requiredPerms = routeConfig.requiredPermissions || [];
  const hasPermissions = requiredPerms.every((perm) =>
    userPermissions.includes(perm)
  );

  return hasPermissions;
}

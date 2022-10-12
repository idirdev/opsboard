export type Role = 'owner' | 'admin' | 'member' | 'viewer';

interface Permission {
  action: string;
  resource: string;
}

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  owner: [
    { action: '*', resource: '*' },
  ],
  admin: [
    { action: 'read', resource: '*' },
    { action: 'write', resource: 'projects' },
    { action: 'write', resource: 'team' },
    { action: 'read', resource: 'settings' },
    { action: 'write', resource: 'settings' },
  ],
  member: [
    { action: 'read', resource: '*' },
    { action: 'write', resource: 'projects' },
  ],
  viewer: [
    { action: 'read', resource: 'projects' },
    { action: 'read', resource: 'team' },
  ],
};

export function hasPermission(role: Role, action: string, resource: string): boolean {
  const perms = ROLE_PERMISSIONS[role] || [];
  return perms.some(
    (p) =>
      (p.action === '*' || p.action === action) &&
      (p.resource === '*' || p.resource === resource)
  );
}

export function getRolePermissions(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

export function isAtLeast(userRole: Role, requiredRole: Role): boolean {
  const hierarchy: Role[] = ['viewer', 'member', 'admin', 'owner'];
  return hierarchy.indexOf(userRole) >= hierarchy.indexOf(requiredRole);
}

export function canManageTeam(role: Role): boolean {
  return hasPermission(role, 'write', 'team');
}

export function canEditProject(role: Role): boolean {
  return hasPermission(role, 'write', 'projects');
}

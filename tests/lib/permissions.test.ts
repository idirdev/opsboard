import { describe, it, expect } from 'vitest';
import { hasPermission, isAtLeast, canManageTeam, canEditProject } from '../../src/lib/permissions';

describe('permissions', () => {
  it('owner has all permissions', () => {
    expect(hasPermission('owner', 'write', 'projects')).toBe(true);
    expect(hasPermission('owner', 'delete', 'anything')).toBe(true);
  });
  it('admin can write projects', () => {
    expect(hasPermission('admin', 'write', 'projects')).toBe(true);
  });
  it('viewer can only read', () => {
    expect(hasPermission('viewer', 'read', 'projects')).toBe(true);
    expect(hasPermission('viewer', 'write', 'projects')).toBe(false);
  });
  it('member can write projects but not team', () => {
    expect(hasPermission('member', 'write', 'projects')).toBe(true);
    expect(hasPermission('member', 'write', 'team')).toBe(false);
  });
  it('isAtLeast checks hierarchy', () => {
    expect(isAtLeast('admin', 'member')).toBe(true);
    expect(isAtLeast('viewer', 'admin')).toBe(false);
    expect(isAtLeast('owner', 'viewer')).toBe(true);
  });
  it('canManageTeam', () => {
    expect(canManageTeam('admin')).toBe(true);
    expect(canManageTeam('member')).toBe(false);
  });
  it('canEditProject', () => {
    expect(canEditProject('member')).toBe(true);
    expect(canEditProject('viewer')).toBe(false);
  });
});

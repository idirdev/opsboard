import { describe, it, expect } from 'vitest';
import { projectSchema, teamSchema, settingsSchema } from '../../src/lib/validators';

describe('validators', () => {
  describe('projectSchema', () => {
    it('validates valid project', () => {
      const result = projectSchema.safeParse({
        name: 'Test Project',
        status: 'active',
        priority: 'high',
      });
      expect(result.success).toBe(true);
    });
    it('rejects empty name', () => {
      const result = projectSchema.safeParse({ name: '', status: 'active' });
      expect(result.success).toBe(false);
    });
    it('rejects invalid status', () => {
      const result = projectSchema.safeParse({ name: 'Test', status: 'invalid' });
      expect(result.success).toBe(false);
    });
    it('accepts project without status (optional)', () => {
      const result = projectSchema.safeParse({ name: 'Test' });
      expect(result.success).toBe(true);
    });
  });

  describe('teamSchema', () => {
    it('validates valid team', () => {
      const result = teamSchema.safeParse({ name: 'Engineering' });
      expect(result.success).toBe(true);
    });
    it('defaults members to empty array', () => {
      const result = teamSchema.parse({ name: 'Team' });
      expect(result.members).toEqual([]);
    });
  });

  describe('settingsSchema', () => {
    it('validates full settings', () => {
      const result = settingsSchema.safeParse({
        notifications: { email: true, slack: false },
        display: { theme: 'dark', timezone: 'Europe/Paris', dateFormat: 'eu' },
      });
      expect(result.success).toBe(true);
    });
  });
});

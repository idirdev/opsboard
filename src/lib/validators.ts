import { z } from 'zod';

export const projectSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  status: z.enum(['active', 'archived', 'draft']),
  priority: z.enum(['low', 'medium', 'high', 'critical']).default('medium'),
  teamId: z.string().uuid().optional(),
  startDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
});

export const teamSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().max(200).optional(),
  members: z.array(z.string().uuid()).default([]),
});

export const settingsSchema = z.object({
  notifications: z.object({
    email: z.boolean().default(true),
    slack: z.boolean().default(false),
    webhookUrl: z.string().url().optional(),
  }),
  display: z.object({
    theme: z.enum(['light', 'dark', 'system']).default('system'),
    timezone: z.string().default('UTC'),
    dateFormat: z.enum(['iso', 'us', 'eu']).default('iso'),
  }),
});

export type Project = z.infer<typeof projectSchema>;
export type Team = z.infer<typeof teamSchema>;
export type Settings = z.infer<typeof settingsSchema>;

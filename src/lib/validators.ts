import { z } from 'zod';

// Re-export projectSchema from validations.ts (the canonical source)
export { projectSchema } from './validations';
export type { ProjectInput } from './validations';

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

export type Team = z.infer<typeof teamSchema>;
export type Settings = z.infer<typeof settingsSchema>;

import { z } from 'zod';

// Shared Zod schema for the waitlist form.  It is exported both here and
// consumed by the API under `api/waitlist.ts`.  You can extend this
// schema with additional fields (e.g. height, weight) as needed.
export const insertWaitlistSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('A valid email is required'),
  suburb: z.string().min(1, 'Suburb is required'),
  dietaryPreference: z.string().min(1, 'Please select a dietary preference'),
  heardFrom: z.string().min(1, 'Please let us know where you heard about us'),
  phone: z.string().optional()
});

export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
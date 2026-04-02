import { z } from 'zod';
import { insertContactMessageSchema } from './schema';

export const api = {
  contact: {
    create: {
      method: 'POST' as const,
      path: '/api/contact' as const,
      input: insertContactMessageSchema,
    },
  },
};

export type ContactMessageInput = z.infer<typeof insertContactMessageSchema>;

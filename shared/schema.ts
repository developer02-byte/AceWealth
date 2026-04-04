import { z } from "zod";

// ── Contact Messages ──────────────────────────────────────────────────────────
export const insertContactMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string(),
  message: z.string().min(1, "Message is required"),
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

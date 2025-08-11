import { z } from "zod";

// Contact schema for validation
export const contactSchema = z.object({
  id: z.number(),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  createdAt: z.date(),
});

export const insertContactSchema = contactSchema.omit({
  id: true,
  createdAt: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = z.infer<typeof contactSchema>;

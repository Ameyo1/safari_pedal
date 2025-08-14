import { z } from 'zod';

export const BookingSchema = z.object({
  tourId: z.string().uuid(), // or use a regex if it's a custom format
  email: z.string().email(),
  phone: z.string().optional(),
  travelers: z.number().int().min(1),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid start date"
  }),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid end date"
  }),
  notes: z.string().optional(),
  status: z.enum(["pending", "confirmed", "cancelled"]).default("pending"),
  userId: z.string().optional()
});

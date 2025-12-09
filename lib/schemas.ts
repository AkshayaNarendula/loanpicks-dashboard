// lib/schemas.ts
import { z } from "zod";

export const askSchema = z.object({
  productId: z.string().uuid(),
  message: z.string().min(1),
  history: z
    .array(
      z.object({
        role: z.string(),
        content: z.string(),
        created_at: z.string().optional(),
      })
    )
    .optional()
    .default([]),
});

export type AskSchema = z.infer<typeof askSchema>;

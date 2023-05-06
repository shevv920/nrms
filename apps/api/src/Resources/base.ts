import z from "zod";

export const baseResourceZodSchema = z.object({
  id: z.string(),

  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type BaseResourceType = z.infer<typeof baseResourceZodSchema>;

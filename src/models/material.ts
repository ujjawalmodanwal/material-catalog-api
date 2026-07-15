import { z } from 'zod';

export const MaterialSchema = z.object({
  id: z.string(),
  name: z.string(),
  formula: z.string(),
  properties: z.object({
    molecularWeight: z.number().optional(),
    isConductive: z.boolean().optional(),
  }),
});

export type Material = z.infer<typeof MaterialSchema>;


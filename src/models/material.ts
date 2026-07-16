import { z } from 'zod';

export const PropertySchema = z.object({
  molecularWeight: z.number().optional(),
  isConductive: z.boolean().optional(),
});

export const MaterialSchema = z.object({
  id: z.string(),
  name: z.string(),
  formula: z.string(),
  properties: PropertySchema,
});

export const CreateMaterialSchema = MaterialSchema.omit({ id: true });

export type Property = z.infer<typeof PropertySchema>;
export type Material = z.infer<typeof MaterialSchema>;
export type CreateMaterial = z.infer<typeof CreateMaterialSchema>;


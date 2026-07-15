import { Material } from '../models/material.js';

// Temporary in-memory storage for demonstration purposes.
// Replace with database implementation later.
const materials: Material[] = [];

export const materialRepository = {
  findAll: async (): Promise<Material[]> => {
    return materials;
  },

  findById: async (id: string): Promise<Material | undefined> => {
    return materials.find((m) => m.id === id);
  },

  create: async (material: Material): Promise<Material> => {
    materials.push(material);
    return material;
  },

  update: async (id: string, material: Material): Promise<Material | undefined> => {
    const index = materials.findIndex((m) => m.id === id);
    if (index === -1) return undefined;
    materials[index] = material;
    return material;
  },

  delete: async (id: string): Promise<boolean> => {
    const index = materials.findIndex((m) => m.id === id);
    if (index === -1) return false;
    materials.splice(index, 1);
    return true;
  },
};

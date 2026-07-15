import { Material } from '../models/material.js';
import { materialRepository } from '../repositories/materialRepository.js';

export const materialService = {
  getAllMaterials: async (): Promise<Material[]> => {
    return await materialRepository.findAll();
  },

  getMaterialById: async (id: string): Promise<Material | undefined> => {
    return await materialRepository.findById(id);
  },

  createMaterial: async (material: Material): Promise<Material> => {
    // TODO: add validation logic, e.g., uniqueness checks
    return materialRepository.create(material);

  },

  updateMaterial: async (id: string, material: Material): Promise<Material | undefined> => {
    return await materialRepository.update(id, material);
  },

  deleteMaterial: async (id: string): Promise<boolean> => {
    return await materialRepository.delete(id);
  },
};

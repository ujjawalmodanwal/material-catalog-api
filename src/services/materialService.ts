import { Material, CreateMaterial } from '../models/material.js';
import { materialRepository } from '../repositories/materialRepository.js';
import { randomUUID } from 'crypto';

export const materialService = {
  getAllMaterials: async (): Promise<Material[]> => {
    return await materialRepository.findAll();
  },

  getMaterialById: async (id: string): Promise<Material | undefined> => {
    return await materialRepository.findById(id);
  },

  createMaterial: async (data: CreateMaterial): Promise<Material> => {
    const material: Material = {
      ...data,
      id: randomUUID(),
    };
    return materialRepository.create(material);
  },

  updateMaterial: async (id: string, material: Material): Promise<Material | undefined> => {
    return await materialRepository.update(id, material);
  },

  deleteMaterial: async (id: string): Promise<boolean> => {
    return await materialRepository.delete(id);
  },
};

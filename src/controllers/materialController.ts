import { Request, Response } from 'express';
import { materialService } from '../services/materialService.js';
import { MaterialSchema, CreateMaterialSchema } from '../models/material.js';

export const materialController = {
  create: async (req: Request, res: Response) => {
    try {
      const validatedData = CreateMaterialSchema.parse(req.body);
      const newMaterial = await materialService.createMaterial(validatedData);
      res.status(201).json(newMaterial);
    } catch (error) {
      if (error instanceof Error && 'issues' in error) {
        console.error('Validation error details:', (error as any).issues);
        res.status(400).json({ error: 'Invalid data', details: (error as any).issues });
      } else {
        console.error('Validation error:', error);
        res.status(400).json({ error: 'Invalid data' });
      }
    }
  },

  getAll: async (_req: Request, res: Response) => {
    const materials = await materialService.getAllMaterials();
    res.json(materials);
  },

  getById: async (req: Request, res: Response) => {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id[0];
    const material = await materialService.getMaterialById(id);
    if (!material) {
      res.status(404).json({ error: 'Material not found' });
    } else {
      res.json(material);
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const validatedData = MaterialSchema.parse(req.body);
      const id = typeof req.params.id === 'string' ? req.params.id : req.params.id[0];
      const updatedMaterial = await materialService.updateMaterial(id, validatedData);
      if (!updatedMaterial) {
        res.status(404).json({ error: 'Material not found' });
      } else {
        res.json(updatedMaterial);
      }
    } catch (error) {
      res.status(400).json({ error: 'Invalid data' });
    }
  },

  delete: async (req: Request, res: Response) => {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id[0];
    const success = await materialService.deleteMaterial(id);
    if (!success) {
      res.status(404).json({ error: 'Material not found' });
    } else {
      res.status(204).send();
    }
  },
};

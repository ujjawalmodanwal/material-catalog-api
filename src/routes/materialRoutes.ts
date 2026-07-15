import { Router } from 'express';
import { materialController } from '../controllers/materialController.js';
import { authenticate } from '../middleware/authenticate.js';

export const materialRoutes = Router();

// Public routes
materialRoutes.get('/', materialController.getAll);
materialRoutes.get('/:id', materialController.getById);

// Protected routes
materialRoutes.post('/', authenticate, materialController.create);
materialRoutes.put('/:id', authenticate, materialController.update);
materialRoutes.delete('/:id', authenticate, materialController.delete);

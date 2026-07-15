import { Router } from 'express';
import { materialController } from '../controllers/materialController.js';
import { authenticate } from '../middleware/authenticate.js';

export const materialRoutes = Router();

// Public routes
/**
 * @openapi
 * /api/materials:
 *   get:
 *     summary: Retrieve a list of materials
 *     responses:
 *       200:
 *         description: A list of materials
 */
materialRoutes.get('/', materialController.getAll);

/**
 * @openapi
 * /api/materials/{id}:
 *   get:
 *     summary: Retrieve a material by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Material details
 *       404:
 *         description: Material not found
 */
materialRoutes.get('/:id', materialController.getById);

// Protected routes
/**
 * @openapi
 * /api/materials:
 *   post:
 *     summary: Create a new material
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Material created
 */
materialRoutes.post('/', authenticate, materialController.create);

/**
 * @openapi
 * /api/materials/{id}:
 *   put:
 *     summary: Update an existing material
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Material updated
 */
materialRoutes.put('/:id', authenticate, materialController.update);

/**
 * @openapi
 * /api/materials/{id}:
 *   delete:
 *     summary: Delete a material
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Material deleted
 */
materialRoutes.delete('/:id', authenticate, materialController.delete);

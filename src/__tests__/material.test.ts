import request from 'supertest';
import express from 'express';
import { materialRoutes } from '../routes/materialRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/materials', materialRoutes);

describe('Material API', () => {
  const newMaterial = {
    id: 'mat_001',
    name: 'Graphene',
    formula: 'C',
    properties: {
      molecularWeight: 12.011,
      isConductive: true,
    },
  };

  const validHeaders = { 'x-api-key': 'secret-key-123' };

  it('should create a new material', async () => {
    const res = await request(app)
      .post('/api/materials')
      .set(validHeaders)
      .send(newMaterial);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(newMaterial);
  });

  it('should get all materials', async () => {
    const res = await request(app).get('/api/materials');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a material by id', async () => {
    const res = await request(app).get('/api/materials/mat_001');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe('mat_001');
  });

  it('should return 404 for non-existent material', async () => {
    const res = await request(app).get('/api/materials/invalid');
    expect(res.status).toBe(404);
  });
});

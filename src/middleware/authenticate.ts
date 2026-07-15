import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';

const VALID_API_KEY = process.env.API_KEY;

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.header('x-api-key');
  const tenantId = req.header('x-tenant-id');

  if (!VALID_API_KEY || (apiKey !== VALID_API_KEY && !tenantId)) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid API key/Tenant ID' });
  }

  next();
};

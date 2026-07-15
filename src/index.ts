import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { materialRoutes } from './routes/materialRoutes.js';
import { swaggerSpec } from './swagger.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/materials', materialRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

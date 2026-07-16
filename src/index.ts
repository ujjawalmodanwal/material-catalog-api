import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { materialRoutes } from './routes/materialRoutes.js';
import { swaggerSpec } from './swagger.js';
import { driver } from './config/neo4j.js';

const app = express();
const PORT = 3000;

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

app.use('/api/materials', materialRoutes);

async function startServer() {
  try {
    await driver.verifyConnectivity();
    console.log('Connected to Neo4j successfully');
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Neo4j not ready, retrying in 5 seconds...', err);
    setTimeout(startServer, 5000); // Retry after 5 seconds
  }
}

startServer();


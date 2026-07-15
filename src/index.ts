import express from 'express';
import { materialRoutes } from './routes/materialRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/materials', materialRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

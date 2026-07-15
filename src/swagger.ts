import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Material Catalog API',
      version: '1.0.0',
      description: 'API for managing a material catalog',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://material-catalog-api-backend.onrender.com',
        description: 'Production server',
      },
    ],
  },
  // Look for annotations in our route files
  apis: ['./src/routes/*.ts', './dist/routes/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);

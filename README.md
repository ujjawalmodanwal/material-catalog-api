# Material Catalog API

A simple REST API for managing material data, built with TypeScript, Express, and Zod for validation.

**Live Demo:** You can test the API at [https://material-catalog-api-backend.onrender.com](https://material-catalog-api-backend.onrender.com/api-docs)

PS: This is free tier deployment. Instance will spin down with inactivity, which can delay requests by 50 seconds or more.

## Tech Stack
*   TypeScript
*   Node.js & Express
*   Zod (Schema validation)
*   Jest & Supertest (Testing)
*   Pino (Logging)

## Development

### Setup
1. Clone the repo:
   ```bash
   git clone https://github.com/ujjawalmodanwal/material-catalog-api
   cd material-catalog-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Scripts
*   `npm run dev`: Start with hot-reload (nodemon)
*   `npm run build`: Compile TypeScript to JavaScript
*   `npm start`: Run the compiled production build
*   `npm test`: Execute test suite

## API Usage
Endpoints are served under `/api/materials`.

### Example
```bash
curl -X GET http://localhost:3000/api/materials
```

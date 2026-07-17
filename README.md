# Material Catalog API

A simple REST API for managing material data, built with TypeScript, Express, and Zod for validation.

**Try Live Demo:** You can test the API at [https://material-catalog-api-backend.onrender.com/api-docs](https://material-catalog-api-backend.onrender.com/api-docs)

**Frontend:** Swagger UI

**Database**: Free instance Neo4j service

PS: This is free tier deployment. Instance will spin down with inactivity, which can delay requests by 50 seconds or more.

## Tech Stack
*   TypeScript
*   Node.js & Express
*   Zod (Schema validation)
*   Jest & Supertest (Testing)

## Docker Containerization
This project includes a `Dockerfile` and `docker-compose.yml` for seamless containerized development.

- **To run the full stack (API + Neo4j):**
  ```bash
  docker-compose up
  ```
- **Neo4j Access:**
  - Browser UI: `http://localhost:7474`
  - Bolt Protocol: `bolt://localhost:7687`

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
curl -X GET https://material-catalog-api-backend.onrender.com/api/materials
```
## Data Model Architecture
This API leverages **Neo4j**, a native graph database, to store material data. Instead of storing complex data as flat strings or JSON blobs, the model is designed to take full advantage of graph traversal and indexing.

### The Graph Model
The model separates the **Core Entity** (`:Material`) from its **Relational Attributes** (`:Property`). This allows for high-performance querying of specific material properties across the entire dataset graph LR
M[:Material] -- "HAS_PROPERTIES" --> P[:Property]

#### Entity Definitions
| Node | Responsibilities | Key Properties |
| :--- | :--- | :--- |
| **`:Material`** | Represents the core entity | `id` (UUID), `name`, `formula` |
| **`:Property`** | Represents modular material attributes | `molecularWeight`, `isConductive` |

### Architectural Benefits

**Native Graph Traversal:** By separating properties into linked nodes, the model enables blazing-fast graph traversals. Finding all materials that share a specific property attribute does not require scanning the entire database.

**Scalability:** The schema is highly extensible. Adding new entity types—such as `:Supplier`, `:SafetyData`, or `:ManufacturingProcess`—requires only defining new nodes and relationships, avoiding the need to alter or bloat the core `:Material` node.

**Indexing & Performance:** Promoting attributes like `isConductive` to direct properties on `:Property` nodes allows for native indexing in Neo4j, enabling efficient filtering and analytical queries that are impossible in document-based storage models.



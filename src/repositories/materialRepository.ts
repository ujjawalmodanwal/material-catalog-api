import { Material } from '../models/material.js';
import { driver } from '../config/neo4j.js';

export const materialRepository = {
  findAll: async (): Promise<Material[]> => {
    const session = driver.session();
    try {
      const result = await session.run('MATCH (m:Material)-[:HAS_PROPERTIES]->(p:Property) RETURN m, p');
      return result.records.map(record => {
        const m = record.get('m').properties;
        const p = record.get('p').properties;
        return {
          ...m,
          properties: {
            molecularWeight: p.molecularWeight,
            isConductive: p.isConductive
          }
        } as Material;
      });
    } finally {
      await session.close();
    }
  },

  findById: async (id: string): Promise<Material | undefined> => {
    const session = driver.session();
    try {
      const result = await session.run('MATCH (m:Material {id: $id})-[:HAS_PROPERTIES]->(p:Property) RETURN m, p', { id });
      if (result.records.length === 0) return undefined;
      const m = result.records[0].get('m').properties;
      const p = result.records[0].get('p').properties;
      return {
        ...m,
        properties: {
          molecularWeight: p.molecularWeight,
          isConductive: p.isConductive
        }
      } as Material;
    } finally {
      await session.close();
    }
  },

  create: async (material: Material): Promise<Material> => {
    const session = driver.session();
    try {
      await session.run(
        `CREATE (m:Material {id: $id, name: $name, formula: $formula})
         CREATE (p:Property {molecularWeight: $mw, isConductive: $ic})
         CREATE (m)-[:HAS_PROPERTIES]->(p)`,
        {
          id: material.id,
          name: material.name,
          formula: material.formula,
          mw: material.properties.molecularWeight,
          ic: material.properties.isConductive
        }
      );
      return material;
    } finally {
      await session.close();
    }
  },

  update: async (id: string, material: Material): Promise<Material | undefined> => {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (m:Material {id: $id})-[:HAS_PROPERTIES]->(p:Property)
         SET m.name = $name, m.formula = $formula, p.molecularWeight = $mw, p.isConductive = $ic
         RETURN m, p`,
        { 
            id, 
            name: material.name, 
            formula: material.formula, 
            mw: material.properties.molecularWeight, 
            ic: material.properties.isConductive 
        }
      );
      if (result.records.length === 0) return undefined;
      const m = result.records[0].get('m').properties;
      const p = result.records[0].get('p').properties;
      return {
        ...m,
        properties: {
          molecularWeight: p.molecularWeight,
          isConductive: p.isConductive
        }
      } as Material;
    } finally {
      await session.close();
    }
  },

  delete: async (id: string): Promise<boolean> => {
    const session = driver.session();
    try {
      const result = await session.run(
          `MATCH (m:Material {id: $id}) 
           OPTIONAL MATCH (m)-[r:HAS_PROPERTIES]->(p:Property) 
           DELETE r, p, m 
           RETURN count(m) as deleted`, 
          { id }
      );
      return result.records[0].get('deleted').toNumber() > 0;
    } finally {
      await session.close();
    }
  },
};

import { Material } from '../models/material.js';
import { driver } from '../config/neo4j.js';

export const materialRepository = {
  findAll: async (): Promise<Material[]> => {
    const session = driver.session();
    try {
      const result = await session.run('MATCH (m:Material) RETURN m');
      return result.records.map(record => {
        const node = record.get('m');
        return {
          ...node.properties,
          properties: JSON.parse(node.properties.properties)
        } as Material;
      });
    } finally {
      await session.close();
    }
  },

  findById: async (id: string): Promise<Material | undefined> => {
    const session = driver.session();
    try {
      const result = await session.run('MATCH (m:Material {id: $id}) RETURN m', { id });
      if (result.records.length === 0) return undefined;
      const node = result.records[0].get('m');
      return {
        ...node.properties,
        properties: JSON.parse(node.properties.properties)
      } as Material;
    } finally {
      await session.close();
    }
  },


  create: async (material: Material): Promise<Material> => {
    const session = driver.session();
    try {
      await session.run('CREATE (m:Material {id: $id, name: $name, formula: $formula, properties: $properties})', {
        id: material.id,
        name: material.name,
        formula: material.formula,
        properties: JSON.stringify(material.properties)
      });
      return material;
    } finally {
      await session.close();
    }
  },

  update: async (id: string, material: Material): Promise<Material | undefined> => {
    const session = driver.session();
    try {
      const result = await session.run(
        'MATCH (m:Material {id: $id}) SET m.name = $name, m.formula = $formula, m.properties = $properties RETURN m',
        { id, name: material.name, formula: material.formula, properties: JSON.stringify(material.properties) }
      );
      if (result.records.length === 0) return undefined;
      const node = result.records[0].get('m');
      return {
        ...node.properties,
        properties: JSON.parse(node.properties.properties)
      } as Material;
    } finally {
      await session.close();
    }
  },

  delete: async (id: string): Promise<boolean> => {
    const session = driver.session();
    try {
      const result = await session.run('MATCH (m:Material {id: $id}) DETACH DELETE m RETURN count(m) as deleted', { id });
      return result.records[0].get('deleted').toNumber() > 0;
    } finally {
      await session.close();
    }
  },
};

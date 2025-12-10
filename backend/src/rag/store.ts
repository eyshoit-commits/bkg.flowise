import { Pool } from 'pg';
import { config } from '../config/env.js';
import { Chunk } from './chunker.js';
import { embedChunks } from './vector.js';

const pool = new Pool({ connectionString: config.databaseUrl });

export type StoredVector = { id: string; content: string; source: string; vector: number[]; score?: number };

export async function ensureSchema(schema = config.vectorSchema) {
  await pool.query(`CREATE SCHEMA IF NOT EXISTS ${schema};`);
  await pool.query(`CREATE EXTENSION IF NOT EXISTS vector;`);
  await pool.query(`CREATE TABLE IF NOT EXISTS ${schema}.embeddings (
    id text PRIMARY KEY,
    content text NOT NULL,
    source text NOT NULL,
    embedding vector(1536)
  );`);
}

export async function indexChunks(chunks: Chunk[]) {
  await ensureSchema();
  const embedded = await embedChunks(chunks);
  for (const item of embedded) {
    const vector = `[${item.vector.slice(0, 1536).join(',')}]`;
    await pool.query(
      `INSERT INTO ${config.vectorSchema}.embeddings (id, content, source, embedding)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content, source = EXCLUDED.source, embedding = EXCLUDED.embedding`,
      [item.chunk.id, item.chunk.content, item.chunk.source, vector]
    );
  }
}

export async function searchSimilar(query: string, limit = 5): Promise<StoredVector[]> {
  await ensureSchema();
  const vector = await embedChunks([{ id: 'query', content: query, source: 'query', order: 0 }]);
  const embedding = `[${vector[0].vector.slice(0, 1536).join(',')}]`;
  const { rows } = await pool.query(
    `SELECT id, content, source, embedding <#> $1::vector AS score
     FROM ${config.vectorSchema}.embeddings
     ORDER BY embedding <#> $1::vector
     LIMIT $2`,
    [embedding, limit]
  );
  return rows.map((row) => ({ id: row.id, content: row.content, source: row.source, vector: [], score: Number(row.score) }));
}

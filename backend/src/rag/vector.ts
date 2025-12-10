import { llmClient } from '../services/LLMClient.js';
import { Chunk } from './chunker.js';

export async function embedChunks(chunks: Chunk[]): Promise<{ chunk: Chunk; vector: number[] }[]> {
  const results = [] as { chunk: Chunk; vector: number[] }[];
  for (const chunk of chunks) {
    const vector = await llmClient.embedding(chunk.content);
    results.push({ chunk, vector });
  }
  return results;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  const minLength = Math.min(a.length, b.length);
  const dot = a.slice(0, minLength).reduce((acc, value, idx) => acc + value * b[idx], 0);
  const normA = Math.sqrt(a.slice(0, minLength).reduce((acc, value) => acc + value * value, 0));
  const normB = Math.sqrt(b.slice(0, minLength).reduce((acc, value) => acc + value * value, 0));
  return dot / Math.max(normA * normB, 1e-8);
}

import { createLLMClient } from '../services/LLMClient.js';

export async function embedText(provider: 'lmstudio' | 'llamaedge' | 'ollama', model: string, text: string): Promise<number[]> {
  const client = createLLMClient(provider);
  return client.embed(model, text);
}

export function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, value, i) => sum + value * (b[i] ?? 0), 0);
  const normA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
  const normB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0));
  if (normA === 0 || normB === 0) return 0;
  return dot / (normA * normB);
}

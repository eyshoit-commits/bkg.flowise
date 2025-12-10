import { embedText } from './vector.js';
import { searchSimilar } from './store.js';

export async function retrieveContext(projectId: string, query: string, provider: 'lmstudio' | 'llamaedge' | 'ollama', model: string) {
  const queryEmbedding = await embedText(provider, model, query);
  const matches = await searchSimilar(projectId, queryEmbedding, 5);
  return { embedding: queryEmbedding, matches };
}

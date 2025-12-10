import { searchSimilar, StoredVector } from './store.js';

export async function retrieveRelevant(query: string): Promise<StoredVector[]> {
  const matches = await searchSimilar(query, 7);
  return matches.sort((a, b) => (a.score ?? 0) - (b.score ?? 0));
}

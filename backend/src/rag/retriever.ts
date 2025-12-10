import { llmClient } from '../services/LLMClient'
import { searchVectors } from './store'

export interface RetrievalResult {
  content: string
  similarity: number
  metadata: Record<string, unknown>
}

export const retrieveContext = async (query: string, limit = 5): Promise<RetrievalResult[]> => {
  const [embedding] = await llmClient.embed([query])
  const matches = await searchVectors(embedding, limit)
  return matches.map((match) => ({ content: match.content, similarity: (match as any).similarity, metadata: match.metadata }))
}

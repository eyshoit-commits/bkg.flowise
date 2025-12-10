import { indexFile, indexDirectory } from '../rag/indexer'
import { retrieveContext } from '../rag/retriever'
import { llmClient } from './LLMClient'

export class RAGService {
  async indexPath(targetPath: string): Promise<{ filesIndexed: number }> {
    await indexDirectory(targetPath)
    return { filesIndexed: 1 }
  }

  async query(question: string): Promise<{ answer: string, context: string[] }> {
    const context = await retrieveContext(question, 6)
    const contextText = context.map((c) => c.content).join('\n')
    const prompt = [
      { role: 'system', content: 'You are a precise assistant that cites context.' },
      { role: 'user', content: `${question}\nContext:\n${contextText}` }
    ] as const
    const completion = await llmClient.chat(prompt as any)
    return { answer: completion.content, context: context.map((c) => c.content) }
  }
}

export const ragService = new RAGService()

import { embedText } from '../rag/vector.js';
import { chunkMarkdown, chunkText, chunkCode } from '../rag/chunker.js';
import { saveEmbedding, recordQuery } from '../rag/store.js';
import { retrieveContext } from '../rag/retriever.js';
import { createLLMClient } from './LLMClient.js';

export type IndexRequest = {
  projectId: string;
  provider: 'lmstudio' | 'llamaedge' | 'ollama';
  model: string;
  mime: 'markdown' | 'code' | 'text';
  title: string;
  content: string;
};

export class RAGService {
  async indexDocument(input: IndexRequest): Promise<void> {
    const chunker = input.mime === 'markdown' ? chunkMarkdown : input.mime === 'code' ? chunkCode : chunkText;
    const chunks = chunker(input.content);
    for (const chunk of chunks) {
      const embedding = await embedText(input.provider, input.model, chunk.content);
      await saveEmbedding(input.projectId, input.title, chunk.content, embedding, {
        source: input.title,
        chunkSize: chunk.content.length,
        overlap: 120,
        model: input.model,
        encoder: input.provider
      });
    }
  }

  async query(projectId: string, query: string, provider: 'lmstudio' | 'llamaedge' | 'ollama', model: string): Promise<{ answer: string; context: string[] }> {
    const { matches } = await retrieveContext(projectId, query, provider, model);
    const prompt = `You are the Forge Retrieval Agent. Answer the question with the supplied knowledge. If unsure, say you lack context.\n\nContext:\n${matches.map((m) => `- ${m.content}`).join('\n')}\n\nQuestion: ${query}`;
    const client = createLLMClient(provider);
    const answer = await client.chat(model, [{ role: 'user', content: prompt }]);
    await recordQuery(projectId, query, answer, matches[0]?.score ?? 0, matches[0]?.id);
    return { answer, context: matches.map((m) => m.content) };
  }
}

export const ragService = new RAGService();

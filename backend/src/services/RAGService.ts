import { chunkText } from '../rag/chunker.js';
import { indexChunks, searchSimilar } from '../rag/store.js';

export class RAGService {
  async ingest(source: string, content: string) {
    const chunks = chunkText(source, content);
    await indexChunks(chunks);
    return { ingested: chunks.length };
  }

  async query(question: string) {
    const results = await searchSimilar(question, 6);
    return { results };
  }
}

export const ragService = new RAGService();

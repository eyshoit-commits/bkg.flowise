import fs from 'fs';
import { createLLMClient } from '../services/LLMClient.js';

export class DBAgent {
  constructor(private readonly provider: 'lmstudio' | 'llamaedge' | 'ollama', private readonly model: string) {}

  async proposeSchema(requirements: string): Promise<string> {
    const client = createLLMClient(this.provider);
    try {
      const schema = await client.chat(this.model, [
        { role: 'system', content: 'Design PostgreSQL schemas with Prisma syntax including pgvector columns.' },
        { role: 'user', content: `Translate requirements into Prisma schema blocks.\n${requirements}` }
      ]);
      return schema;
    } catch (error) {
      return '// DBAgent fallback schema\nmodel Example { id String @id }';
    }
  }

  async writeSchema(filePath: string, schemaContent: string): Promise<void> {
    await fs.promises.writeFile(filePath, schemaContent, 'utf-8');
  }
}

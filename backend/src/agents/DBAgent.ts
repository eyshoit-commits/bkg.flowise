import { LLMClient } from '../services/LLMClient.js';

export class DBAgent {
  constructor(private llm: LLMClient) {}

  async design(domain: string) {
    const prompt = [
      { role: 'system', content: 'Erzeuge Prisma-Schema für Postgres mit pgvector Tabellen.' },
      { role: 'user', content: domain }
    ];
    const schema = await this.llm.chat(prompt as any);
    return { schema };
  }
}

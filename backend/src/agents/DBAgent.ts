import { llmClient } from '../services/LLMClient'
import fs from 'fs'

export class DBAgent {
  async proposeSchema(requirements: string): Promise<string> {
    const prompt = [
      { role: 'system', content: 'Design a Prisma schema using PostgreSQL + pgvector. Include models and relations.' },
      { role: 'user', content: requirements }
    ]
    const completion = await llmClient.chat(prompt as any)
    return completion.content
  }

  persistSchema(schema: string, target = 'backend/src/prisma/schema.prisma'): void {
    fs.writeFileSync(target, schema, 'utf-8')
  }
}

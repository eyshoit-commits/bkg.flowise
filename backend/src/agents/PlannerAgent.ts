import { llmClient } from '../services/LLMClient'

export class PlannerAgent {
  async plan(idea: string): Promise<string[]> {
    const prompt = [
      { role: 'system', content: 'Create a concise step list to build the requested software. Keep steps actionable and ordered.' },
      { role: 'user', content: idea }
    ]
    const result = await llmClient.chat(prompt as any)
    return result.content
      .split(/\n|-/)
      .map((line) => line.trim())
      .filter(Boolean)
  }
}

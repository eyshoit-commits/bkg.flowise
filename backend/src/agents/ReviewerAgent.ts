import fs from 'fs'
import { llmClient } from '../services/LLMClient'

export class ReviewerAgent {
  async reviewFile(filePath: string): Promise<string> {
    const content = fs.readFileSync(filePath, 'utf-8')
    const prompt = [
      { role: 'system', content: 'Review the code for quality, security, and clarity. Respond with prioritized bullet points.' },
      { role: 'user', content: content }
    ]
    const completion = await llmClient.chat(prompt as any)
    return completion.content
  }
}

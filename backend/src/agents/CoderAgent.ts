import fs from 'fs'
import path from 'path'
import { llmClient } from '../services/LLMClient'

export class CoderAgent {
  async generateFile(targetPath: string, instruction: string): Promise<string> {
    const dir = path.dirname(targetPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    const prompt = [
      { role: 'system', content: 'Write the full file content. Use concise, production-grade code.' },
      { role: 'user', content: instruction }
    ]
    const completion = await llmClient.chat(prompt as any)
    fs.writeFileSync(targetPath, completion.content, 'utf-8')
    return completion.content
  }
}

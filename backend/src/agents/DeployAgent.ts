import fs from 'fs'
import { llmClient } from '../services/LLMClient'

export class DeployAgent {
  async generateCompose(serviceDescription: string, outputPath: string): Promise<string> {
    const prompt = [
      { role: 'system', content: 'Generate a secure docker-compose YAML. Use non-standard ports and include restart policies.' },
      { role: 'user', content: serviceDescription }
    ]
    const completion = await llmClient.chat(prompt as any)
    fs.writeFileSync(outputPath, completion.content, 'utf-8')
    return completion.content
  }
}

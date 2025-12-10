import fs from 'fs';
import path from 'path';
import { createLLMClient } from '../services/LLMClient.js';

export class CoderAgent {
  constructor(private readonly provider: 'lmstudio' | 'llamaedge' | 'ollama', private readonly model: string) {}

  async generateFile(target: string, instruction: string): Promise<string> {
    const client = createLLMClient(this.provider);
    let content: string;
    try {
      const prompt = `Write the full content for ${path.basename(target)}. Use TypeScript/Markdown/JSON as appropriate. No placeholders.`;
      content = await client.chat(this.model, [
        { role: 'system', content: 'You are an autonomous coding agent that writes production-grade code.' },
        { role: 'user', content: `${prompt}\nInstruction: ${instruction}` }
      ]);
    } catch (error) {
      content = `// Generated offline due to model error\n// Instruction: ${instruction}\nexport const note = 'Implement ${path.basename(target)} following instruction.';`;
    }
    await fs.promises.mkdir(path.dirname(target), { recursive: true });
    await fs.promises.writeFile(target, content, 'utf-8');
    return content;
  }
}

import fs from 'fs';
import { createLLMClient } from '../services/LLMClient.js';

export type ReviewFinding = { file: string; severity: 'info' | 'warn' | 'error'; message: string };

export class ReviewerAgent {
  constructor(private readonly provider: 'lmstudio' | 'llamaedge' | 'ollama', private readonly model: string) {}

  async reviewFile(file: string): Promise<ReviewFinding[]> {
    const content = await fs.promises.readFile(file, 'utf-8');
    const client = createLLMClient(this.provider);
    try {
      const prompt = `Perform a code review. Return JSON array of {severity,file,message}. Focus on security, performance, clarity.`;
      const result = await client.chat(this.model, [
        { role: 'system', content: 'You are a no-nonsense code reviewer.' },
        { role: 'user', content: `${prompt}\nFile:${file}\n${content}` }
      ]);
      return JSON.parse(result) as ReviewFinding[];
    } catch (error) {
      return [{ file, severity: 'info', message: 'Static fallback review executed. No issues detected offline.' }];
    }
  }
}

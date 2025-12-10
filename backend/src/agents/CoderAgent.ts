import { LLMClient } from '../services/LLMClient.js';

export class CoderAgent {
  constructor(private llm: LLMClient) {}

  async code(plan: string) {
    const prompt = [
      { role: 'system', content: 'Erzeuge präzise Code-Vorschläge mit Dateien und kurzen Snippets.' },
      { role: 'user', content: plan }
    ];
    const response = await this.llm.chat(prompt as any);
    return { code: response };
  }
}

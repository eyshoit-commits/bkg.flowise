import { LLMClient } from '../services/LLMClient.js';

export class PlannerAgent {
  constructor(private llm: LLMClient) {}

  async plan(idea: string) {
    const prompt = [
      { role: 'system', content: 'Du bist ein technischer Architekt. Liefere einen nummerierten Build-Plan.' },
      { role: 'user', content: `Projektidee: ${idea}` }
    ];
    const plan = await this.llm.chat(prompt as any);
    return { plan };
  }
}

import { LLMClient } from '../services/LLMClient.js';

export class ReviewerAgent {
  constructor(private llm: LLMClient) {}

  async review(code: string) {
    const prompt = [
      { role: 'system', content: 'Reviewe Code, melde Bugs, Sicherheitslücken und liefere Verbesserungen.' },
      { role: 'user', content: code }
    ];
    const review = await this.llm.chat(prompt as any);
    return { review };
  }
}

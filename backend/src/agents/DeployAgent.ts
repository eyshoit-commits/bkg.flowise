import { LLMClient } from '../services/LLMClient.js';

export class DeployAgent {
  constructor(private llm: LLMClient) {}

  async prepare(plan: string) {
    const prompt = [
      { role: 'system', content: 'Erzeuge einen Deployment-Plan mit Docker, Compose und CI-Schritten.' },
      { role: 'user', content: plan }
    ];
    const deployment = await this.llm.chat(prompt as any);
    return { deployment };
  }
}

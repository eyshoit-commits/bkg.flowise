import { createLLMClient } from '../services/LLMClient.js';

export type PlanStep = { id: string; title: string; detail: string };

export class PlannerAgent {
  constructor(private readonly provider: 'lmstudio' | 'llamaedge' | 'ollama', private readonly model: string) {}

  async plan(projectIdea: string): Promise<PlanStep[]> {
    const client = createLLMClient(this.provider);
    const prompt = `Create a concise build plan for the project idea. Use at most 6 steps. Return bullet points in JSON with id,title,detail.`;
    try {
      const completion = await client.chat(this.model, [
        { role: 'system', content: 'You are a senior architect building cyberpunk tooling.' },
        { role: 'user', content: `${prompt}\nIdea: ${projectIdea}` }
      ]);
      const parsed = JSON.parse(completion) as PlanStep[];
      return parsed;
    } catch (error) {
      // deterministic fallback
      return [
        { id: 'analysis', title: 'Analyse requirements', detail: projectIdea },
        { id: 'design', title: 'Design architecture', detail: 'Define backend services, agents, RAG, and Flowise integration' },
        { id: 'build', title: 'Implement features', detail: 'Code backend, web UI, and automation scripts' },
        { id: 'validate', title: 'Run QA', detail: 'Execute tests and sanity checks' }
      ];
    }
  }
}

import { PlannerAgent } from '../agents/PlannerAgent.js';
import { CoderAgent } from '../agents/CoderAgent.js';
import { ReviewerAgent } from '../agents/ReviewerAgent.js';
import { DBAgent } from '../agents/DBAgent.js';
import { DeployAgent } from '../agents/DeployAgent.js';

export class AgentService {
  planner(provider: 'lmstudio' | 'llamaedge' | 'ollama', model: string) {
    return new PlannerAgent(provider, model);
  }

  coder(provider: 'lmstudio' | 'llamaedge' | 'ollama', model: string) {
    return new CoderAgent(provider, model);
  }

  reviewer(provider: 'lmstudio' | 'llamaedge' | 'ollama', model: string) {
    return new ReviewerAgent(provider, model);
  }

  dba(provider: 'lmstudio' | 'llamaedge' | 'ollama', model: string) {
    return new DBAgent(provider, model);
  }

  deploy(targetDir: string) {
    return new DeployAgent(targetDir);
  }
}

export const agentService = new AgentService();

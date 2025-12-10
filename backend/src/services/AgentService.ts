import { llmClient } from './LLMClient.js';
import { PlannerAgent } from '../agents/PlannerAgent.js';
import { CoderAgent } from '../agents/CoderAgent.js';
import { ReviewerAgent } from '../agents/ReviewerAgent.js';
import { DBAgent } from '../agents/DBAgent.js';
import { DeployAgent } from '../agents/DeployAgent.js';

export class AgentService {
  private planner = new PlannerAgent(llmClient);
  private coder = new CoderAgent(llmClient);
  private reviewer = new ReviewerAgent(llmClient);
  private dbAgent = new DBAgent(llmClient);
  private deployAgent = new DeployAgent(llmClient);

  async plan(idea: string) {
    return this.planner.plan(idea);
  }

  async code(plan: string) {
    return this.coder.code(plan);
  }

  async review(code: string) {
    return this.reviewer.review(code);
  }

  async designSchema(domain: string) {
    return this.dbAgent.design(domain);
  }

  async deploy(plan: string) {
    return this.deployAgent.prepare(plan);
  }
}

export const agentService = new AgentService();

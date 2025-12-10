import { DeployAgent } from '../agents/DeployAgent.js';

export class DeployService {
  async generate(targetDir: string): Promise<string> {
    const agent = new DeployAgent(targetDir);
    return agent.generateDockerCompose();
  }
}

export const deployService = new DeployService();

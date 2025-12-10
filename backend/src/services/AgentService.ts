import { PlannerAgent } from '../agents/PlannerAgent'
import { CoderAgent } from '../agents/CoderAgent'
import { ReviewerAgent } from '../agents/ReviewerAgent'
import { DBAgent } from '../agents/DBAgent'
import { DeployAgent } from '../agents/DeployAgent'

export class AgentService {
  private planner = new PlannerAgent()
  private coder = new CoderAgent()
  private reviewer = new ReviewerAgent()
  private dbAgent = new DBAgent()
  private deployer = new DeployAgent()

  async selfForge(idea: string): Promise<{ plan: string[], schema: string, deployCompose: string }> {
    const plan = await this.planner.plan(idea)
    const schema = await this.dbAgent.proposeSchema(`Database schema for ${idea}`)
    this.dbAgent.persistSchema(schema)
    const deployCompose = await this.deployer.generateCompose(`Deploy ${idea} stack`, 'docker/docker-compose.yml')
    return { plan, schema, deployCompose }
  }

  async generateFile(path: string, instruction: string): Promise<string> {
    return await this.coder.generateFile(path, instruction)
  }

  async review(path: string): Promise<string> {
    return await this.reviewer.reviewFile(path)
  }
}

export const agentService = new AgentService()

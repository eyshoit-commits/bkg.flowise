import { execSync } from 'child_process'
import path from 'path'

export class DeployService {
  buildDocker(imageName: string, dockerfilePath: string): string {
    const abs = path.resolve(dockerfilePath)
    const cmd = `docker build -t ${imageName} -f ${abs} ${path.dirname(abs)}`
    const output = execSync(cmd, { encoding: 'utf-8' })
    return output
  }

  composeUp(composePath: string): string {
    const abs = path.resolve(composePath)
    const output = execSync(`docker compose -f ${abs} up -d`, { encoding: 'utf-8' })
    return output
  }
}

export const deployService = new DeployService()

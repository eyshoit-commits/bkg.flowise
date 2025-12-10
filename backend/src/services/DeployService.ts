import fs from 'fs';
import path from 'path';

export class DeployService {
  async generateCompose(targetDir: string, port = 8443) {
    const compose = {
      version: '3.9',
      services: {
        backend: {
          build: './backend',
          environment: ['NODE_ENV=production'],
          ports: [`${port}:8443`]
        }
      }
    };
    const file = path.join(targetDir, 'docker-compose.yml');
    await fs.promises.writeFile(file, JSON.stringify(compose, null, 2));
    return file;
  }
}

export const deployService = new DeployService();

import fs from 'fs';

export class DeployAgent {
  constructor(private readonly targetDir: string) {}

  async generateDockerCompose(): Promise<string> {
    const compose = {
      version: '3.8',
      services: {
        postgres: {
          image: 'postgres:16-alpine',
          environment: {
            POSTGRES_DB: 'forge',
            POSTGRES_USER: 'forge',
            POSTGRES_PASSWORD: 'change_me_strong'
          },
          ports: ['7543:7543'],
          command: ['postgres', '-p', '7543', '-c', 'shared_buffers=256MB', '-c', 'max_connections=200']
        },
        backend: {
          build: '../backend',
          environment: {
            DATABASE_URL: 'postgresql://forge:change_me_strong@postgres:7543/forge',
            PORT: '7845'
          },
          depends_on: ['postgres'],
          ports: ['7845:7845']
        }
      }
    };
    const content = JSON.stringify(compose, null, 2);
    const filePath = `${this.targetDir}/docker-compose.generated.json`;
    await fs.promises.writeFile(filePath, content, 'utf-8');
    return filePath;
  }
}

import dotenv from 'dotenv'

dotenv.config()

const required = (value: string | undefined, fallback: string): string => {
  return value?.trim() ?? fallback
}

export const env = {
  port: parseInt(process.env.BKG_FORGE_PORT ?? '8444', 10),
  databaseUrl: required(process.env.BKG_FORGE_DATABASE_URL, 'postgresql://forge:forge-secure@localhost:7643/forge?schema=public'),
  flowiseUrl: required(process.env.BKG_FORGE_FLOWISE_URL, 'http://localhost:8743'),
  lmstudioUrl: required(process.env.BKG_FORGE_LMSTUDIO_URL, 'http://localhost:9001'),
  llamaEdgeUrl: required(process.env.BKG_FORGE_LLAMAEDGE_URL, 'http://localhost:9601'),
  ollamaUrl: required(process.env.BKG_FORGE_OLLAMA_URL, 'http://localhost:11443'),
  simStudioUrl: required(process.env.BKG_FORGE_SIM_URL, 'http://localhost:9944'),
  authToken: process.env.BKG_FORGE_TOKEN ?? '',
  enableCors: (process.env.BKG_FORGE_CORS ?? 'true').toLowerCase() === 'true'
}

export type EnvConfig = typeof env

import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(7845),
  DATABASE_URL: z.string().url().default('postgresql://postgres:postgres@localhost:7543/forge?schema=public'),
  FLOWISE_URL: z.string().url().default('http://localhost:8610'),
  LMSTUDIO_URL: z.string().url().default('http://localhost:8801'),
  LLAMAEDGE_URL: z.string().url().default('http://localhost:8802'),
  OLLAMA_URL: z.string().url().default('http://localhost:8803'),
  SIMSTUDIO_URL: z.string().url().default('http://localhost:8804'),
  OPENAI_API_KEY: z.string().optional(),
  ALLOWED_ORIGINS: z.string().optional()
});

const parsed = envSchema.parse(process.env);

export const env = {
  nodeEnv: parsed.NODE_ENV,
  port: parsed.PORT,
  databaseUrl: parsed.DATABASE_URL,
  flowiseUrl: parsed.FLOWISE_URL.replace(/\/$/, ''),
  lmStudioUrl: parsed.LMSTUDIO_URL.replace(/\/$/, ''),
  llamaEdgeUrl: parsed.LLAMAEDGE_URL.replace(/\/$/, ''),
  ollamaUrl: parsed.OLLAMA_URL.replace(/\/$/, ''),
  simStudioUrl: parsed.SIMSTUDIO_URL.replace(/\/$/, ''),
  openaiKey: parsed.OPENAI_API_KEY,
  allowedOrigins: parsed.ALLOWED_ORIGINS?.split(',').map((origin) => origin.trim()).filter(Boolean) ?? ['http://localhost:4173']
};

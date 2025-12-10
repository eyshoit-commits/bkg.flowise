import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('8443'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  FLOWISE_URL: z.string().default('http://127.0.0.1:41800'),
  LMSTUDIO_URL: z.string().default('http://127.0.0.1:8444'),
  OLLAMA_URL: z.string().default('http://127.0.0.1:11434'),
  SIM_URL: z.string().default('http://127.0.0.1:7545'),
  VECTOR_SCHEMA: z.string().default('public')
});

export const env = envSchema.parse(process.env);

export const config = {
  port: Number(env.PORT),
  databaseUrl: env.DATABASE_URL,
  flowiseUrl: env.FLOWISE_URL.replace(/\/$/, ''),
  lmStudioUrl: env.LMSTUDIO_URL.replace(/\/$/, ''),
  ollamaUrl: env.OLLAMA_URL.replace(/\/$/, ''),
  simUrl: env.SIM_URL.replace(/\/$/, ''),
  vectorSchema: env.VECTOR_SCHEMA
};

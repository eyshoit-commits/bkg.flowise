import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import healthRouter from './routes/health.js';
import llmRouter from './routes/llm.js';
import ragRouter from './routes/rag.js';
import agentsRouter from './routes/agents.js';
import deployRouter from './routes/deploy.js';
import flowiseRouter from './routes/flowise.js';
import simRouter from './routes/sim.js';
import pino from 'pino';

const app = express();
const logger = pino({ transport: env.nodeEnv === 'development' ? { target: 'pino-pretty' } : undefined });

app.use(express.json({ limit: '10mb' }));
app.use(helmet());
app.use(cors({ origin: env.allowedOrigins, credentials: true }));
app.use(rateLimit({ windowMs: 60_000, max: 120 }));

app.use('/api/health', healthRouter);
app.use('/api/llm', llmRouter);
app.use('/api/rag', ragRouter);
app.use('/api/agents', agentsRouter);
app.use('/api/deploy', deployRouter);
app.use('/api/flowise', flowiseRouter);
app.use('/api/sim', simRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error(err);
  res.status(500).json({ error: 'Internal server error', details: err instanceof Error ? err.message : 'Unknown error' });
});

app.listen(env.port, () => {
  logger.info(`bkg.forge backend listening on ${env.port}`);
});

export default app;

import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { config } from './config/env.js';
import healthRouter from './routes/health.js';
import llmRouter from './routes/llm.js';
import ragRouter from './routes/rag.js';
import agentsRouter from './routes/agents.js';
import deployRouter from './routes/deploy.js';
import flowiseRouter from './routes/flowise.js';
import simRouter from './routes/sim.js';

const app = express();
const logger = pino({ level: 'info' });

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/api/health', healthRouter);
app.use('/api/llm', llmRouter);
app.use('/api/rag', ragRouter);
app.use('/api/agents', agentsRouter);
app.use('/api/deploy', deployRouter);
app.use('/api/flowise', flowiseRouter);
app.use('/api/sim', simRouter);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error({ err }, 'Unhandled error');
  res.status(500).json({ error: err.message });
});

app.listen(config.port, () => {
  logger.info(`bkg.forge backend listening on ${config.port}`);
});

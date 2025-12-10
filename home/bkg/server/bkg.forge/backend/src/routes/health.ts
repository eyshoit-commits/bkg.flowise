import { Router } from 'express';
import { env } from '../config/env.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ status: 'ok', environment: env.nodeEnv, timestamp: new Date().toISOString() });
});

export default router;

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { config } from '../config/env.js';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (_req, res) => {
  const dbOk = await prisma.$queryRaw`SELECT 1`;
  res.json({ status: 'ok', db: dbOk ? 'connected' : 'unknown', port: config.port });
});

export default router;

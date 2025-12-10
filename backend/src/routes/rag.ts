import { Router } from 'express';
import { ragService } from '../services/RAGService.js';

const router = Router();

router.post('/ingest', async (req, res) => {
  const { source, content } = req.body as { source: string; content: string };
  const result = await ragService.ingest(source, content);
  res.json(result);
});

router.post('/query', async (req, res) => {
  const { question } = req.body as { question: string };
  const result = await ragService.query(question ?? '');
  res.json(result);
});

export default router;

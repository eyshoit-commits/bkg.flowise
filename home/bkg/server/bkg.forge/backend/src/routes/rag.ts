import { Router } from 'express';
import { ragService } from '../services/RAGService.js';

const router = Router();

router.post('/index', async (req, res, next) => {
  try {
    const result = await ragService.indexDocument(req.body);
    res.json({ indexed: true, result });
  } catch (error) {
    next(error);
  }
});

router.post('/query', async (req, res, next) => {
  try {
    const { projectId, query, provider = 'lmstudio', model } = req.body;
    const response = await ragService.query(projectId, query, provider, model);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router;

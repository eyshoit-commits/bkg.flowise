import { Router } from 'express';
import { simService } from '../services/SIMService.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const simulations = await simService.list();
    res.json(simulations);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/run', async (req, res, next) => {
  try {
    const { id } = req.params;
    const output = await simService.run(id, req.body ?? {});
    res.json(output);
  } catch (error) {
    next(error);
  }
});

export default router;

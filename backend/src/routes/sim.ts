import { Router } from 'express';
import { simService } from '../services/SIMService.js';

const router = Router();

router.post('/run', async (req, res) => {
  const { scenario, parameters } = req.body as { scenario: string; parameters: Record<string, unknown> };
  const result = await simService.runScenario(scenario ?? 'default', parameters ?? {});
  res.json(result);
});

export default router;

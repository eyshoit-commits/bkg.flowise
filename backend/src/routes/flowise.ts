import { Router } from 'express';
import { flowiseClient } from '../services/FlowiseClient.js';

const router = Router();

router.get('/flows', async (_req, res) => {
  const flows = await flowiseClient.listFlows();
  res.json({ flows });
});

router.post('/flows/:id/execute', async (req, res) => {
  const { id } = req.params;
  const result = await flowiseClient.executeFlow(id, req.body ?? {});
  res.json(result);
});

router.post('/flows/:id/chat', async (req, res) => {
  const { id } = req.params;
  const { message } = req.body as { message: string };
  const result = await flowiseClient.chat(id, message ?? '');
  res.json(result);
});

export default router;

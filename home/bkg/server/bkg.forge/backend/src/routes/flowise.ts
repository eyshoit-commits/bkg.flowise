import { Router } from 'express';
import { flowiseClient } from '../services/FlowiseClient.js';

const router = Router();

router.get('/flows', async (_req, res, next) => {
  try {
    const flows = await flowiseClient.listFlows();
    res.json(flows);
  } catch (error) {
    next(error);
  }
});

router.post('/flows/:flowId/run', async (req, res, next) => {
  try {
    const { flowId } = req.params;
    const result = await flowiseClient.executeFlow(flowId, req.body ?? {});
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/chat/:flowId', async (req, res, next) => {
  try {
    const { flowId } = req.params;
    const result = await flowiseClient.chat(flowId, req.body ?? {});
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;

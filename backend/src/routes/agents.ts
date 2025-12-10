import { Router } from 'express';
import { agentService } from '../services/AgentService.js';

const router = Router();

router.post('/plan', async (req, res) => {
  const { idea } = req.body as { idea: string };
  const plan = await agentService.plan(idea ?? '');
  res.json(plan);
});

router.post('/code', async (req, res) => {
  const { plan } = req.body as { plan: string };
  const code = await agentService.code(plan ?? '');
  res.json(code);
});

router.post('/review', async (req, res) => {
  const { code } = req.body as { code: string };
  const review = await agentService.review(code ?? '');
  res.json(review);
});

router.post('/db', async (req, res) => {
  const { domain } = req.body as { domain: string };
  const schema = await agentService.designSchema(domain ?? '');
  res.json(schema);
});

router.post('/deploy', async (req, res) => {
  const { plan } = req.body as { plan: string };
  const deploy = await agentService.deploy(plan ?? '');
  res.json(deploy);
});

export default router;

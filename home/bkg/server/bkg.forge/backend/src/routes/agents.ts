import { Router } from 'express';
import { agentService } from '../services/AgentService.js';

const router = Router();

router.post('/plan', async (req, res, next) => {
  try {
    const { idea, provider = 'lmstudio', model } = req.body;
    const planner = agentService.planner(provider, model);
    const plan = await planner.plan(idea);
    res.json({ plan });
  } catch (error) {
    next(error);
  }
});

router.post('/review', async (req, res, next) => {
  try {
    const { file, provider = 'lmstudio', model } = req.body;
    const reviewer = agentService.reviewer(provider, model);
    const findings = await reviewer.reviewFile(file);
    res.json({ findings });
  } catch (error) {
    next(error);
  }
});

router.post('/deploy', async (req, res, next) => {
  try {
    const { targetDir } = req.body;
    const deployer = agentService.deploy(targetDir);
    const filePath = await deployer.generateDockerCompose();
    res.json({ generated: filePath });
  } catch (error) {
    next(error);
  }
});

export default router;

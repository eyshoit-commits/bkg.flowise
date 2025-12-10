import { Router } from 'express';
import { deployService } from '../services/DeployService.js';

const router = Router();

router.post('/compose', async (req, res) => {
  const { targetDir, port } = req.body as { targetDir: string; port?: number };
  const file = await deployService.generateCompose(targetDir, port ?? 8443);
  res.json({ file });
});

export default router;

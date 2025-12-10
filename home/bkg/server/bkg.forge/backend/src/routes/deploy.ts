import { Router } from 'express';
import { deployService } from '../services/DeployService.js';

const router = Router();

router.post('/compose', async (req, res, next) => {
  try {
    const { targetDir } = req.body as { targetDir: string };
    const file = await deployService.generate(targetDir);
    res.json({ file });
  } catch (error) {
    next(error);
  }
});

export default router;

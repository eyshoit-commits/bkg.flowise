import { Router } from 'express';
import { createLLMClient, ChatMessage } from '../services/LLMClient.js';

const router = Router();

router.post('/chat', async (req, res, next) => {
  try {
    const { provider = 'lmstudio', model, messages } = req.body as { provider: 'lmstudio' | 'llamaedge' | 'ollama'; model: string; messages: ChatMessage[] };
    const client = createLLMClient(provider);
    const completion = await client.chat(model, messages);
    res.json({ completion });
  } catch (error) {
    next(error);
  }
});

router.post('/embed', async (req, res, next) => {
  try {
    const { provider = 'lmstudio', model, input } = req.body as { provider: 'lmstudio' | 'llamaedge' | 'ollama'; model: string; input: string };
    const client = createLLMClient(provider);
    const embedding = await client.embed(model, input);
    res.json({ embedding });
  } catch (error) {
    next(error);
  }
});

export default router;

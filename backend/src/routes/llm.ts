import { Router } from 'express';
import { llmClient } from '../services/LLMClient.js';

const router = Router();

router.post('/chat', async (req, res) => {
  const { messages } = req.body as { messages: { role: 'system' | 'user' | 'assistant'; content: string }[] };
  const reply = await llmClient.chat(messages ?? []);
  res.json({ reply });
});

router.post('/embed', async (req, res) => {
  const { text } = req.body as { text: string };
  const vector = await llmClient.embedding(text ?? '');
  res.json({ vector });
});

export default router;

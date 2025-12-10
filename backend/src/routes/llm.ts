import { Router } from 'express'
import { llmClient } from '../services/LLMClient'

const router = Router()

router.post('/chat', async (req, res, next) => {
  try {
    const { messages, provider } = req.body
    const result = await llmClient.chat(messages, provider)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

router.post('/embed', async (req, res, next) => {
  try {
    const { texts } = req.body
    const result = await llmClient.embed(texts)
    res.json({ embeddings: result })
  } catch (err) {
    next(err)
  }
})

export default router

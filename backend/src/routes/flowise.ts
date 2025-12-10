import { Router } from 'express'
import { flowiseClient } from '../services/FlowiseClient'

const router = Router()

router.get('/flows', async (_req, res, next) => {
  try {
    const flows = await flowiseClient.listFlows()
    res.json({ flows })
  } catch (err) {
    next(err)
  }
})

router.post('/execute', async (req, res, next) => {
  try {
    const result = await flowiseClient.executeFlow(req.body)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

router.post('/chat', async (req, res, next) => {
  try {
    const { message, sessionId } = req.body
    const result = await flowiseClient.chat(message, sessionId)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

export default router

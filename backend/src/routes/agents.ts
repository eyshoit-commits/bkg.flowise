import { Router } from 'express'
import { agentService } from '../services/AgentService'

const router = Router()

router.post('/plan', async (req, res, next) => {
  try {
    const { idea } = req.body
    const result = await agentService.selfForge(idea)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

router.post('/code', async (req, res, next) => {
  try {
    const { path, instruction } = req.body
    const result = await agentService.generateFile(path, instruction)
    res.json({ content: result })
  } catch (err) {
    next(err)
  }
})

router.post('/review', async (req, res, next) => {
  try {
    const { path } = req.body
    const result = await agentService.review(path)
    res.json({ report: result })
  } catch (err) {
    next(err)
  }
})

export default router

import { Router } from 'express'
import { simService } from '../services/SIMService'

const router = Router()

router.post('/', async (req, res, next) => {
  try {
    const result = await simService.runSimulation(req.body)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

export default router

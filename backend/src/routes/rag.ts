import { Router } from 'express'
import { ragService } from '../services/RAGService'

const router = Router()

router.post('/index', async (req, res, next) => {
  try {
    const { path } = req.body
    const result = await ragService.indexPath(path)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

router.post('/query', async (req, res, next) => {
  try {
    const { question } = req.body
    const result = await ragService.query(question)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

export default router

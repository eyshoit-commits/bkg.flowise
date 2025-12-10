import { Router } from 'express'
import { deployService } from '../services/DeployService'

const router = Router()

router.post('/build', async (req, res, next) => {
  try {
    const { imageName, dockerfile } = req.body
    const output = deployService.buildDocker(imageName, dockerfile)
    res.json({ output })
  } catch (err) {
    next(err)
  }
})

router.post('/compose', async (req, res, next) => {
  try {
    const { composePath } = req.body
    const output = deployService.composeUp(composePath)
    res.json({ output })
  } catch (err) {
    next(err)
  }
})

export default router

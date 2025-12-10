import { Router } from 'express'
import { prisma } from '../services/prismaClient'

const router = Router()

router.get('/', async (_req, res) => {
  const dbPing = await prisma.$queryRaw`SELECT 1`
  res.json({ status: 'ok', database: dbPing ? 'reachable' : 'unreachable' })
})

export default router

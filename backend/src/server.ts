import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import pino from 'pino'
import pinoHttp from 'pino-http'
import { env } from './config/env'
import healthRouter from './routes/health'
import llmRouter from './routes/llm'
import ragRouter from './routes/rag'
import agentRouter from './routes/agents'
import deployRouter from './routes/deploy'
import flowiseRouter from './routes/flowise'
import simRouter from './routes/sim'

const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: { colorize: true }
  }
})

const app = express()

if (env.enableCors) {
  app.use(cors())
}
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(pinoHttp({ logger }))

app.use('/api/health', healthRouter)
app.use('/api/llm', llmRouter)
app.use('/api/rag', ragRouter)
app.use('/api/agents', agentRouter)
app.use('/api/deploy', deployRouter)
app.use('/api/flowise', flowiseRouter)
app.use('/api/sim', simRouter)

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error({ err }, 'Unhandled error')
  res.status(500).json({ error: 'Internal server error' })
})

const start = (): void => {
  app.listen(env.port, () => {
    logger.info(`bkg.forge backend listening on ${env.port}`)
  })
}

start()

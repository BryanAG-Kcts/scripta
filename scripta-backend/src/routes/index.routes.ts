import { Router } from 'express'
import { authRouter } from './auth.routes'
import { iaRouter } from './ia.routes'
import { configRouter } from './config.routes'

export const indexRouter = Router()

indexRouter.use('/auth', authRouter)
indexRouter.use('/ia', iaRouter)
indexRouter.use('/config', configRouter)

indexRouter.all('*', (_req, res) => {
  res.json({ message: 'Error' }).status(404)
})

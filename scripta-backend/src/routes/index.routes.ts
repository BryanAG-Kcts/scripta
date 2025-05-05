import { Router } from 'express'
import { authRouter } from './auth.routes'
import { iaRouter } from './ia.routes'

export const indexRouter = Router()

indexRouter.use('/auth', authRouter)
indexRouter.use('/ia', iaRouter)

indexRouter.all('*', (_req, res) => {
  res.json({ message: 'Error' }).status(404)
})

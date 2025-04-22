import { Router } from 'express'
import { authRouter } from './auth.routes'

export const indexRouter = Router()

indexRouter.use('/auth', authRouter)

indexRouter.all('*', (_req, res) => {
  res.json({ message: 'Error' })
})

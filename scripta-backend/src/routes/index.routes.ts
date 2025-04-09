import { Router } from 'express'

export const indexRouter = Router()
indexRouter.use('*', (_req, res) => {
  res.json({ message: 'Error' })
})

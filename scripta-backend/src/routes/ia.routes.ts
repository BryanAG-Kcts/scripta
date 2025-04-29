import { Router } from 'express'
import { kadolia } from '../controllers/ia.controllers'

export const iaRouter = Router()
iaRouter.post('/kadolia', kadolia)

import { Router } from 'express'
import { consultModel, kadolia} from '../controllers/ia.controllers'

export const iaRouter = Router()
iaRouter.post('/kadolia', kadolia)
iaRouter.post('/consult', consultModel)

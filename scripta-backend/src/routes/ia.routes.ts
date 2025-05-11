import { Router } from 'express'
import { consultModel} from '../controllers/ia.controllers'

export const iaRouter = Router()
iaRouter.post('/consult', consultModel)

import type { Request, Response } from 'express'
import { IaModel } from '../models/ia.model'

export async function kadolia(req: Request, res: Response) {
  const { messages } = req.body
  const iaModel = new IaModel()

  const data = await iaModel.chatCompletion(messages)
  res.json({ data })
}

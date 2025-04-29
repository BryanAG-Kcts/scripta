import cors from 'cors'
import express, { type Express, json } from 'express'
import { indexRouter } from '../routes/index.routes'
import { PgConnection } from '../services/pgConnection.services'
import { ENVIRONMENT } from './environment'

export class Server {
  app: Express
  port: number

  constructor() {
    this.app = express()
    this.port = ENVIRONMENT.port
  }

  connectionDb() {
    PgConnection.getInstance()
  }

  middlewares() {
    this.app.use(json())
    this.app.use(cors())
  }

  routes() {
    this.app.use(indexRouter)
  }

  runServer() {
    this.connectionDb()
    this.middlewares()
    this.routes()

    this.app.listen(this.port, () => {
      console.log(`http://localhost:${this.port}`)
    })
  }
}

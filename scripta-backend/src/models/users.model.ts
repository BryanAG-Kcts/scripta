import bcrypt from 'bcrypt'
import type { IDatabase } from 'pg-promise'
import { PgConnection } from '../services/pgConnection.services'

export class UserModel {
  private db: IDatabase<unknown>

  constructor() {
    this.db = PgConnection.getInstance().connection
  }

  async findByEmail(email: string) {
    return await this.db.oneOrNone('SELECT id, username as name, email, password FROM users WHERE email = $1', [
      email
    ])
  }

  async createUser(email: string, username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const {id} = await this.db.one(
      `INSERT INTO users (email, username, password)
         VALUES ($1, $2, $3)
        returning id`,
      [email, username, hashedPassword])

      const stateDefault : boolean = true
      const toneDefault : string = 'formal'
      const verbosityDefault : string = 'media'
      const stateDictionaryDefault : boolean = true

      if(id){
         await this.db.query(`
          INSERT INTO SETTINGS (USERS_Id, State, Tone, Verbosity, State_dictionarie)
          VALUES ($1, $2, $3, $4, $5);
        `,[id, stateDefault, toneDefault, verbosityDefault, stateDictionaryDefault])
          return true
      } 
      return false     
  }

  async verifyPassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword)
  }
}

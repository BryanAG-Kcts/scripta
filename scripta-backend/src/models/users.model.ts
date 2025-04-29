import bcrypt from 'bcrypt'
import type { IDatabase } from 'pg-promise'
import { PgConnection } from '../services/pgConnection.services'

export class UserModel {
  private db: IDatabase<unknown>

  constructor() {
    this.db = PgConnection.getInstance().connection
  }

  async findByEmail(email: string) {
    return await this.db.oneOrNone('SELECT * FROM users WHERE email = $1', [
      email
    ])
  }

  async createUser(email: string, username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10)
    return await this.db.one(
      `INSERT INTO users (email, username, password)
         VALUES ($1, $2, $3)
         RETURNING id, email, username`,
      [email, username, hashedPassword]
    )
  }

  async verifyPassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword)
  }
}

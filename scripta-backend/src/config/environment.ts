import 'dotenv/config'
export const ENVIRONMENT = {
  port: Number(process.env.PORT) ?? 8000,
  db_url: String(process.env.DB_URL) ?? " postgres://postgres:xxx@127.0.0.1:5432/postgres"
}

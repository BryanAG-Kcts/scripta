import 'dotenv/config'
export const ENVIRONMENT = {
  port: Number(process.env.PORT) ?? 8000
}

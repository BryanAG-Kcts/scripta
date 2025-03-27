import express from 'express'

const app = express()
const port = 3000

app.get('/', (_req, res) => {
  res.send('Hola desde el backend!')
})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})

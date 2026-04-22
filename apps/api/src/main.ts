import express from 'express'
import type { ApiResponse, Application } from '@applyfy/shared'

const app = express()
const port = process.env.PORT ?? 3000

app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'applyfy-api' })
})

app.get('/applications', (_req, res) => {
  const response: ApiResponse<Application[]> = {
    data: [],
    message: 'ok',
  }
  res.json(response)
})

app.listen(port, () => {
  console.log(`API запущен на http://localhost:${port}`)
})

import 'dotenv/config'

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { router } from './routes'
import { initDatabase } from './config/database.config'

const PORT = process.env.PORT ?? 8000

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api', router)

async function main() {
  await initDatabase()

  app.listen(PORT, () => {
    console.log(`Local server is running on http://localhost:${PORT}`)
  })
}
main()

import path from 'node:path'
import { DataSource } from 'typeorm'

const ENTITIES_PATH = path.join(
  __dirname,
  '..',
  'entities',
  '**',
  '*.entity.{ts,js}',
)

const SUBSCRIBERS_PATH = path.join(
  __dirname,
  '..',
  'subscribers',
  '**',
  '*.subscriber.{ts,js}',
)

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT) || 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  entities: [ENTITIES_PATH],
  subscribers: [SUBSCRIBERS_PATH],
})

export const initDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize()
      console.log('Data source has been initialized.')
    }
  } catch (error) {
    console.error('Error during DataSource initialization', error)
  }
}

import { consola } from 'consola'
import { migrate } from 'drizzle-orm/mysql2/migrator'
import { useDrizzle } from '../utils/drizzle'

export default defineNitroPlugin(async () => {
  if (!import.meta.dev) return

  try {
    const db = await useDrizzle()
    await migrate(db, { migrationsFolder: 'server/database/migrations' })
    consola.success('Database migrations applied successfully')
  } catch (error) {
    consola.error('Failed to apply database migrations:', error)
  }
})

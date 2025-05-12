import { consola } from 'consola'
import { migrate } from 'drizzle-orm/mysql2/migrator'
import { useDrizzle } from '../utils/drizzle'

export default defineNitroPlugin(async () => {
  if (!import.meta.dev) return

  onHubReady(async () => {
    await migrate(await useDrizzle(), { migrationsFolder: 'server/database/migrations' })
      .then(() => {
        consola.success('Database migrations done')
      })
      .catch((err) => {
        consola.error('Database migrations failed', err)
      })
  })
})

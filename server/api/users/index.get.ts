import { useDrizzle, tables } from '~/server/utils/drizzle'

export default defineEventHandler(async (event) => {
  try {
    const db = await useDrizzle()
    const users = await db.select().from(tables.users)
    
    return users
  } catch (error) {
    console.error('Error fetching users:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch users'
    })
  }
})

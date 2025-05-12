import { useDrizzle, tables, eq } from '~/server/utils/drizzle'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User ID is required'
      })
    }
    
    const db = await useDrizzle()
    const users = await db.select().from(tables.users).where(
      eq(tables.users.id, parseInt(id))
    )
    
    if (!users.length) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }
    
    return users[0]
  } catch (error) {
    console.error(`Error fetching user with ID ${getRouterParam(event, 'id')}:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch user'
    })
  }
})

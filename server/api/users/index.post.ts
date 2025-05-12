import { useDrizzle, tables } from '~/server/utils/drizzle'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validate required fields
    if (!body.name || !body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Name, email, and password are required'
      })
    }
    
    const db = await useDrizzle()
    
    // Insert the new user
    const result = await db.insert(tables.users).values({
      name: body.name,
      email: body.email,
      password: body.password, // In a real app, you should hash this password
      avatar: body.avatar || 'default-avatar.png'
    })
    
    // Return the newly created user
    const newUser = await db.select().from(tables.users).where(
      eq(tables.users.id, result.insertId)
    )
    
    return { 
      message: 'User created successfully',
      user: newUser[0] 
    }
  } catch (error) {
    console.error('Error creating user:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create user'
    })
  }
})

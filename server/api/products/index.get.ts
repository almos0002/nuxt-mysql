import { useDrizzle, tables } from '~/server/utils/drizzle'

export default defineEventHandler(async (event) => {
  try {
    const db = await useDrizzle()
    const products = await db.select().from(tables.products)
    
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch products'
    })
  }
})

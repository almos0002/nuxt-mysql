import { useDrizzle, tables, eq } from '~/server/utils/drizzle'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Product ID is required'
      })
    }
    
    const db = await useDrizzle()
    const products = await db.select().from(tables.products).where(
      eq(tables.products.id, parseInt(id))
    )
    
    if (!products.length) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Product not found'
      })
    }
    
    return products[0]
  } catch (error) {
    console.error(`Error fetching product with ID ${getRouterParam(event, 'id')}:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch product'
    })
  }
})

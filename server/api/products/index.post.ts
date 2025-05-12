import { useDrizzle, tables, eq } from '~/server/utils/drizzle'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validate required fields
    if (!body.name || !body.price) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Name and price are required'
      })
    }
    
    const db = await useDrizzle()
    
    // Insert the new product
    const result = await db.insert(tables.products).values({
      name: body.name,
      description: body.description || '',
      price: body.price
    })
    
    // Return the newly created product
    const newProduct = await db.select().from(tables.products).where(
      eq(tables.products.id, result.insertId)
    )
    
    return { 
      message: 'Product created successfully',
      product: newProduct[0] 
    }
  } catch (error) {
    console.error('Error creating product:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create product'
    })
  }
})

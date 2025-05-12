export { sql, eq, and, or } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/mysql2'
import * as schema from '../database/schema'
import mysql from 'mysql2/promise'

export const tables = schema

async function createMySQLConnection() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'nxdirectory',
  })

  return connection
}

export async function useDrizzle() {
  const connection = await createMySQLConnection()
  return drizzle(connection, { schema, mode: 'default' })
}

export type User = typeof schema.users.$inferSelect
export type Product = typeof schema.products.$inferSelect

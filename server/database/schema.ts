import { mysqlTable, text, int, timestamp, varchar } from 'drizzle-orm/mysql-core'

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  name: text('name').notNull(),
  email: varchar('email', { length: 250 }).notNull().unique(),
  password: text('password').notNull(),
  avatar: text('avatar'),
  createdAt: timestamp('created_at').defaultNow(),
})

// You can add more tables as needed
export const products = mysqlTable('products', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  price: int('price').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

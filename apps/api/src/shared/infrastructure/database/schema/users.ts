import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export type UserRow = InferSelectModel<typeof users> // тип для SELECT (все поля)
export type UserInsertRow = InferInsertModel<typeof users> // тип для INSERT

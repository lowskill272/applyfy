import { User } from '../../domain/entities/User.js'
import { UserRepository } from '../../domain/repositories/UserRepository.js'
import { db } from '../../../../shared/infrastructure/database/postgres.js'
import { UserInsertRow, users } from '../../../../shared/infrastructure/database/schema/users.js'
import { eq } from 'drizzle-orm'

export class PostgresUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
    const userRow = PostgresUserRepository.toRow(user)
    await db
      .insert(users)
      .values({ ...userRow })
      .onConflictDoUpdate({
        target: users.id,
        set: { email: userRow.email, updatedAt: new Date() },
      })
  }
  async findById(id: string): Promise<User | null> {
    const rows = await db.select().from(users).where(eq(users.id, id))
    const row = rows[0]
    if (!row) return null
    return User.restore(row)
  }
  async findByEmail(email: string): Promise<User | null> {
    const rows = await db.select().from(users).where(eq(users.email, email))
    const row = rows[0]
    if (!row) return null
    return User.restore(row)
  }

  private static toRow(user: User): UserInsertRow {
    return {
      id: user.getId(),
      email: user.getEmail().getValue(),
      passwordHash: user.getPassword().getValue(),
    }
  }
}

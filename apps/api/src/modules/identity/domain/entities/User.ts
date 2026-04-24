import { AggregateRoot } from '../../../../shared/domain/AggregateRoot.js'
import { UserRow } from '../../../../shared/infrastructure/database/schema/users.js'
import { UserCreateDTO } from '../../application/use-cases/register/UserCreateDTO.js'
import { UserCreatedEvent } from '../events/UserCreatedEvent.js'
import { Email } from '../value-objects/Email.js'
import { HashedPassword } from '../value-objects/HashedPassword.js'

export class User extends AggregateRoot {
  private constructor(
    id: string,
    private readonly email: Email,
    private readonly passwordHash: HashedPassword,
  ) {
    super(id)
  }

  static create({ email, passwordHash }: UserCreateDTO) {
    const emailVO = new Email(email)
    const passwordHashVO = new HashedPassword(passwordHash)
    const user = new User(crypto.randomUUID(), emailVO, passwordHashVO)
    user.addDomainEvent(new UserCreatedEvent(user.id))
    return user
  }

  static restore(userRow: UserRow): User {
    return new User(userRow.id, new Email(userRow.email), new HashedPassword(userRow.passwordHash))
  }

  getId(): string {
    return this.id
  }

  getEmail(): Email {
    return this.email
  }

  getPassword(): HashedPassword {
    return this.passwordHash
  }
}

import { AggregateRoot } from '../../../../shared/domain/AggregateRoot.js'
import { UserCreateDTO } from '../../application/use-cases/register/UserCreateDTO.js'
import { UserCreatedEvent } from '../events/UserCreatedEvent.js'
import { Email } from '../value-objects/Email.js'
import { Password } from '../value-objects/Password.js'

export class User extends AggregateRoot {
  private constructor(
    id: string,
    private readonly email: Email,
    private readonly password: Password,
  ) {
    super(id)
  }

  static create({ email, password }: UserCreateDTO) {
    const emailVO = new Email(email)
    const passwordHashVO = new Password(password)
    const user = new User(crypto.randomUUID(), emailVO, passwordHashVO)
    user.addDomainEvent(new UserCreatedEvent(user.id))
    return user
  }

  getEmail(): Email {
    return this.email
  }

  getPassword(): Password {
    return this.password
  }
}

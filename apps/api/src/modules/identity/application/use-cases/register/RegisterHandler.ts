import { User } from '../../../domain/entities/User.js'
import { UniqueConstraintError } from '../../../domain/errors/UniqueConstraintError.js'
import { UserRepository } from '../../../domain/repositories/UserRepository.js'
import { Password } from '../../../domain/value-objects/Password.js'
import bcrypt from 'bcrypt'
import { RegisterCommand } from './RegisterCommand.js'

export class RegisterHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(registerCommand: RegisterCommand) {
    if (await this.userRepository.findByEmail(registerCommand.email)) {
      throw new UniqueConstraintError()
    }

    const password = new Password(registerCommand.password)
    const passwordHash = await bcrypt.hash(password.getValue(), 10)

    const user = User.create({ email: registerCommand.email, passwordHash: passwordHash })
    await this.userRepository.save(user)

    return user.getId()
  }
}

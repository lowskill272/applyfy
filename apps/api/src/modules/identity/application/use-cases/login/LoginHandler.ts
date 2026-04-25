import { InvalidCredentialsError } from '../../../domain/errors/InvalidCredentialsError.js'
import { UserIsNotFoundError } from '../../../domain/errors/UserIsNotFoundError.js'
import { UserRepository } from '../../../domain/repositories/UserRepository.js'
import { LoginCommand } from './LoginCommand.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class LoginHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(loginCommand: LoginCommand): Promise<string> {
    const user = await this.userRepository.findByEmail(loginCommand.email)
    if (!user) {
      throw new UserIsNotFoundError()
    }

    const result = await bcrypt.compare(loginCommand.password, user.getPassword().getValue())

    if (!result) {
      throw new InvalidCredentialsError()
    }

    return jwt.sign({ userId: user.getId() }, process.env.JWT_SECRET!, { expiresIn: '7d' })
  }
}

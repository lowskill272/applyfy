import { PostgresUserRepository } from '../../modules/identity/infrastructure/persistence/PostgresUserRepository.js'
import { RegisterHandler } from '../../modules/identity/application/use-cases/register/RegisterHandler.js'
import { AuthController } from '../../modules/identity/presentation/http/auth.controller.js'

// Инфраструктура
const userRepository = new PostgresUserRepository()

// Use Cases
const registerHandler = new RegisterHandler(userRepository)

// Controllers
export const authController = new AuthController(registerHandler)

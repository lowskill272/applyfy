import { Router } from 'express'
import { authController } from '../../../../shared/infrastructure/container.js'

export const authRouter: Router = Router()

authRouter.post('/register', (req, res) => authController.register(req, res))

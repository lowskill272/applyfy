import { BaseController } from '../../../../shared/presentation/BaseController.js'
import type { Request, Response } from 'express'
import { RegisterHandler } from '../../application/use-cases/register/RegisterHandler.js'
import { RegisterRequestBody } from './request/RegisterRequestBody.js'
import { LoginRequestBody } from './request/LoginRequestBody.js'
import { LoginHandler } from '../../application/use-cases/login/LoginHandler.js'

export class AuthController extends BaseController {
  constructor(
    private readonly registerHandler: RegisterHandler,
    private readonly loginHandler: LoginHandler,
  ) {
    super()
  }

  async register(req: Request<{}, {}, RegisterRequestBody>, res: Response): Promise<Response> {
    try {
      const userId = await this.registerHandler.execute(req.body)
      return this.sendSuccess(res, userId, 200)
    } catch (e: any) {
      console.error(e)
      return this.sendError(res, e.message, 400)
    }
  }

  async login(req: Request<{}, {}, LoginRequestBody>, res: Response): Promise<Response> {
    try {
      const jwt = await this.loginHandler.execute(req.body)
      return this.sendSuccess(res, jwt, 200)
    } catch (e: any) {
      console.error(e)
      return this.sendError(res, e.message, 400)
    }
  }
}

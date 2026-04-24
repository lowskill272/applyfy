import { BaseController } from '../../../../shared/presentation/BaseController.js'
import type { Request, Response } from 'express'
import { RegisterHandler } from '../../application/use-cases/register/RegisterHandler.js'
import { RegisterRequestBody } from './request/RegisterRequestBody.js'

export class AuthController extends BaseController {
  constructor(private readonly registerHandler: RegisterHandler) {
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
}

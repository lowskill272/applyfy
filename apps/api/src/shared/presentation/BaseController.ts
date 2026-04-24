import type { Response } from 'express'

export class BaseController {
  sendSuccess(res: Response, data: unknown, statusCode: number = 200): Response {
    return res.status(statusCode).json(data)
  }

  sendError(res: Response, message: string, statusCode: number = 400): Response {
    return res.status(statusCode).json(message)
  }
}

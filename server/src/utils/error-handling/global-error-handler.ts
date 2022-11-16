import { NextFunction, Request, Response } from 'express'
import statusCodes from 'http-status-codes'
import CustomError from './custom-error'

const globalErrorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): Response => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({ error: err.message })
  }

  return res
    .status(statusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: err.message ?? 'Something went wrong' })
}

export default globalErrorHandler

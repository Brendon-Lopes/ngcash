import { NextFunction, Request, Response } from 'express'
import tokenHandler from '../utils/jwt'
import statusCodes from 'http-status-codes'

export default class ValidateToken {
  static execute (req: Request, res: Response, next: NextFunction): Response | undefined {
    const { authorization: token } = req.headers

    if (token == null) {
      return res.status(statusCodes.UNAUTHORIZED).json({ error: 'token not provided' })
    }

    tokenHandler.verifyToken(token)

    next()
  }
}

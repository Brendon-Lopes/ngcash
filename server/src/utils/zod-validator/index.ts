import { NextFunction, Request, Response } from 'express'
import statusCodes from 'http-status-codes'
import { z } from 'zod'

export default abstract class ZodValidation {
  protected static schema: z.Schema

  static validate (req: Request, res: Response, next: NextFunction): Response | undefined {
    const result = this.schema.safeParse(req.body)

    if (!result.success) {
      const errors = result.error.issues.map(({ path, message }) => ({ [path[0]]: message }))
      return res.status(statusCodes.BAD_REQUEST).json({ errors })
    }

    next()
  }
}

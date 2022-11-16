import 'dotenv/config'
import jwt from 'jsonwebtoken'
import CustomError from '../error-handling/custom-error'
import statusCodes from 'http-status-codes'

class TokenHandler {
  constructor (private readonly secret: string) { }

  public createToken (payload: any): string {
    return jwt.sign(payload, this.secret, { expiresIn: '24h' })
  }

  public verifyToken (token: string): string | jwt.JwtPayload | undefined {
    try {
      return jwt.verify(token, this.secret)
    } catch (error) {
      throw new CustomError(statusCodes.UNAUTHORIZED, 'invalid token')
    }
  }
}

const jwtSecret = process.env.JWT_SECRET as string

const tokenHandler = new TokenHandler(jwtSecret)

export default tokenHandler

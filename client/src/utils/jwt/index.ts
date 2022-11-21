import jwt_decode from 'jwt-decode'

const decodeToken = (token: string): any => {
  return jwt_decode(token)
}

export { decodeToken }

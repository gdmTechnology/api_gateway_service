import { JwtAdapter } from '@/infra/cryptography'
import { Request, Response, NextFunction } from 'express'
import env from '@/main/config/env'

let jwtAdapter = null

export const checkJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers['x-access-token']
  if (!token) {
    console.error('api_gateway_service/express.middleware.adapter.ts/checkJWT/ValidationError - No Token provided!')
    return res.status(401).json({ auth: false, message: 'No token provided.' })
  }

  if (!jwtAdapter) {
    jwtAdapter = new JwtAdapter(env.jwtSecret)
  }
  const tokenDecrypted = await jwtAdapter.decrypt(token)
  if (!tokenDecrypted) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
  console.info('Successfully validated token!')
  next()
}

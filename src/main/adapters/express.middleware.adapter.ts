import { JwtAdapter } from '@/infra/cryptography'
import { Request, Response, NextFunction } from 'express'
import env from '@/main/config/env'

let jwtAdapter = null

export const checkJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers['x-access-token']
  if (!token) {
    console.error('mid_api_gateway/utils.js/checkJWT/ValidationError - No Token provided!')
    return res.status(401).json({ auth: false, message: 'No token provided.' })
  }

  if (!jwtAdapter) {
    jwtAdapter = new JwtAdapter(env.jwtSecret)
  }
  const tokenDecrypted = await jwtAdapter.decrypt(token)
  if (!tokenDecrypted) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
  console.info('Successfully validated token!')
  next()

  // jwt.verify(token, process.env.SECRET, (err, decoded) => {
  //   if (err) {
  //     console.error('mid_api_gateway/utils.js/checkJWT/ValidationError - Failed to authenticate token!')
  //     return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
  //   }
  //   req.headers.tenantId = decoded.tenantId
  //   delete req.headers['x-access-token']
  //   console.info('Successfully validated token!')
  //   next()
  // })
}

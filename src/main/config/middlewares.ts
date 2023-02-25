import { bodyParser, cors, contentType } from '@/main/middlewares'

import { Express } from 'express'
import rateLimiter from 'express-rate-limit'
import env from '@/main/config/env'

export default (app: Express): void => {
    app.use(bodyParser)
    app.use(cors)
    app.use(contentType)
    app.use(
        rateLimiter({
            windowMs: env.windowMs,
            max: env.limit
        })
    )
}

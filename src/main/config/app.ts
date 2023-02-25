import setupMiddlewares from '@/main/config/middlewares'
import setupProxy from '@/main/config/api.gateway.builder'
import setupStaticFiles from '@/main/config/static.files'
import httpProxy from 'express-http-proxy'
import express, { Express } from 'express'

export const setupApp = async (): Promise<Express> => {
    const app = express()
    setupStaticFiles(app)
    setupMiddlewares(app)
    setupProxy({ app, express, httpProxy })
    return app
}

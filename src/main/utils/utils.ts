import fs from 'fs'
import YAML from 'js-yaml'
import jwt from 'jsonwebtoken'
import env from '@/main/config/env'
import { Constants } from '.'

const middlewarePrefix = '/middleware'
const nlmPrefix = '/rem'

export const Utils = {
    readApiDoc() {
        try {
            const raw = fs.readFileSync('./api_doc.yaml')
            const apiDoc = YAML.load(raw)
            console.info('API Gateway Configuration File loaded successfully!')
            return apiDoc
        } catch (error) {
            const responseError = Constants.ERROR_YAML_FILE
            responseError.message = error
            console.error('mid_api_gateway/utils.js/readApiDoc/ERROR_YAML_FILE', responseError)
            return responseError
        }
    },

    checkJWT(req, res, next) {
        const token = req.headers['x-access-token']
        if (!token) {
            console.error('mid_api_gateway/utils.js/checkJWT/ValidationError - No Token provided!')
            return res.status(401).json({ auth: false, message: 'No token provided.' })
        }

        jwt.verify(token, env.jwtSecret, (err, decoded) => {
            if (err) {
                console.error('mid_api_gateway/utils.js/checkJWT/ValidationError - Failed to authenticate token!')
                return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
            }
            req.headers.tenantId = decoded.tenantId
            delete req.headers['x-access-token']
            console.info('Successfully validated token!')
            next()
        })
    },

    formatDestinationPath(path) {
        let destinationPath = ''
        if (path.includes(middlewarePrefix)) destinationPath = path.replace(middlewarePrefix, '')
        else if (path.includes(nlmPrefix)) destinationPath = path.replace(nlmPrefix, '')
        return destinationPath
    }
}

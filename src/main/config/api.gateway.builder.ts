import { Utils, Constants } from '@/main/utils'
import Proxy from './proxy'

const apiGatewayBuilder = (app): void => {
    const apiDoc = Utils.readApiDoc()
    if (apiDoc.name !== Constants.ERROR_YAML_FILE.name) {
        Proxy.build(apiDoc, app)
    } else console.error('api_gateway_service/api.gateway.builder.ts/apiGatewayBuilder/Error - ', apiDoc)
}

export default apiGatewayBuilder

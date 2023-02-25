import { Utils, Constants } from '@/main/utils'
import Proxy from './proxy'

export default (app): void => {
    const apiDoc = Utils.readApiDoc()
    if (apiDoc.name !== Constants.ERROR_YAML_FILE.name) {
        Proxy.build(apiDoc, app)
    } else console.error('mid_api_gateway/api_gtw_builder.js/buildProxy/Error - ', apiDoc)
}

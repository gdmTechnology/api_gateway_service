import { Utils, Constants } from '@/main/utils'

const Proxy = {
  build(apiDoc, data) {
    const {
      app, httpProxy, express
    } = data

    apiDoc.services.forEach((service) => {
      service.routes.forEach((route) => {
        if (route.paths[0].includes('import')) app.use(express.raw({ limit: '50mb', type: () => true }))
        const proxy = httpProxy(`${service.host}:${service.port}`)
        switch (route.methods[0]) {
          case Constants.HTTP_POST:
            if (route.auth) {
              app.post(route.paths[0], Utils.checkJWT, (req, res, next) => proxy(req, res, next))
            } else {
              app.post(route.paths[0], (req, res, next) => proxy(req, res, next))
            }
            break
          case Constants.HTTP_GET:
            if (route.auth) {
              app.get(route.paths[0], Utils.checkJWT, (req, res, next) => proxy(req, res, next))
            } else {
              app.get(route.paths[0], (req, res, next) => proxy(req, res, next))
            }
            break
          case Constants.HTTP_PUT:
            if (route.auth) {
              app.put(route.paths[0], Utils.checkJWT, (req, res, next) => proxy(req, res, next))
            } else {
              app.put(route.paths[0], (req, res, next) => proxy(req, res, next))
            }
            break
          case Constants.HTTP_DELETE:
            if (route.auth) {
              app.delete(route.paths[0], Utils.checkJWT, (req, res, next) => proxy(req, res, next))
            } else {
              app.delete(route.paths[0], (req, res, next) => proxy(req, res, next))
            }
            break
          case Constants.HTTP_HEAD:
            if (route.auth) {
              app.head(route.paths[0], Utils.checkJWT, (req, res, next) => proxy(req, res, next))
            } else {
              app.head(route.paths[0], (req, res, next) => proxy(req, res, next))
            }
            break
          case Constants.HTTP_PATCH:
            if (route.auth) {
              app.patch(route.paths[0], Utils.checkJWT, (req, res, next) => proxy(req, res, next))
            } else {
              app.patch(route.paths[0], (req, res, next) => proxy(req, res, next))
            }
            break
          default:
            console.error(
              `mid_api_gateway/api_proxy.js/build/Error - \nERROR: HTTP Method '${route.methods[0]}' not tracked!\n`
            )
        }
      })
    })

    return app
  }
}
export default Proxy

export default {
  port: process.env.PORT || 8000,
  jwtSecret: process.env.JWT_SECRET || '1kZDnw8==jh',
  mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/myapp',
  apiDoc: process.env.API_DOC_ENV || 'dev',
  windowMs: 1000,
  limit: 10
}

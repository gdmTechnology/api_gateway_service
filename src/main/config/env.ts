export default {
  port: process.env.PORT || 8000,
  jwtSecret: process.env.JWT_SECRET || '1kZDnw8==jh',
  apiDoc: process.env.API_DOC_ENV || 'dev',
  windowMs: 1000,
  limit: 10
}

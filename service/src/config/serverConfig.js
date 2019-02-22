  module.exports = {
  SERVER_PORT: (process.env.PORT || 5000),
  DB_SERVER: (process.env.DB_SERVER || 'localhost'),
  DB_PORT: (process.env.DB_PORT || 27017),
  DB_SCHEMA: (process.env.DB_SCHEMA || 'hathsin'),
  DB_USER: (process.env.MONGO_USERNAME),
  DB_PASSWORD: (process.env.MONGO_PASSWORD),
  REQUEST_LOGGING: (process.env.REQUEST_LOGGING || 'false'),
  LOGGING_ENVIRONMENT: (process.env.LOGGING_ENVIRONMENT || 'dev'),
};

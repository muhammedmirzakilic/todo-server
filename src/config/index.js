module.exports = {
  port: process.env.PORT || 3000,
  db: {
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER || 'postgres',
    PASSWORD: process.env.DB_PASSWORD || 'postgres',
    DB: process.env.DB_NAME || 'todo',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  jwtSecret: process.env.JWT_SECRET || '!v3Ry_S3cR3T*',
  jwtMaxAge: process.env.JWT_MAX_AGE || 24 * 60 * 60,
};

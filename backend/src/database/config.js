const dbConfig = require('./db.vars.js');

const connectionData = {
  username: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  dialectOptions: {
    bigNumberStrings: true
  },
  pool: dbConfig.pool
}

module.exports = {
  development: {
    ...connectionData,
  },
  test: {
    ...connectionData,
  },
  production: {
    ...connectionData,
  }
}
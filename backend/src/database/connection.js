const { Sequelize } = require('sequelize');
const dbConfig = require('./db.vars');

const requiredConfig = ['user', 'password', 'database', 'host', 'port'];
const missingConfig = requiredConfig.filter(key => !dbConfig[key]);

if (missingConfig.length > 0) {
  throw new Error(
    `Las variables de entorno faltantes son: ${missingConfig.join(', ')}. `
  );
}

// Create Sequelize instance
const dbConnection = new Sequelize({
  database: dbConfig.database,
  username: dbConfig.user,
  password: dbConfig.password,
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect || 'mysql',
  pool: dbConfig.pool || {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: true
  }
});

module.exports = {
  dbConnection
};


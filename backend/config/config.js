// config/sequelize
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'payroll',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false
  }
};

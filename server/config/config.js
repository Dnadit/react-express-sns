require('dotenv').config();

module.exports = {
  "development": {
    "username": "nodejs",
    "password": process.env.SEQUELIZE_PASSWORD,
    "database": "react-express-sns",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "nodejs",
    "password": process.env.SEQUELIZE_PASSWORD,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "nodejs",
    "password": process.env.SEQUELIZE_PASSWORD,
    "database": "react-express-sns",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DATABASE_DEV_USERNAME,
    "password": process.env.DATABASE_DEV_PASSWORD,
    "database": process.env.DATABASE_DEV_DATABASE_NAME,
    "host": process.env.DATABASE_DEV_HOST,
    "port": process.env.DATABASE_DEV_PORT,
    "dialect": process.env.DATABASE_DEV_DIALECT
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
};

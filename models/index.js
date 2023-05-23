const { sequelize, startDatabaseConnection } = require("./connection")

const { Product } = require("./Product")

module.exports = {
  sequelize,
  startDatabaseConnection,
  Product,
}
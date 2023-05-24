const { sequelize, startDatabaseConnection } = require("./connection")

const { Product } = require("./Product")
const { Inventory } = require("./Inventory")

module.exports = {
  sequelize,
  startDatabaseConnection,
  Product,
  Inventory,
}
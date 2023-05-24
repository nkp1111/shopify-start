const { DataTypes } = require("sequelize")

const { sequelize } = require("./connection")
const { Product } = require("./Product")

const Inventory = sequelize.define("Inventory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  // inventory id 
  inventoryId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  // user id to whom the inventory belongs to
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
})


// creates one-to-many relationship between Inventory and Product
Inventory.hasMany(Product, {
  foreignKey: "inventoryId",
  as: "products"
})

Product.belongsTo(Inventory, {
  foreignKey: "inventoryId"
})

module.exports = { Inventory }
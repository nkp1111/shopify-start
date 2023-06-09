const { DataTypes } = require("sequelize")

const { sequelize } = require("./connection")

const Product = sequelize.define("Product", {
  // id unique id of item in database
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  // productId unique universal id(UUID)
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  // ipAddress user ip address
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // user browser information
  browser: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // title product name
  title: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  // description product description
  description: {
    type: DataTypes.STRING,
  },
  // status whether product is finalize or not
  status: {
    type: DataTypes.STRING,
    defaultValue: "draft",
    validate: {
      isIn: [["draft", "active"]]
    }
  },
  // inventory the product belongs to
  inventoryId: {
    type: DataTypes.INTEGER
  },
  // tags to filter product
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  //category of product
  category: {
    type: DataTypes.STRING
  },
  // cost price of product
  costPrice: {
    type: DataTypes.FLOAT
  },
  // selling price of product 
  sellPrice: {
    type: DataTypes.FLOAT
  },
  // quantity of product
  quantity: {
    type: DataTypes.INTEGER
  }
});

module.exports = { Product }
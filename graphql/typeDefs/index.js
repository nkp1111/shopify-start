const { gql } = require("apollo-server-express")

const typeDefs = gql`
  scalar Date

  "product item"
  type Product {
    id: Int!
    productId: String!
    ipAddress: String!
    browser: String!
    title: String!
    description: String
    status: String
    inventoryId: String!
    tags: [String]
    category: String
    costPrice: Float
    sellPrice: Float
    quantity: Int
    createdAt: Date
    updatedAt: Date
  }

  "inventory belongs to user, store products"
  type Inventory {
    id: Int!
    inventoryId: String!
    userId: Int!
    products: [Product]
  }

  type Query {
    "Returns all products in database"
    getAllProducts: [Product]

    "Returns user inventory"
    getInventory(userId:String!): Inventory
  }

  type Mutation {
    """
    Creates new product and store it into database
    @params
     - ipAddress - (string) required - ip address of user
     - browser - (string) required - browser information of user
     - title - (string) required - title of the product
     - description - (string) - description of the product
     - status - (string) - current status of product
     - tags - (string) - identity mark for filtering product; tag separated by comma
     - category - (string) - product category
     - costPrice - (float) - cost price of product
     - sellPrice - (float) - selling price of product
     - quantity - (integer) - total number of product
     - userId - (string) - unique user identifier to set product creator
    """
    createNewProduct(ipAddress: String!, browser: String!, title: String!, description: String, status: String, tags: String, category: String, costPrice: Float, sellPrice: Float, quantity: Int, userId: String): ProductOutput
  }

  type ProductOutput {
    "returns error/success message and Product object"
    error: String
    success: String
    product: Product
  }
`

module.exports = { typeDefs }
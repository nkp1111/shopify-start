const { gql } = require("apollo-server-express")

const typeDefs = gql`
  type Product {
    id: Int!
    productId: String!
    ipAddress: String!
    browser: String!
    title: String!
    description: String
    status: String
    tags: [String]
  }

  type Query {
    "Returns all products in database"
    getAllProducts: [Product]
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
     - tags - ([string]) - identity mark for filtering product
    """
    createNewProduct(ipAddress: String!, browser: String!, title: String!, description: String, status: String, tags: [String]): ProductOutput
  }

  type ProductOutput {
    error: String
    success: String
    product: Product
  }
`

module.exports = { typeDefs }
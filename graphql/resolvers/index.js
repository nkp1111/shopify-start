const { v4: uuidV4 } = require("uuid")
const { GraphQLScalarType } = require("graphql")
const { Kind } = require("graphql/language")

const { Product, Inventory } = require("../../models")


const resolvers = {
  Query: {
    /**
     * @desc returns all products from database
     */
    getAllProducts: async () => {
      try {
        // returns all the products in database
        return await Product.findAll()
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * @desc return user inventory with products
     */
    getInventory: async (_, args) => {
      const { userId } = args
      try {
        return await Inventory.findOne({ where: { userId }, include: "products" })
      } catch (error) {
        console.log(error)
      }
    }
  },

  Mutation: {
    /**
     * @desc create new product in database
     * @param {ipAddress,browser,title,description,status,tags,category,costPrice, sellPrice, quantity} args 
     * args values are all strings
     * @returns {Product, success, error}
     */
    createNewProduct: async (_, args, context, info) => {
      const { ipAddress, browser,
        title, description, status, tags, category,
        costPrice, sellPrice, quantity,
        userId } = args

      try {

        // product status can be active or draft stage
        if (!["draft", "active"].includes(status)) {
          return { error: "Status can only be 'draft' or 'active'" }
        }

        // tags are uploaded as string separated by comma
        // e.g. first,second
        let allTags = []
        if (tags) {
          allTags = tags.split(",")
        }

        // check for user inventory
        let userInventory = await Inventory.findOne({ where: { userId }, include: "products" })
        if (!userInventory) {
          // create new inventory for storing product if inventory not found
          userInventory = await Inventory.create({
            inventoryId: uuidV4(),
            userId,
            products: []
          }, { include: "products" })
        }

        // create a new product
        const product = await Product.create({
          // sets productId a new uuid value
          productId: uuidV4(),
          ipAddress,
          browser,
          title,
          description,
          tags: allTags,
          status,
          category,
          costPrice,
          sellPrice,
          quantity,
          inventoryId: userInventory.id
        })

        // update user inventory with newly created product
        if (userInventory.products?.length > 0) {
          userInventory.products.push(product)
        } else {
          userInventory.products = [product]
        }
        await userInventory.save()

        // return product with success message
        return { product, success: "New product created" }
      } catch (error) {
        console.log(error)
      }
    }
  },

  /**
   * @desc New Scalar DataType Date defined for graphql
   */
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value) // value from the client
    },
    serialize(value) {
      return value.getTime() // value sent to the client
    },
    parseLiteral(value) {
      if (value.kind === Kind.INT) {
        return new Date(value.value) //  value is always in string format
      }
      return null
    },
  }),
}

module.exports = { resolvers }
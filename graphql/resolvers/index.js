const { v4: uuidV4 } = require("uuid")

const { Product } = require("../../models")


const resolvers = {

  Query: {
    getAllProducts: async () => {
      try {
        return await Product.findAll()
      } catch (error) {
        console.log(error)
      }
    }
  },

  Mutation: {
    createNewProduct: async (_, args, context, info) => {
      const { ipAddress, browser,
        title, description, status, tags } = args

      try {

        if (!["draft", "active"].includes(status)) {
          return { error: "Status can only be 'draft' or 'active'" }
        }

        let allTags = []
        if (tags) {
          allTags = tags.split(",")
        }

        const product = await Product.create({
          productId: uuidV4(),
          ipAddress,
          browser,
          title,
          description,
          tags: allTags,
          status,
        })

        return { product, success: "New product created" }
      } catch (error) {
        console.log(error)
      }
    }
  }
}

module.exports = { resolvers }
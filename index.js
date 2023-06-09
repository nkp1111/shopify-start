const express = require("express")
const cors = require("cors")
const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@apollo/server/express4")

const { typeDefs, resolvers } = require("./graphql")
const { sequelize, startDatabaseConnection } = require("./models")
const { productRoutes } = require("./router")

require("dotenv").config()

const app = express()

const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * @desc Create and start new apollo server
 * set endpoint for app
 */
const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  await server.start()

  // use expressMiddleware on graphql server route
  app.use("/graphql", expressMiddleware(server))

  // listen on product route
  app.use("/product", productRoutes)

  app.get("/", (req, res) => {
    res.send("Shopify -Product page")
  })

  app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}/`)
    console.log(`Graphql server listening on url http://localhost:${port}/graphql/`)
  })
}

/**
 * @desc Calls startDatabaseConnection to start database connection
 * and Starts ApolloServer
 */
startDatabaseConnection().then(async () => {
  await sequelize.sync()

  startApolloServer().catch(err => {
    console.log("Error while starting the server")
    console.log(err)
  })
})

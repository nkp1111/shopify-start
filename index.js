const express = require("express")
const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@apollo/server/express4")

const { typeDefs, resolvers } = require("./graphql")
const { sequelize, startDatabaseConnection } = require("./models")

require("dotenv").config()
const app = express()

const port = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  await server.start()

  app.use("/graphql", expressMiddleware(server))

  app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}/`)
    console.log(`Graphql server listening on url http://localhost:${port}/graphql/`)
  })
}


startDatabaseConnection().then(async () => {
  await sequelize.sync()

  startApolloServer().catch(err => {
    console.log("Error while starting the server")
    console.log(err)
  })
})

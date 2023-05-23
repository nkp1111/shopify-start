const express = require("express")
const axios = require("axios")
require("dotenv").config()

const router = express.Router()

const graphql_url = process.env.GRAPHQL_URL

router.post("/", async (req, res) => {
  try {
    const response = await axios.post(graphql_url, {
      query: `
        query {
          getAllProducts {
            id,
            productId,
            ipAddress,
            browser,
            title,
            description,
            status,
            tags
          }
        }
      `
    })
    // Extract the data from the GraphQL response
    const data = response.data.data
    // Send the data as the response
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
})


router.post("/new", async (req, res) => {
  const ipAddress = req.ip
  const browser = req.get('User-Agent')
  const { title, description, tags, status } = req.body

  try {
    const response = await axios.post(graphql_url, {
      query: `
        mutation {
          createNewProduct(
            ipAddress: "${ipAddress}", 
            browser: "${browser}", 
            title: "${title}", 
            description: "${description}", 
            status: "${status}",
            tags: "${tags}"
          ) {
            error,
            success,
            product {
              id,
              productId,
              ipAddress,
              browser,
              title,
              description,
              status,
              tags
            }
          }
        }
      `
    })
    // Extract the data from the GraphQL response
    const data = response.data.data
    // Send the data as the response
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
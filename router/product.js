const express = require("express")
const axios = require("axios")
require("dotenv").config()

const router = express.Router()

const graphql_url = process.env.GRAPHQL_URL


/**
 * @method POST /product/
 * @desc Makes a post request to get all products from graphql server
 * @returns [Product], array of product items
 */
router.post("/", async (req, res) => {
  try {
    const response = await axios.post(graphql_url, {
      // graphql query to get all products
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
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-apollo-operation-name': 'GET_ALL'
      }
    })
    // Extract the data from the GraphQL response
    const data = response.data.data
    // Send the data as the response
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
})


/**
 * @method POST /product/new/
 * @desc Makes a post request to create new product
 * @returns {error, success, product}
 */
router.post("/new", async (req, res) => {
  const ipAddress = req.ip
  const browser = req.get('User-Agent')
  const { title, description, tags, status } = req.body

  try {
    const response = await axios.post(graphql_url, {
      // graphql query to create new product
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
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-apollo-operation-name': "CREATE_NEW"
      }
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
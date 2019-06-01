require('dotenv').config({ path: process.env.DOTENV_PATH })
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const { logger } = require('../lib/logger')

const PROTO_PATH = `${__dirname}/../../discount.proto`

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
)

grpc.loadPackageDefinition(packageDefinition)

const port = process.env.PORT || 5678

const server = new grpc.Server()
server.bind(`127.0.0.1:${port}`, grpc.ServerCredentials.createInsecure())
logger.info(`Server running at http://127.0.0.1:${port}`)
server.start()

module.exports = server

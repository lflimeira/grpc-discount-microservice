require('dotenv').config({ path: process.env.DOTENV_PATH })
const protoLoader = require('@grpc/proto-loader')
const grpc = require('grpc')

const database = require('../database')
const { logger } = require('../lib/logger')
const userController = require('../controllers/user')
const discoutController = require('../controllers/discount')

const PROTO_PATH = `${__dirname}/../proto/discount.proto`
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
}
const protoDefinition = protoLoader.loadSync(PROTO_PATH, options)
const { discount } = grpc.loadPackageDefinition(protoDefinition)
const port = process.env.PORT || 5678
const server = new grpc.Server()

server.addService(discount.UserService.service, {
  list: userController.list,
  get: userController.get,
  getDiscount: discoutController.getDiscount,
})
server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure())


const bootstrap = () => {
  try {
    return database.bootstrap()
  } catch (err) {
    logger.error('Error bootstraping application', {
      stack: err.stack,
    })
    return err.message
  }
}

if (process.env.NODE_ENV !== 'test') {
  bootstrap()
}

server.start()
logger.info(`Server running at http://0.0.0.0:${port}`, {
  port,
  nodeEnv: process.env.NODE_ENV,
})

module.exports = server

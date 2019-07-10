const { logger } = require('../lib/logger')
const { UserError } = require('../helpers/errors')
const database = require('../database')

const list = async () => {
  try {
    const users = await database.Users.findAll()

    logger.info('User listed with success.')

    const userList = {
      users: users.map((user) => {
        const {
          id,
          first_name,
          last_name,
          date_of_birth,
        } = user

        return {
          id,
          first_name,
          last_name,
          date_of_birth: date_of_birth.toISOString().slice(0, 10),
        }
      }),
    }

    return userList
  } catch (error) {
    logger.error(error.message)
    throw new UserError('Error listing user')
  }
}

const get = async (searchID) => {
  try {
    const user = await database.Users.findOne({
      where: {
        id: searchID,
      },
    })

    if (user === null || user === undefined) {
      throw new UserError('User not found')
    }

    logger.info('User found with success.')

    const {
      id,
      first_name,
      last_name,
      date_of_birth,
    } = user

    return {
      id,
      first_name,
      last_name,
      date_of_birth: date_of_birth.toISOString().slice(0, 10),
    }
  } catch (error) {
    logger.error(error.message)
    throw new UserError('Error getting user')
  }
}

module.exports = {
  list: async (_, callback) => {
    try {
      const users = await list()
      callback(null, users)
      return users
    } catch (error) {
      callback({
        code: error.code,
        message: error.message,
      })
      return error
    }
  },
  get: async (params, callback) => {
    try {
      const user = await get(params.request.id)
      callback(null, user)
      return user
    } catch (error) {
      callback({
        code: error.code,
        message: error.message,
      })
      return error
    }
  },
}

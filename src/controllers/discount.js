const moment = require('moment')

const { logger } = require('../lib/logger')
const { UserError } = require('../helpers/errors')
const database = require('../database')

const getDiscount = async (searchID) => {
  try {
    const user = await database.Users.findOne({
      where: {
        id: searchID,
      },
    })

    if (user === null || user === undefined) {
      throw new UserError('User not found')
    }

    const today = moment()
    const birthday = user.date_of_birth
    let discount = 0

    if (birthday.getDate() === today.date()
      && birthday.getMonth() === today.month()) {
      discount = 5
    }

    if (today.date() === 25 && today.month() === 10) {
      discount = 10
    }

    logger.info(`There's a discount of ${discount} available to the client ${user.id}`)

    return { percent: discount }
  } catch (error) {
    logger.error(error.message)
    throw new UserError('Error getting discount')
  }
}

module.exports = {
  getDiscount: async (params, callback) => {
    try {
      const discount = await getDiscount(params.request.id)
      callback(null, discount)
      return discount
    } catch (error) {
      callback({
        code: error.code,
        message: error.message,
      })
      return error
    }
  },
}

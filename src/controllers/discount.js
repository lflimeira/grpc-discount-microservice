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

    const birthday = new Date(user.date_of_birth)
    const today = new Date()
    let discount = 0

    if (birthday.getDate() === today.getDate()
      && birthday.getMonth() === today.getMonth()) {
      discount = 5
    }

    if (today.getDate() === 25 && today.getMonth() === 10) {
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

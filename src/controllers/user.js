const { logger } = require('../lib/logger')
const { UserError } = require('../helpers/errors')
const database = require('../database')

const createUser = async (req, res, next) => {
  const { first_name, last_name, date_of_birth } = req.body

  try {
    const userCreate = await database.Users.create({
      first_name,
      last_name,
      date_of_birth,
    })

    res.locals.payload = {
      type: 'response',
      data: {
        id: userCreate.id,
        first_name: userCreate.first_name,
        last_name: userCreate.last_name,
        date_of_birth: userCreate.date_of_birth,
        message: 'User created with success.',
        status: 'user_created',
      },
    }

    logger.info('User created with success.', res.locals.payload)
    return next()
  } catch (error) {
    logger.error(error.message)
    return next(new UserError('Error creating user'))
  }
}

module.exports = {
  createUser,
}

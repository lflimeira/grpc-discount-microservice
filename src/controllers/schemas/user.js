const Joi = require('joi')

const user = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    date_of_birth: Joi.date().required(),
  }),
}

module.exports = {
  user,
}

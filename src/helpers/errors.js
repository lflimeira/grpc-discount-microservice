class UserError extends Error {
  constructor (message, code = 13) {
    super(message)

    this.name = 'UserError'
    this.type = 'user'
    this.code = code
  }
}

class RouteNotFoundError extends Error {
  constructor (message, statusCode = 404) {
    super(message)

    this.name = 'RouteNotFoundError'
    this.type = 'not_found'
    this.statusCode = statusCode
  }
}

class ValidationError extends Error {
  constructor (message, fields = [], statusCode = 400) {
    super(message)

    this.name = 'ValidationError'
    this.type = 'validation'
    this.fields = fields
    this.statusCode = statusCode
  }
}

module.exports = {
  UserError,
  RouteNotFoundError,
  ValidationError,
}

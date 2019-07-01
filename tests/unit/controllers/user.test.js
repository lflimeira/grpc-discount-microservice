const userController = require('../../../src/controllers/user')
const database = require('../../../src/database')
const { UserError } = require('../../../src/helpers/errors')

jest.mock('../../../src/database', () => ({
  Users: {
    findAll: jest.fn(),
  },
}))

describe('User', () => {
  beforeEach(() => {
    database.Users.findAll.mockReset()
  })

  describe('List function', () => {
    const usersMock = {
      users: [{
        id: 1,
        first_name: 'Ash',
        last_name: 'Ketchium',
        date_of_birth: '1995-04-01',
      }],
    }
    it('should return a user', async () => {
      database.Users.findAll.mockReturnValueOnce(Promise.resolve([{
        id: 1,
        first_name: 'Ash',
        last_name: 'Ketchium',
        date_of_birth: new Date('1995-04-01'),
      }]))

      const users = await userController.list(null, jest.fn())
      expect(users).toEqual(usersMock)
      expect(database.Users.findAll).toBeCalledTimes(1)
    })

    it('should return an error', async () => {
      database.Users.findAll.mockImplementation(() => {
        throw new Error('Database error')
      })

      const error = await userController.list(null, jest.fn())

      expect(error).toEqual(new UserError('Error listing user'))
      expect(database.Users.findAll).toBeCalledTimes(1)
    })
  })
})

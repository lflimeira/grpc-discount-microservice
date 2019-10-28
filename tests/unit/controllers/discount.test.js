const discountController = require('../../../src/controllers/discount')
const database = require('../../../src/database')
const { UserError } = require('../../../src/helpers/errors')

jest.mock('../../../src/database', () => ({
  Users: {
    findOne: jest.fn(),
  },
}))

const userMock = {
  id: 1,
  first_name: 'Ash',
  last_name: 'Ketchium',
  date_of_birth: new Date('1995/04/10'),
}

describe('Discount', () => {
  describe('List function', () => {
    afterEach(() => {
      database.Users.findOne.mockReset()
    })

    it('should return a 5 percent of discount when it\'s users birthday', async () => {
      database.Users.findOne.mockReturnValueOnce(Promise.resolve(userMock))

      jest.spyOn(Date, 'now').mockReturnValueOnce(new Date('2019/04/10').getTime())

      const params = {
        request: {
          id: 1,
        },
      }

      const discount = await discountController.getDiscount(params, jest.fn())

      expect(discount).toEqual({ percent: 5 })
      expect(database.Users.findOne).toBeCalledTimes(1)
    })

    it('should return a 10 percent of discount if it\'s Black Friday', async () => {
      database.Users.findOne.mockReturnValueOnce(Promise.resolve(userMock))

      jest.spyOn(Date, 'now').mockReturnValueOnce(new Date('2019/11/25').getTime())

      const params = {
        request: {
          id: 1,
        },
      }

      const discount = await discountController.getDiscount(params, jest.fn())

      expect(discount).toEqual({ percent: 10 })
      expect(database.Users.findOne).toBeCalledTimes(1)
    })

    it('should return an error', async () => {
      database.Users.findOne.mockImplementation(() => {
        throw new Error('Database error')
      })

      const params = {
        request: {
          id: 1,
        },
      }

      const discount = await discountController.getDiscount(params, jest.fn())

      expect(discount).toEqual(new UserError('Error getting discount'))
      expect(database.Users.findOne).toBeCalledTimes(1)
    })
  })
})

const database = require('../../../src/database')

const {
  bootstrap,
  sequelize,
} = database

describe('Database', () => {
  describe('bootstrap', () => {
    describe('with valid data', () => {
      let success = true

      beforeAll(async () => {
        sequelize.authenticate = jest.fn()

        try {
          await bootstrap()
        } catch (err) {
          success = false
        }
      })

      afterAll(async () => {
        await database.sequelize.close()
      })

      test('should succeed', () => {
        expect(success).toBe(true)
      })
    })
  })
})

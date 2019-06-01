const server = require('../../src/bin/server')

describe('Server', () => {
  describe('Server operation', () => {
    it('should run successfully', () => {
      expect(server.started).toBe(true)
    })
  })
})

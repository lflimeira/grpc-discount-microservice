module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [{
      first_name: 'John',
      last_name: 'Doe',
      date_of_birth: new Date('1995-04-01'),
      created_at: new Date(),
      updated_at: new Date(),
    }], {}),
  down: queryInterface => queryInterface.bulkDelete('Person', null, {}),
}

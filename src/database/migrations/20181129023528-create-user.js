const tableName = 'Users'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => queryInterface.createTable(tableName, {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        first_name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        last_name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        date_of_birth: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      }))
      .then(() =>
        queryInterface.addIndex(tableName, ['first_name'], {
          fields: ['first_name'],
          unique: false,
        }))
      .then(() =>
        queryInterface.addIndex(tableName, ['last_name'], {
          fields: ['last_name'],
          unique: false,
        }))
      .then(() =>
        queryInterface.addIndex(tableName, ['date_of_birth'], {
          fields: ['date_of_birth'],
          unique: false,
        })),

  down: queryInterface =>
    queryInterface.dropTable('Users'),
}

const modelName = 'Users'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(modelName, {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    underscored: true,
    indexes: [
      {
        fields: ['id'],
      },
      {
        fields: ['first_name'],
      },
      {
        fields: ['last_name'],
      },
      {
        fields: ['date_of_birth'],
      },
    ],
  })

  return User
}

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  });

  return Todo;
};

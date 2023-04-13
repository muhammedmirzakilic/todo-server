const config = require('../config');
const dbConfig = config.db;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
  operatorsAliases: 0,
});

const repository = {};

repository.Sequelize = Sequelize;
repository.sequelize = sequelize;

repository.users = require('./models/user.model')(sequelize, Sequelize);
repository.todos = require('./models/todo.model')(sequelize, Sequelize);

module.exports = repository;

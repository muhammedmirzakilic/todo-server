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

module.exports = repository;

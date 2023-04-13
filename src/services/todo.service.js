const repository = require('../repository');
const Todo = repository.todos;
const {
  errors: { CustomError, ...errors },
} = require('../constants');

const createTodo = async (userId, title) => {
  return Todo.create({
    title,
    userId,
  });
};

module.exports = {
  createTodo,
};

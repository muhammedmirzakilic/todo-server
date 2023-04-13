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

const toggleTodo = async (userId, id, isCompleted) => {
  const todo = await Todo.findByPk(id);
  if (!todo || todo.userId !== userId) {
    throw new CustomError(errors.todoNotFound);
  }
  todo.isCompleted = isCompleted;
  return todo.save();
};

module.exports = {
  createTodo,
  toggleTodo,
};

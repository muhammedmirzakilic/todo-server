const createTodoValidator = require('./createTodo.validator');
const markTodoCompletedValidator = require('./markTodoCompleted.validator');
const markTodoUncompletedValidator = require('./markTodoUncompleted.validator');

module.exports = {
  createTodoValidator,
  markTodoCompletedValidator,
  markTodoUncompletedValidator,
};

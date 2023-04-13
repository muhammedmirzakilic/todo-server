const express = require('express');
const router = express.Router();
const { todoService } = require('../services');
const {
  validators: {
    validate,
    todoValidators: {
      createTodoValidator,
      markTodoCompletedValidator,
      markTodoUncompletedValidator,
      deleteTodoValidator,
    },
  },
  verifyToken,
} = require('../middlewares');

router.put('/', verifyToken, validate(createTodoValidator.validate), async (req, res, next) => {
  const { title } = req.body;
  const todo = await todoService.createTodo(req.userId, title);
  res.status(201).json({
    todo,
  });
});

router.post(
  '/markCompleted/:id',
  verifyToken,
  validate(markTodoCompletedValidator.validate),
  async (req, res, next) => {
    const { id } = req.params;
    const todo = await todoService.toggleTodo(req.userId, id, true);
    res.status(200).json({
      todo,
    });
  },
);

router.post(
  '/markUncompleted/:id',
  verifyToken,
  validate(markTodoUncompletedValidator.validate),
  async (req, res, next) => {
    const { id } = req.params;
    const todo = await todoService.toggleTodo(req.userId, id, false);
    res.status(200).json({
      todo,
    });
  },
);

router.delete('/:id', verifyToken, validate(deleteTodoValidator.validate), async (req, res, next) => {
  const { id } = req.params;
  await todoService.deleteTodo(req.userId, id);
  res.sendStatus(200);
});

router.get('/list', verifyToken, async (req, res, next) => {
  const todos = await todoService.listTodos(req.userId);
  res.json({ todos });
});

module.exports = router;

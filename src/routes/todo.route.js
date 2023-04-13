const express = require('express');
const router = express.Router();
const { todoService } = require('../services');
const {
  validators: {
    validate,
    todoValidators: { createTodoValidator, markTodoCompletedValidator, markTodoUncompletedValidator },
  },
  verifyToken,
} = require('../middlewares');

router.post('/create', verifyToken, validate(createTodoValidator.validate), async (req, res, next) => {
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
    res.status(201).json({
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
    res.status(201).json({
      todo,
    });
  },
);

module.exports = router;

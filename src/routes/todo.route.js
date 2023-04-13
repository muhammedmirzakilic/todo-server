const express = require('express');
const router = express.Router();
const { todoService } = require('../services');
const {
  validators: {
    validate,
    todoValidators: { createTodoValidator },
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

module.exports = router;

const express = require("express");
const router = express.Router();

const Todo = require("../models/todo");

router.get("/todos", async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
});

router.post("/todo/new", (req, res) => {
  const todo = new Todo({
    task: req.body.task,
  });

  todo.save();
  res.json(todo);
});

router.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);

  res.json(result);
});

router.get("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.complete = !todo.complete;
  todo.save();

  res.json(todo);
});

module.exports = router;

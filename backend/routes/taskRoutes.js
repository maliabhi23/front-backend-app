const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// Create Task
router.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
 
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read Tasks
router.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Update Task
router.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Task
router.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted successfully" });
});

module.exports = router;

import express from "express";
import { tasks, getNextId } from "../data/tasks.js";
import { appError } from "../middlewares/errorHandler.js";
import { validateFields } from "../middlewares/validate.js";

const router = express.Router();

router.get("/", (req, res) => {
  const done = req.query.done;
  if (done !== undefined) {
    const isDone = done === "true";
    return res.json(tasks.filter((e) => e.done === isDone));
  }
  res.json(tasks);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const task = tasks.find((e) => e.id === Number(id));
  if (!task) return next(new appError(404, "Task not found"));
  res.status(200).json(task);
});

router.post("/", validateFields(["title", "userId"]), (req, res) => {
  const { title, userId } = req.body;
  const task = { id: getNextId(), title, done: false, userId };
  tasks.push(task);
  res.json(task);
});

router.put("/:id", (req, res, next) => {
  const task = tasks.find((e) => e.id === Number(req.params.id));
  if (!task) return next(new appError(404, "task not found"));
  else {
    const { title, done } = req.body;
    if (title !== undefined) task.title = title;
    if (done !== undefined) task.done = done;
    res.json(task);
  }
});

router.delete("/:id", (req, res, next) => {
  const taskIndex = tasks.findIndex((e) => e.id === Number(req.params.id));
  if (taskIndex === -1) return next(new appError(404, "task not found"));
  const deleted = tasks.splice(taskIndex, 1);
  res.json({ deleted: deleted[0] });
});

export default router;

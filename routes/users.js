import express from "express";
import { users, getNextId } from "../data/users.js";
import { tasks } from "../data/tasks.js";
import { appError } from "../middlewares/errorHandler.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(users);
});

router.get("/:id", (req, res, next) => {
  const user = users.find((e) => e.id === Number(req.params.id));
  if (!user) return next(new appError(404, "user not found"));
  res.json(user);
});

router.get("/:id/tasks", (req, res, next) => {
  const user = users.find((e) => e.id === Number(req.params.id));
  if (!user) return next(new appError(404, "user not found"));
  const userTasks = tasks.filter((e) => e.userId === Number(req.params.id));
  res.json(userTasks);
});

router.post("/", (req, res, next) => {
  const { name, email } = req.params;
  if (!name || !email)
    return next(new appError(400, "name and email required"));
  const user = { id: getNextId(), name, email };
  users.push(user);
});

export default router;

import express from "express";
import { users, getNextId } from "../data/users.js";
import {tasks} from "../data/tasks.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(users);
});

router.get("/:id", (req, res) => {
  const user = users.find((e) => e.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: "user not found" });
  res.json(user);
});

router.get("/:id/tasks", (req, res) => {
  const user = users.find((e) => e.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: "user not found" });
  const userTasks = tasks.filter((e) => e.userId === Number(req.params.id));
  res.json(userTasks);
});

router.post("/", (req, res) => {
  const { name, email } = req.params;
  if (!name || !email)
    return res.status(400).json({ error: "name and email required" });
  const user = { id: getNextId(), name, email };
  users.push(user);
});

export default router;

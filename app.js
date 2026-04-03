import express from "express";
import taskRoutes from "./routes/tasks.js";
import usersRoutes from "./routes/users.js";
import { appError } from "./middlewares/errorHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use("/app/tasks", taskRoutes);
app.use("/app/users", usersRoutes);

app.get("/", (_, res) => {
  res.redirect("/app");
});

app.get("/app", (req, res) => {
  res.json({ status: "ok" });
});

app.use((req, res, next) => {
  next(new appError(404, `Route ${req.url} not found`));
});

app.use(errorHandler);

export default app;

import express from "express";
import taskRoutes from "./routes/tasks.js";
import usersRoutes from "./routes/users.js";
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use("/tasks", taskRoutes);
app.use("/users", usersRoutes);
app.get('/',(_, res)=>{
  res.redirect('/health')
})
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static(path.join(__dirname,'../dist')))
app.use(cookieParser());
app.use(express.json());

import userRouter from "./routers/user.router.js";

app.use("/api/v1/users", userRouter);

import ExpenseRouter from "./routers/expense.router.js";

app.use("/api/v1/expense", ExpenseRouter);

import budgetRouter from "./routers/budget.router.js";
app.use("/api/v1/budget", budgetRouter);

//error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

export { app };

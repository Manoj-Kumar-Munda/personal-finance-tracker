import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addExpenses} from "../controllers/expense.controller.js";

const ExpenseRouter = express.Router();

ExpenseRouter.route("/add").post(verifyJWT, addExpenses);

export default ExpenseRouter;
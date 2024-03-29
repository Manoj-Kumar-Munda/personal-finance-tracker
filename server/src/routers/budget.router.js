import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addBudget,
  removeBudget,
  editBudget,
  getBudgetInfo,
  getBudgetExpenditureInfo,
} from "../controllers/budget.controller.js";

const budgetRouter = express.Router();

budgetRouter.route("/add-budget").post(verifyJWT, addBudget);
budgetRouter.route("/:id").delete(verifyJWT, removeBudget);
budgetRouter.route("/:id").get(verifyJWT, getBudgetInfo);
budgetRouter.route("/modify").patch(verifyJWT, editBudget);
budgetRouter.route("/:id/expenses").get(verifyJWT, getBudgetExpenditureInfo);

export default budgetRouter;

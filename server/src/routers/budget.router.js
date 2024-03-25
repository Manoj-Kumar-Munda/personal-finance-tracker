import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addBudget, removeBudget } from "../controllers/budget.controller.js";

const budgetRouter = express.Router();

budgetRouter.route("/add-budget").post(verifyJWT, addBudget);
budgetRouter.route("/delete-budget").delete(verifyJWT, removeBudget)

export default budgetRouter;
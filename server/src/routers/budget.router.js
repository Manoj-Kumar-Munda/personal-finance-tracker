import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addBudget } from "../controllers/budget.controller.js";

const budgetRouter = express.Router();

budgetRouter.route("/add-budget").post(verifyJWT, addBudget);

export default budgetRouter;
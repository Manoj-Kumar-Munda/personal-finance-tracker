import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addBudget, removeBudget, editBudget } from "../controllers/budget.controller.js";


const budgetRouter = express.Router();

budgetRouter.route("/add-budget").post(verifyJWT, addBudget);
budgetRouter.route("/:id").delete(verifyJWT, removeBudget)
budgetRouter.route("/modify").patch(verifyJWT, editBudget)

export default budgetRouter;
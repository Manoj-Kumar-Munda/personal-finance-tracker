import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addTransaction } from "../controllers/transaction.controller.js";

const TransRouter = express.Router();

TransRouter.route("/add").post(verifyJWT, addTransaction);

export default TransRouter;
import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = express.Router();

userRouter.route("/register").post(upload.single('avatar'), registerUser);
userRouter.route("/login").post(loginUser)

export default userRouter;
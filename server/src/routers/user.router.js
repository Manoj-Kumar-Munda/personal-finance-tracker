import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.route("/register").post(upload.single('avatar'), registerUser);
userRouter.route("/login").post(loginUser);

//protected routes
userRouter.route("/logout").post( verifyJWT ,logoutUser)

export default userRouter;
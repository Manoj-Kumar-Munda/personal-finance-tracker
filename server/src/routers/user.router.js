import express from "express";
import {
  changeAvatar,
  changeCurrentPassword,
  changeEmail,
  generateNewTokens,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.route("/register").post(upload.single("avatar"), registerUser);
userRouter.route("/login").post(loginUser);

userRouter.route("/refresh").post(generateNewTokens);

//protected routes
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/change-password").post(verifyJWT, changeCurrentPassword);
userRouter.route("/email").patch(verifyJWT, changeEmail);
userRouter.route("/avatar").post( upload.single("avatar"), verifyJWT, changeAvatar)


export default userRouter;

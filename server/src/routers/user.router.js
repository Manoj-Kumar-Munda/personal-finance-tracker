import express from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = express.Router();

userRouter.route("/register").post(upload.single('avatar'), registerUser);

userRouter.route("/me").get( (req,res) => {
    res.send("heelo ");
})

export default userRouter;
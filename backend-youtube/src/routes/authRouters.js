import express from "express";
import { extendToken, forgotPassword, login, loginFacebook, register, resetPassword } from "../controllers/authController.js";

const authRouter = express.Router();

// Đăng ký
authRouter.post("/register", register);

// Đăng nhập
authRouter.post("/login", login)

// forgot password
authRouter.post("/forgot-password", forgotPassword);

// reset password
authRouter.post("/reset-password", resetPassword);

// login facebook
authRouter.post("/login-facebook", loginFacebook);

authRouter.post("/extend-token", extendToken);
export default authRouter;

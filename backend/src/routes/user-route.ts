import { Router } from "express";
import * as authController from "../controllers/auth-controller.js";
import * as userController from "../controllers/user-controller.js";
import { authenticate } from "../middleware/auth-middleware.js";

const userRouter = Router();

userRouter.post("/register", authController.register);
userRouter.post("/login", authController.login);
userRouter.post("/logout", authController.logout);

userRouter.get("/me", authenticate, userController.me);
userRouter.get("/", authenticate, userController.list);

export { userRouter };

import { Hono } from "hono";
import * as userController from "../controllers/user.controller.ts";
import { authCheck } from "../utils/authCheck.ts";
import { verifyAuth } from "../middlewares/verifyAuth.ts";

const userRouter = new Hono();

userRouter.get("/check", authCheck);
userRouter.get("/info", verifyAuth, userController.getUserInfo);
userRouter.post("/signup", userController.createUser);
userRouter.post("/signin", userController.signInUser);
userRouter.post("/refresh", userController.refreshToken);
userRouter.post("/signout", verifyAuth, userController.signOutUser);
userRouter.put("/update", verifyAuth, userController.updateProfile);

export { userRouter };

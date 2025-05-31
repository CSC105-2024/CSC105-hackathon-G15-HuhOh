import { Hono } from "hono";
import { userRouter } from "./user.route.ts";
import { translationRouter } from "./translation.route.ts";

const mainRouter = new Hono();

mainRouter.route("/auth", userRouter);
mainRouter.route("/translations", translationRouter);

export { mainRouter };

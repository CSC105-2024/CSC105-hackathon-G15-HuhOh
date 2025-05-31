import { Hono } from "hono";
import { translate } from "../utils/translation.ts";

const translationRouter = new Hono();
translationRouter.route("/", translate);
export { translationRouter };

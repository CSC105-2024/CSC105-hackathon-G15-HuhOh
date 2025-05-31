import { Hono } from "hono";
import * as translationController from "../controllers/translation.controller.ts";
import { verifyAuth } from "../middlewares/verifyAuth.ts";

const translationRouter = new Hono();

translationRouter.use(verifyAuth);

translationRouter.get("/all", translationController.getAllTranslationsByUser);
translationRouter.get(
  "/saved",
  translationController.getAllSavedTranslationsByUser,
);
translationRouter.get("/trending", translationController.getTrendingSlang);
translationRouter.get("/slang/all", translationController.getAllSlangTerms);
translationRouter.get("/slang/:id", translationController.getSlangTermById);
translationRouter.post("/ZtoEN", translationController.createZtoENTranslation);
translationRouter.post("/ENtoZ", translationController.createEnToZTranslation);
translationRouter.post("/save/:id", translationController.saveTranslation);
translationRouter.delete(
  "/delete/:id",
  translationController.deleteTranslation,
);

export { translationRouter };

import type { Context } from "hono";
import * as translationModel from "../models/translation.model.ts";
import type { CreateTranslationBody } from "../types/index.ts";
import { generateTranslation } from "../middlewares/generateTranslation.ts";

const createTranslation = async (c: Context) => {
  try {
    const userId = c.get("userId");

    console.log("userId", userId);

    if (!userId) {
      return c.json({ error: "User not authenticated" }, 401);
    }

    const response = await generateTranslation(c);
    console.log("response", response);
    const { output } = await response.json();

    if (!output) {
      throw new Error("Failed to get translation");
    }

    if (!output.slang || output.slang.length === 0) {
      return c.json({ error: "No slang terms found in the input text" }, 400);
    }

    const translationData: CreateTranslationBody = {
      original: output.original,
      translated: output.translated,
      userId,
    };

    const translation = await translationModel.createTranslation(
      translationData,
      output.slang
    );

    return c.json(translation, 201);
  } catch (error) {
    console.error("Translation creation error:", error);
    return c.json(
      {
        error: "Failed to create translation",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
};

const saveTranslation = async (c: Context) => {
  try {
    const userId = c.get("userId");
    const translationId = c.req.param("id");

    if (!translationId) {
      return c.json({ error: "Translation ID is required" }, 400);
    }

    const savedTranslation = await translationModel.saveTranslation(
      translationId,
      userId
    );

    return c.json(savedTranslation, 201);
  } catch (error) {
    console.error("Translation save error:", error);
    return c.json({ error: "Failed to save translation" }, 500);
  }
};

const deleteTranslation = async (c: Context) => {
  try {
    const translationId = c.req.param("id");

    if (!translationId) {
      return c.json({ error: "Translation ID is required" }, 400);
    }

    const deletedTranslation = await translationModel.deleteTranslation(
      translationId
    );
    return c.json(deletedTranslation, 200);
  } catch (error) {
    console.error("Translation delete error:", error);
    return c.json({ error: "Failed to delete translation" }, 500);
  }
};

const getTrendingSlang = async (c: Context) => {
  const trendingSlang = await translationModel.getTrendingSlang();
  return c.json(trendingSlang, 200);
};

export {
  createTranslation,
  saveTranslation,
  deleteTranslation,
  getTrendingSlang,
};

import type { Context } from "hono";
import * as translationModel from "../models/translation.model.ts";
import type { CreateTranslationBody } from "../types/index.ts";
import {
  generateEntoZTranslation,
  generateZtoENTranslation,
} from "../middlewares/generateTranslation.ts";

const createZtoENTranslation = async (c: Context) => {
  try {
    const userId = c.get("userId");

    if (!userId) {
      return c.json({ error: "User not authenticated" }, 401);
    }

    const response = await generateZtoENTranslation(c);
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

    const translation = await translationModel.createZtoENTranslation(
      translationData,
      output.slang,
    );

    return c.json(translation, 201);
  } catch (error) {
    console.error("Translation creation error:", error);
    return c.json(
      {
        error: "Failed to create translation",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      500,
    );
  }
};

const createEnToZTranslation = async (c: Context) => {
  try {
    const userId = c.get("userId");

    if (!userId) {
      return c.json({ error: "User not authenticated" }, 401);
    }

    const response = await generateEntoZTranslation(c);
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

    const translation = await translationModel.createZtoENTranslation(
      translationData,
      output.slang,
    );

    return c.json(translation, 201);
  } catch (error) {
    console.error("Translation creation error:", error);
    return c.json(
      {
        error: "Failed to create translation",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      500,
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
      userId,
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

    const deletedTranslation =
      await translationModel.deleteTranslation(translationId);
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

const getAllTranslationsByUser = async (c: Context) => {
  const userId = c.get("userId");
  const allTranslations =
    await translationModel.getAllTranslationsByUser(userId);
  return c.json(allTranslations, 200);
};

const getAllSavedTranslationsByUser = async (c: Context) => {
  const userId = c.get("userId");
  const allSavedTranslations =
    await translationModel.getAllSavedTranslationsByUser(userId);
  console.log(allSavedTranslations);
  return c.json(allSavedTranslations, 200);
};

const getSlangTermById = async (c: Context) => {
  const slangTermId = c.req.param("id");
  const slangTerm = await translationModel.getSlangTermById(slangTermId);
  if (!slangTerm) {
    return c.json({ error: "Slang term not found" }, 404);
  }
  return c.json(slangTerm, 200);
};

const getAllSlangTerms = async (c: Context) => {
  const slangTerms = await translationModel.getAllSlangTerms();
  return c.json(slangTerms, 200);
};

export {
  createZtoENTranslation,
  createEnToZTranslation,
  saveTranslation,
  deleteTranslation,
  getTrendingSlang,
  getAllTranslationsByUser,
  getAllSavedTranslationsByUser,
  getSlangTermById,
  getAllSlangTerms,
};

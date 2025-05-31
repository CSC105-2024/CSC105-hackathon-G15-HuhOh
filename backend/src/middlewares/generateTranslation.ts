import { GoogleGenAI } from "@google/genai";
import type { Context } from "hono";

const generateZtoENTranslation = async (c: Context) => {
  const formData = await c.req.formData();
  const input = formData.get("input") as string;

  const prompt = `
Rewrite the following slang-heavy sentence into plain English. Extract all slang words and provide their meanings.Also add example sentence for each slang word and their origin.

Respond in strict JSON like:
{
  "original": "...",
  "translated": "...",
  "slang": [
    { "term": "slang1", "meaning": "...", "example": "...", "origin": "..." },
    ...
  ],
}

Sentence: "${input}"

Only return JSON. No markdown or code block.
`;

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    const config = {
      responseMimeType: "application/json",
    };
    const model = "gemini-2.0-flash";
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ];
    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    const res = response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!res) {
      throw new Error("No text in model response");
    }

    const output = JSON.parse(res);
    return c.json({ output });
  } catch (err) {
    console.error("Gemini error:", err);
    return c.json(
      { error: "Failed to parse response from model", detail: err },
      500,
    );
  }
};

const generateEntoZTranslation = async (c: Context) => {
  const formData = await c.req.formData();
  const input = formData.get("input") as string;

  const prompt = `
Rewrite the following plain English sentence into natural Gen Z slang, prioritizing authenticity and modern usage (2023-2024). Avoid forced or outdated slang. Respond in strict JSON format with ONLY these keys: 'original', 'translated', and 'slang' (if slang is used).
{
  "original": "...",
  "translated": "...",
  "slang": [
    { "term": "slang1", "meaning": "...", "example": "...", "origin": "..." },
    ...
  ],
}

Sentence: "${input}"

Only return JSON. No markdown or code block. If no slang fits, return an empty 'slang' array.
`;

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    const config = {
      responseMimeType: "application/json",
    };
    const model = "gemini-2.0-flash";
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ];
    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    const res = response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!res) {
      throw new Error("No text in model response");
    }

    const output = JSON.parse(res);
    return c.json({ output });
  } catch (err) {
    console.error("Gemini error:", err);
    return c.json(
      { error: "Failed to parse response from model", detail: err },
      500,
    );
  }
};

export { generateZtoENTranslation, generateEntoZTranslation };

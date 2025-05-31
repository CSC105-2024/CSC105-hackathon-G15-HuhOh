import { Hono } from "hono";
import { GoogleGenAI } from "@google/genai";

interface SlangTerm {
  term: string;
  meaning: string;
}

interface TranslationResponse {
  original: string;
  translated: string;
  slang: SlangTerm[];
}

interface ErrorResponse {
  error: string;
  detail: unknown;
}

export const translate = new Hono();

translate.post("/", async (c) => {
  const { input } = await c.req.json();

  const prompt = `
Rewrite the following slang-heavy sentence into plain English. Extract all slang words and provide their meanings.

Respond in strict JSON like:
{
  "original": "...",
  "translated": "...",
  "slang": [
    { "term": "slang1", "meaning": "..." },
    ...
  ]
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
    return c.json(output);
  } catch (err) {
    console.error("Gemini error:", err);
    return c.json(
      { error: "Failed to parse response from model", detail: err },
      500
    );
  }
});

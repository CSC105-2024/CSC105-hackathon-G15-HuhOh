import { GoogleGenAI } from "@google/genai";
import type { Context } from "hono";

const generateTranslation = async (c: Context) => {
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
    // console.log(output);
    return c.json({ output });
  } catch (err) {
    console.error("Gemini error:", err);
    return c.json(
      { error: "Failed to parse response from model", detail: err },
      500,
    );
  }
};

export { generateTranslation };

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Appliance Guide API
  app.post("/api/gemini/guide", async (req, res) => {
    try {
      const { category, brand, model, appliance, guideType } = req.body;
      const isFault = guideType === 'fault';
      const prompt = `Act as an expert technician. Create a simplified 3-step ${isFault ? 'fault-fix guide' : 'usage guide'} for a domestic worker for a ${brand} ${model} ${appliance} (Category: ${category}). 
      ${isFault ? 'Focus on fixing one common problem safely.' : 'Focus on basic, safe operational steps.'}
      Keep it very simple, safe, and actionable. Use common household terms. Output as a JSON object with 'steps' as an array of 3 strings.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              steps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              }
            },
            required: ["steps"]
          }
        }
      });

      const rawText = response.text || "{\"steps\":[]}";
      // Standardize JSON extraction
      const cleanJson = rawText.replace(/```json|```/g, "").trim();
      let parsed;
      try {
        parsed = JSON.parse(cleanJson);
      } catch (parseError) {
        console.error("JSON Parse Error. Raw text:", rawText);
        parsed = { steps: ["Error parsing response. Please try again."] };
      }
      res.json(parsed);
    } catch (error: any) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error("Gemini Guide Error:", errorMsg);
      res.status(500).json({ error: "Failed to generate guide", message: errorMsg });
    }
  });

  // Translator API
  app.post("/api/gemini/translate", async (req, res) => {
    try {
      const { text, targetLanguage } = req.body;
      const prompt = `Translate the following text into ${targetLanguage}: "${text}". 
      Keep the tone helpful and respectful for a domestic worker context. Output only the translated text.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });

      const translatedText = response.text || "Translation failed.";
      res.json({ translatedText });
    } catch (error: any) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error("Gemini Translate Error:", errorMsg);
      res.status(500).json({ error: "Failed to translate", message: errorMsg });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

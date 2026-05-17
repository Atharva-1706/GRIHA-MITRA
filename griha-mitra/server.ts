import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
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

const app = express();
const PORT = 3000;

app.use(express.json());

// Export the app for serverless environments (like Vercel)
export default app;

async function startServer() {
  // API Route for Translation
  app.post("/api/translate", async (req, res) => {
    const { text, targetLanguage } = req.body;
    
    if (!text || !targetLanguage) {
      return res.status(400).json({ error: "Text and targetLanguage are required" });
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Translate the following text to ${targetLanguage}. Return ONLY the translated text.\n\nText: ${text}`,
        config: {
          temperature: 0.1,
        }
      });

      res.json({ translation: response.text });
    } catch (error) {
      console.error("Translation error:", error);
      res.status(500).json({ error: "Failed to translate" });
    }
  });

  // API Route for Appliance Help
  app.post("/api/appliance-help", async (req, res) => {
    const { category, brand, model, type } = req.body;
    
    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }

    const prompt = type === 'guide' 
      ? `Provide a simple, 3-step guide on how to operate a ${brand || ''} ${category} (Model: ${model || 'unknown'}). Use simple English suitable for someone with low technical literacy. Keep steps short and actionable.`
      : `Provide common faults and 2 simple solutions for a ${brand || ''} ${category} (Model: ${model || 'unknown'}). Use simple English suitable for someone with low technical literacy. Keep it practical.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          temperature: 0.2,
        }
      });

      res.json({ content: response.text });
    } catch (error) {
      console.error("Appliance help error:", error);
      res.status(500).json({ error: "Failed to get help" });
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

import { useState } from "react";
import { motion } from "motion/react";
import { Languages, Loader2, Send } from "lucide-react";

const LANGUAGES = ["Hindi", "Kannada", "Tamil", "Malayalam"];

export default function Translator() {
  const [text, setText] = useState("");
  const [targetLang, setTargetLang] = useState(LANGUAGES[0]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const translate = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const res = await fetch("/api/gemini/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLanguage: targetLang }),
      });
      const data = await res.json();
      setResult(data.translatedText || "");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-24">
      <header className="mb-6 bg-warning border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="brutal-header text-black italic">Translator</h2>
      </header>

      <div className="space-y-6">
        <div className="brutal-card p-4">
          <label className="block font-black uppercase text-xs mb-2">Translate into:</label>
          <div className="grid grid-cols-2 gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => setTargetLang(lang)}
                className={`p-3 border-2 border-black font-black uppercase text-sm ${
                  targetLang === lang ? 'bg-primary text-white' : 'bg-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type English text here..."
            className="w-full h-32 border-4 border-black p-4 font-black focus:outline-none focus:ring-0 resize-none bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          />
        </div>

        <button
          onClick={translate}
          disabled={!text || loading}
          className="brutal-btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Languages size={20} />}
          Get Translation
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="brutal-card p-6 bg-black text-white"
          >
            <h4 className="font-black uppercase text-xs mb-2 text-slate-400">Result ({targetLang}):</h4>
            <p className="text-xl font-black">{result}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

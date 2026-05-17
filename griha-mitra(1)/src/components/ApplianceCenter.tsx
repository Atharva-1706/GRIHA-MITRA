import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Snowflake, Flame, Eraser, ChevronLeft, Search, Loader2 } from "lucide-react";
import { Category } from "../types";

const CATEGORIES = [
  { id: 'Cooling', icon: Snowflake, color: 'bg-blue-100' },
  { id: 'Cooking', icon: Flame, color: 'bg-orange-100' },
  { id: 'Cleaning', icon: Eraser, color: 'bg-teal-100' },
];

const APPLIANCES: Record<Category, string[]> = {
  Cooling: ['Refrigerator', 'Air Conditioner', 'Cooler'],
  Cooking: ['Microwave', 'Induction Cooktop', 'Mixer Grinder', 'Electric Kettle'],
  Cleaning: ['Washing Machine', 'Vacuum Cleaner', 'Dishwasher', 'Steam Mop', 'Robotic Vacuum'],
};

export default function ApplianceCenter() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<Category | null>(null);
  const [appliance, setAppliance] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [guideType, setGuideType] = useState<'usage' | 'fault'>('usage');
  const [guide, setGuide] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGuide = async (type: 'usage' | 'fault' = guideType) => {
    setLoading(true);
    setError(null);
    setGuideType(type);
    try {
      const res = await fetch("/api/gemini/guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, brand, model, appliance, guideType: type }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch guide");
      }
      
      const data = await res.json();
      setGuide(data.steps || []);
      setStep(4);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-24">
      <header className="mb-6 flex items-center gap-4">
        {step > 1 && (
          <button 
            onClick={() => setStep(step - 1)}
            className="p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        <h2 className="brutal-header">Appliance Center</h2>
      </header>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 gap-4"
          >
            <p className="font-bold text-slate-600 mb-2">Select a category:</p>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setCategory(cat.id as Category); setStep(2); }}
                className={`brutal-card p-6 flex items-center gap-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all ${
                  category === cat.id ? 'bg-accent text-white' : 'bg-white'
                }`}
              >
                <cat.icon size={32} />
                <span className="text-xl font-black uppercase">{cat.id}</span>
              </button>
            ))}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-1 gap-4"
          >
            <p className="font-bold text-slate-600 mb-2">What is it?</p>
            {category && APPLIANCES[category].map((item) => (
              <button
                key={item}
                onClick={() => { setAppliance(item); setStep(3); }}
                className="brutal-card p-4 text-left font-bold uppercase hover:bg-slate-50"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-4"
          >
            <div className="brutal-card p-6 bg-slate-50 uppercase font-black mb-4">
              {category} / {appliance}
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block font-black mb-1 uppercase text-sm">Brand (e.g. Samsung)</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full border-4 border-black p-4 font-bold focus:outline-none focus:ring-0"
                  placeholder="Brand Name"
                />
              </div>
              <div>
                <label className="block font-black mb-1 uppercase text-sm">Model Number (optional)</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full border-4 border-black p-4 font-bold focus:outline-none focus:ring-0"
                  placeholder="Model Number"
                />
              </div>
              <button
                onClick={() => fetchGuide('usage')}
                disabled={!brand || loading}
                className="brutal-btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                Get AI Guide
              </button>
              {error && (
                <div className="brutal-card p-4 bg-red-50 border-red-500 text-red-600 font-bold text-sm">
                  {error}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="brutal-card p-6 bg-accent text-white">
              <h3 className="font-black uppercase text-xl mb-1">{brand} {appliance}</h3>
              <p className="text-xs font-bold opacity-80 uppercase">{model ? `Model: ${model}` : 'Generic Model'}</p>
            </div>

            <div className="flex border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <button
                onClick={() => fetchGuide('usage')}
                className={`flex-1 p-4 font-black uppercase text-sm border-r-4 border-black transition-colors ${
                  guideType === 'usage' ? 'bg-warning text-black' : 'bg-white'
                }`}
              >
                How to Use
              </button>
              <button
                onClick={() => fetchGuide('fault')}
                className={`flex-1 p-4 font-black uppercase text-sm transition-colors ${
                  guideType === 'fault' ? 'bg-warning text-black' : 'bg-white'
                }`}
              >
                Fault Fix
              </button>
            </div>

            {loading ? (
              <div className="brutal-card p-12 flex flex-col items-center justify-center bg-white gap-4">
                <Loader2 className="animate-spin text-accent" size={40} />
                <p className="font-black uppercase text-sm animate-pulse">Consulting Gemini AI...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {guide.map((stepText, i) => (
                  <div key={i} className="brutal-card p-6 flex gap-4 bg-white">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-black bg-warning">
                      {i + 1}
                    </div>
                    <p className="font-bold leading-tight">{stepText}</p>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => { setStep(1); setGuide([]); setGuideType('usage'); }}
              className="brutal-btn w-full font-black uppercase bg-slate-100"
            >
              Start New Search
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

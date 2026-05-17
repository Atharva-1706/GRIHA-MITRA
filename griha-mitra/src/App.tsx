import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  HelpCircle, 
  BookOpen, 
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  AlertTriangle,
  LogOut,
  Languages,
  Wrench
} from 'lucide-react';

// --- Types ---
type View = 'dashboard' | 'appliance' | 'ledger' | 'translator';

// --- Mock Data ---
interface LedgerEntry {
  id: string;
  date: string;
  task: string;
  amount: number;
  status: 'Completed' | 'Pending';
}

const LANGUAGES = [
  { id: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { id: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { id: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { id: 'ml', name: 'Malayalam', native: 'മലയാളಂ' }
];

// --- Sub-Components ---

const Header = ({ title, showBack, onBack, userName }: { title: string; showBack?: boolean; onBack?: () => void, userName: string }) => (
  <header className="sticky top-0 z-10 h-20 flex items-center justify-between p-6 bg-white border-b-4 border-primary">
    <div className="flex items-center gap-4">
      {showBack && (
        <button 
          onClick={onBack}
          className="p-2 border-4 border-primary rounded-none active:scale-90 transition-transform bg-white"
          id="back-button"
        >
          <ArrowLeft size={24} />
        </button>
      )}
      <h1 className="text-2xl font-display font-black text-primary uppercase tracking-tighter" id="header-title">{title}</h1>
    </div>
    <div className="w-12 h-12 rounded-none border-4 border-primary bg-accent flex items-center justify-center text-white font-black shadow-[4px_4px_0px_0px_rgba(26,54,93,1)]">
      {userName?.charAt(0).toUpperCase() || 'G'}
    </div>
  </header>
);

const SOSModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="w-full max-w-sm bg-white border-4 border-danger rounded-none p-8 shadow-[8px_8px_0px_0px_#000]"
          id="sos-modal"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-danger/10 border-4 border-danger rounded-none flex items-center justify-center">
              <AlertCircle size={48} className="text-danger animate-pulse" />
            </div>
          </div>
          <h2 className="text-3xl font-display font-black text-center text-danger mb-4 uppercase tracking-tighter">SOS Sent!</h2>
          <p className="text-lg text-center text-primary font-bold mb-8 leading-tight">
            Your emergency contacts have been notified. Help is on the way.
          </p>
          <button 
            onClick={onClose}
            className="w-full brutal-button brutal-button-danger py-6 text-xl"
            id="sos-close-button"
          >
            I AM SAFE NOW
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Onboarding = ({ onComplete }: { onComplete: (name: string) => void }) => {
  const [name, setName] = useState('');
  return (
    <div className="min-h-screen bg-background p-8 flex flex-col justify-center gap-10">
      <div className="space-y-4">
        <span className="bg-primary text-white px-4 py-1 font-black text-xl uppercase tracking-widest">Welcome</span>
        <h2 className="text-6xl font-display font-black uppercase tracking-tighter leading-none">What is your Name?</h2>
      </div>
      <div className="space-y-6">
        <input 
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="E.g. Ashish"
          className="w-full brutal-card p-6 text-4xl font-black bg-white outline-none focus:ring-8 focus:ring-accent/20 border-primary"
        />
        <button 
          onClick={() => name && onComplete(name)}
          disabled={!name}
          className="w-full brutal-button brutal-button-primary py-8 text-3xl disabled:opacity-30 shadow-[10px_10px_0px_0px_#0D9488]"
        >
          LET'S GO →
        </button>
      </div>
    </div>
  );
};

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [phone, setPhone] = useState('');
  return (
    <div className="min-h-screen bg-background p-8 flex flex-col justify-center gap-12">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
           <div className="w-12 h-12 bg-accent border-4 border-primary"></div>
           <h1 className="text-4xl font-display font-black uppercase tracking-tighter">Griha-Mitra</h1>
        </div>
        <p className="text-xl font-bold opacity-60">Domestic Worker's Digital Companion</p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-black uppercase tracking-[0.2em]">Mobile Number</label>
          <input 
            type="tel"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit number"
            className="w-full brutal-card p-6 text-3xl font-black bg-white border-primary focus:ring-8 focus:ring-accent/20 outline-none"
          />
        </div>
        
        <button 
          onClick={onLogin}
          disabled={phone.length < 10}
          className="w-full brutal-button brutal-button-primary py-8 text-2xl shadow-[10px_10px_0px_0px_#0D9488] disabled:opacity-30"
        >
          LOGIN SECURELY →
        </button>
      </div>

      <div className="text-xs font-black uppercase opacity-40 text-center tracking-widest mt-10">
        Trusted by 50,000+ Workers
      </div>
    </div>
  );
};

const APPLIANCE_CATEGORIES = [
  { 
    id: 'cooling', 
    name: 'Cooling & Air', 
    items: ['Air Conditioner', 'Air Purifier', 'Dehumidifier', 'Fan', 'Swamp Cooler', 'Space Heater'] 
  },
  { 
    id: 'cooking', 
    name: 'Cooking', 
    items: ['Air Fryer', 'Blender', 'Bread Machine', 'Cooktop', 'Deep Fryer', 'Hot Plates', 'Indoor Grill', 'Instant Pot', 'Oven', 'Pressure Cooker', 'Range', 'Slow Cooker', 'Smoker', 'Toaster', 'Toaster Oven'] 
  },
  { 
    id: 'food', 
    name: 'Food Prep', 
    items: ['Beverage Cooler', 'Coffee Grinder', 'Coffee Maker', 'Ice Cream Maker', 'Ice Maker', 'Juicer', 'Kegerator', 'Microwave', 'Popcorn Machine', 'Sandwich makers', 'Waffle Iron', 'Wine Fridge'] 
  },
  { 
    id: 'cleaning', 
    name: 'Cleaning', 
    items: ['Dishwasher', 'Dryer', 'Fan', 'Steam Cleaner', 'Vacuum Cleaner', 'Washing Machine'] 
  },
  { 
    id: 'misc', 
    name: 'Miscellaneous', 
    items: ['Electric Knife', 'Generator', 'Humidifier', 'Sewing Machine', 'Trash Compactor', 'Water Heater'] 
  }
];

const ApplianceCenter = () => {
  const [selectedCategory, setSelectedCategory] = useState<typeof APPLIANCE_CATEGORIES[0] | null>(null);
  const [selectedItem, setSelectedItem] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [activeTab, setActiveTab] = useState<'guide' | 'fault'>('guide');
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiContent, setAiContent] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleGetHelp = async (type: 'guide' | 'fault') => {
    setActiveTab(type);
    setIsProcessing(true);
    try {
      const response = await fetch('/api/appliance-help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          category: selectedItem, 
          brand, 
          model, 
          type 
        }),
      });
      const data = await response.json();
      setAiContent(data.content);
      setShowResults(true);
    } catch (error) {
      console.error(error);
      setAiContent("Sorry, I could not find information for this specific model.");
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setSelectedCategory(null);
    setSelectedItem('');
    setBrand('');
    setModel('');
    setShowResults(false);
    setAiContent('');
  };

  if (showResults) {
    return (
      <div className="p-6 space-y-6 pb-32">
        <div className="brutal-card p-6 bg-white border-primary">
          <h3 className="text-3xl font-display font-black uppercase tracking-tighter">{brand} {selectedItem}</h3>
          <p className="font-bold opacity-60 uppercase text-xs tracking-widest mt-1">Model: {model}</p>
        </div>

        <div className="flex border-4 border-primary">
          <button 
            onClick={() => handleGetHelp('guide')}
            disabled={isProcessing}
            className={`flex-1 py-4 font-black uppercase tracking-widest transition-colors ${activeTab === 'guide' ? 'bg-primary text-white' : 'bg-white text-primary'}`}
          >
            {isProcessing && activeTab === 'guide' ? '...' : 'User Guide'}
          </button>
          <button 
            onClick={() => handleGetHelp('fault')}
            disabled={isProcessing}
            className={`flex-1 py-4 font-black uppercase tracking-widest border-l-4 border-primary transition-colors ${activeTab === 'fault' ? 'bg-danger text-white' : 'bg-white text-primary'}`}
          >
            {isProcessing && activeTab === 'fault' ? '...' : 'Fault Fix'}
          </button>
        </div>

        <div className="space-y-4">
          {isProcessing ? (
            <div className="p-10 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-accent border-t-transparent animate-spin mx-auto"></div>
              <p className="font-black uppercase tracking-widest text-accent">AI is reading manual...</p>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="brutal-card p-6 bg-white">
              <div className="whitespace-pre-wrap font-bold text-lg leading-snug">
                {aiContent}
              </div>
            </motion.div>
          )}
        </div>

        <button onClick={reset} className="w-full text-center font-black underline uppercase text-primary/40 pt-4">Search Another</button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 pb-32">
      <h2 className="text-2xl font-black uppercase tracking-tighter">Choose Appliance</h2>
      
      {!selectedCategory ? (
        <div className="grid grid-cols-2 gap-4">
          {APPLIANCE_CATEGORIES.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => setSelectedCategory(cat)}
              className="brutal-button bg-white text-primary h-32 flex-col justify-center gap-2 items-center text-center shadow-[6px_6px_0px_0px_rgba(26,54,93,1)]"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-none flex items-center justify-center">
                <HelpCircle className="text-accent" />
              </div>
              <span className="text-sm">{cat.name}</span>
            </button>
          ))}
        </div>
      ) : !selectedItem ? (
        <div className="space-y-4">
          <button onClick={() => setSelectedCategory(null)} className="text-xs font-black uppercase text-primary/40 underline mb-2 tracking-[0.2em]">← Select Category</button>
          <h3 className="text-xl font-black uppercase bg-accent text-white px-3 py-1 inline-block">{selectedCategory.name}</h3>
          <div className="grid grid-cols-1 gap-3">
            {selectedCategory.items.map((item) => (
              <button 
                key={item} 
                onClick={() => setSelectedItem(item)}
                className="brutal-button bg-white text-primary py-4 px-6 justify-between"
              >
                {item}
                <ChevronRight />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <button onClick={() => setSelectedItem('')} className="text-xs font-black uppercase text-primary/40 underline mb-2 tracking-[0.2em]">← Select Appliance</button>
          <div className="bg-primary text-white p-4 font-black uppercase tracking-tighter text-xl text-center">
            {selectedItem}
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-black uppercase opacity-40">Which Brand?</label>
              <input 
                placeholder="e.g. Samsung, LG, Phillips"
                className="w-full brutal-card p-5 text-xl font-bold bg-[#F1F5F9]"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black uppercase opacity-40">Model Number (Mandatory)</label>
              <input 
                placeholder="Check the sticker on the back"
                className="w-full brutal-card p-5 text-xl font-bold bg-white border-dashed border-accent"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
              <p className="text-[10px] uppercase font-black text-accent mt-1">This helps the AI give correct instructions</p>
            </div>
          </div>

          <button 
            onClick={() => handleGetHelp('guide')}
            disabled={!brand || !model || isProcessing}
            className="w-full brutal-button brutal-button-accent py-8 text-2xl shadow-[10px_10px_0px_0px_rgba(13,148,136,1)] disabled:opacity-30"
          >
            {isProcessing ? 'READING MANUAL...' : 'GET INSTRUCTIONS →'}
          </button>
        </motion.div>
      )}
    </div>
  );
};

const Translator = () => {
  const [text, setText] = useState('');
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [translationResult, setTranslationResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!text) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLanguage: selectedLang.name }),
      });
      const data = await response.json();
      setTranslationResult(data.translation);
    } catch (error) {
      console.error(error);
      setTranslationResult("Sorry, translation failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <label className="text-xl font-black uppercase tracking-tight block">What to Translate?</label>
        <textarea 
          placeholder="Type here in English..."
          className="w-full brutal-card p-6 min-h-[120px] text-xl font-bold bg-white"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <label className="text-sm font-black uppercase tracking-[0.2em] opacity-40">Choose Language</label>
        <div className="grid grid-cols-2 gap-3">
          {LANGUAGES.map((lang) => (
            <button 
              key={lang.id}
              onClick={() => setSelectedLang(lang)}
              className={`p-4 border-4 border-primary font-black uppercase tracking-tighter text-left flex justify-between items-center ${selectedLang.id === lang.id ? 'bg-warning text-white shadow-none translate-x-1 translate-y-1' : 'bg-white text-primary shadow-[4px_4px_0px_0px_#1A365D]'}`}
            >
              <span>{lang.name}</span>
              <span className="text-[10px] opacity-70">{lang.native}</span>
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={handleTranslate}
        disabled={!text || isLoading}
        className="w-full brutal-button brutal-button-primary py-6 text-2xl disabled:opacity-50"
      >
        {isLoading ? 'TRANSLATING...' : 'TRANSLATE NOW'}
      </button>

      {translationResult && (
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="brutal-card p-8 bg-accent/5 border-accent">
          <p className="text-xs font-black uppercase text-accent tracking-[0.3em] mb-4">Result in {selectedLang.name}</p>
          <p className="text-3xl font-bold leading-tight text-primary font-sans">
            {translationResult}
          </p>
        </motion.div>
      )}
    </div>
  );
};

const JobLedger = () => {
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [task, setTask] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddEntry = () => {
    if (!task || !amount) return;
    const newEntry: LedgerEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      task,
      amount: parseInt(amount),
      status: 'Completed'
    };
    setEntries([newEntry, ...entries]);
    setTask('');
    setAmount('');
    setIsAdding(false);
  };

  return (
    <div className="p-6 flex flex-col min-h-[calc(100vh-180px)] pb-32">
      {isAdding ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-3xl font-display font-black uppercase tracking-tighter">New Entry</h3>
            <div className="space-y-2">
              <label className="text-sm font-black uppercase opacity-40">Task Name</label>
              <input 
                placeholder="e.g. Deep Cleaning"
                className="w-full brutal-card p-5 text-xl font-bold bg-[#F1F5F9]"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black uppercase opacity-40">Amount (₹)</label>
              <input 
                type="number"
                placeholder="e.g. 500"
                className="w-full brutal-card p-5 text-xl font-bold bg-[#F1F5F9]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsAdding(false)}
              className="flex-1 brutal-button bg-white text-primary py-4 text-xl"
            >
              CANCEL
            </button>
            <button 
              onClick={handleAddEntry}
              className="flex-1 brutal-button brutal-button-primary py-4 text-xl"
            >
              SAVE
            </button>
          </div>
        </motion.div>
      ) : (
        <>
          {entries.length > 0 && (
            <div className="brutal-card p-8 bg-primary text-white flex justify-between items-center shadow-[12px_12px_0px_0px_#0D9488] mb-8">
              <div>
                <p className="text-sm uppercase font-black tracking-widest mb-1 opacity-70">Total Earnings</p>
                <p className="text-5xl font-display font-black tracking-tighter">
                  ₹{entries.reduce((acc, curr) => acc + curr.amount, 0)}
                </p>
              </div>
              <div className="bg-white text-primary p-4 border-4 border-black">
                <BookOpen size={36} />
              </div>
            </div>
          )}

          {entries.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 py-10">
              <div className="w-40 h-40 bg-warning/10 border-4 border-dashed border-warning rounded-none flex items-center justify-center text-warning">
                <BookOpen size={64} opacity={0.3} />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-display font-black uppercase tracking-tighter">Your Ledger is Empty</h3>
                <p className="text-lg font-bold text-primary/50 max-w-[200px] mx-auto">Start recording your work to track earnings.</p>
              </div>
              <button 
                onClick={() => setIsAdding(true)}
                className="brutal-button brutal-button-warning w-full py-8 text-2xl shadow-[8px_8px_0px_0px_#1A365D]"
              >
                ADD FIRST ENTRY
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-baseline">
                <h3 className="text-2xl font-display font-black uppercase tracking-tighter flex items-center gap-3">
                  <span className="w-2 h-8 bg-accent"></span>
                  Recent Work
                </h3>
                <button 
                  onClick={() => setIsAdding(true)}
                  className="text-accent font-black uppercase underline text-sm"
                >
                  + Add New
                </button>
              </div>
              {entries.map((item) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  key={item.id} 
                  className="brutal-card p-6 flex justify-between items-center bg-white"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-black text-[#64748B] uppercase tracking-wider">{item.date}</p>
                    <h4 className="text-xl font-black uppercase tracking-tighter">{item.task}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-display font-black text-accent tracking-tighter">₹{item.amount}</p>
                    <span className="text-[10px] font-black uppercase bg-[#DCFCE7] text-[#166534] px-3 py-1 border border-[#166534] shadow-[2px_2px_0px_0px_#166534]">
                      {item.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

// --- App Root ---

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSOSOpen, setIsSOSOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setCurrentView('dashboard');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  if (!userName) {
    return <Onboarding onComplete={setUserName} />;
  }

  return (
    <div className="min-h-screen max-w-md mx-auto bg-background relative overflow-x-hidden border-x-2 border-primary/5 shadow-2xl">
      <Header 
        userName={userName}
        title={
          currentView === 'dashboard' ? 'Griha-Mitra' : 
          currentView === 'appliance' ? 'Appliance Hub' : 
          currentView === 'translator' ? 'Translator' : 'Work Ledger'
        } 
        showBack={currentView !== 'dashboard'}
        onBack={() => setCurrentView('dashboard')}
      />

      <main className="min-h-[calc(100vh-88px)]">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <motion.div key="dash" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="p-6 space-y-8">
                <section className="brutal-card p-6 bg-white">
                  <h2 className="text-3xl font-display font-black text-primary uppercase tracking-tighter mb-1 font-sans">NAMASTE, {userName.toUpperCase()}!</h2>
                  <p className="text-lg font-bold text-primary/70">What do you want to do?</p>
                </section>

                <div className="flex flex-col gap-6">
                  <button onClick={() => setCurrentView('appliance')} className="brutal-button brutal-button-accent py-6">
                    <span className="flex items-center gap-4">
                      <span className="bg-white text-accent px-3 py-1 font-black text-xl tracking-normal">AI</span>
                      Appliances
                    </span>
                    <ChevronRight size={28} />
                  </button>

                  <button onClick={() => setCurrentView('translator')} className="brutal-button bg-primary text-white py-6">
                    <span className="flex items-center gap-4">
                      <span className="bg-white text-primary px-3 py-1 font-black text-xl tracking-normal">HI</span>
                      Translator
                    </span>
                    <ChevronRight size={28} />
                  </button>

                  <button onClick={() => setCurrentView('ledger')} className="brutal-button brutal-button-warning py-6">
                    <span className="flex items-center gap-4">
                      <span className="bg-white text-warning px-3 py-1 font-black text-xl tracking-normal">PK</span>
                      Ledger
                    </span>
                    <ChevronRight size={28} />
                  </button>

                  <button onClick={() => setIsSOSOpen(true)} className="brutal-button brutal-button-danger mt-4 py-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-danger border-black">
                    <span className="flex flex-col items-center gap-1 w-full">
                      <span className="text-5xl font-black uppercase tracking-[0.2em]">SOS</span>
                      <span className="text-xs font-bold opacity-80 uppercase tracking-widest">Emergency Help</span>
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'appliance' && (
            <motion.div key="app" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <ApplianceCenter />
            </motion.div>
          )}

          {currentView === 'translator' && (
            <motion.div key="trans" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <Translator />
            </motion.div>
          )}

          {currentView === 'ledger' && (
            <motion.div key="led" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <JobLedger />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <SOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40">
         <div className="h-20 border-t-4 border-primary bg-white flex items-stretch">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className={`flex-1 flex flex-col items-center justify-center border-r-4 border-primary transition-colors ${currentView === 'dashboard' ? 'bg-primary text-white' : 'bg-white text-primary/40'}`}
            >
              <Home size={28} strokeWidth={3} />
            </button>
            <button 
              onClick={() => setCurrentView('appliance')}
              className={`flex-1 flex flex-col items-center justify-center border-r-4 border-primary transition-colors ${currentView === 'appliance' ? 'bg-accent text-white' : 'bg-white text-primary/40'}`}
            >
              <HelpCircle size={28} strokeWidth={3} />
            </button>
            <button 
              onClick={() => setCurrentView('translator')}
              className={`flex-1 flex flex-col items-center justify-center border-r-4 border-primary transition-colors ${currentView === 'translator' ? 'bg-warning text-white' : 'bg-white text-primary/40'}`}
            >
              <Languages size={28} strokeWidth={3} />
            </button>
            <button 
              onClick={handleLogout}
              className="flex-1 flex flex-col items-center justify-center bg-white text-primary/40"
            >
              <LogOut size={28} strokeWidth={3} />
            </button>
         </div>
      </div>
    </div>
  );
}

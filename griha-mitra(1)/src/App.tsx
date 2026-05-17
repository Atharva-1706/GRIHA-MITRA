import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Phone, ArrowRight, Home as HomeIcon, CheckCircle2, LogOut } from "lucide-react";
import BottomNav from "./components/BottomNav";
import ApplianceCenter from "./components/ApplianceCenter";
import Translator from "./components/Translator";
import JobLedger from "./components/JobLedger";
import SOS from "./components/SOS";
import { View } from "./types";

export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [currentView, setCurrentView] = useState<View>('home');

  useEffect(() => {
    const savedName = localStorage.getItem('grihamitra_user_name');
    if (savedName) {
      setName(savedName);
      setOnboarded(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('grihamitra_user_name', name);
    setOnboarded(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('grihamitra_user_name');
    setOnboarded(false);
    setName("");
    setPhone("");
    setOnboardingStep(1);
    setCurrentView('home');
  };

  if (!onboarded) {
    return (
      <div className="min-h-screen bg-surface p-6 flex flex-col justify-center items-center max-w-md mx-auto border-[12px] border-primary">
        <header className="mb-12 text-center">
          <h1 className="text-6xl font-black uppercase tracking-tighter leading-none mb-2 text-primary">
            Griha<br /><span className="text-accent">-Mitra</span>
          </h1>
          <div className="inline-block bg-warning border-2 border-black px-4 py-1 font-black uppercase text-[10px] tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Digital Companion
          </div>
        </header>

        <AnimatePresence mode="wait">
          {onboardingStep === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8 w-full"
            >
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="brutal-card p-3 bg-white text-center">
                  <span className="block font-black text-[10px] uppercase text-accent mb-1">Translate</span>
                  <div className="h-1 bg-accent w-full mb-1" />
                </div>
                <div className="brutal-card p-3 bg-white text-center">
                  <span className="block font-black text-[10px] uppercase text-primary mb-1">AI Guide</span>
                  <div className="h-1 bg-primary w-full mb-1" />
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-black uppercase mb-2">Welcome!</h2>
                <p className="font-bold text-slate-500 text-sm uppercase">Please log in with your phone to start.</p>
              </div>

              <div>
                <label className="block font-black uppercase mb-1 text-xs text-primary">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter Mobile No."
                    className="w-full border-4 border-black p-4 pl-12 font-black text-xl focus:outline-none bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              </div>

              <button
                disabled={phone.length < 10}
                onClick={() => setOnboardingStep(2)}
                className="brutal-btn-primary w-full flex items-center justify-center gap-2 group disabled:opacity-50 text-xl py-5"
              >
                Log In <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              
              <p className="text-center text-[10px] font-bold text-slate-400 uppercase">Secure • Fast • Simple</p>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8 w-full"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-accent border-4 border-black mx-auto mb-6 flex items-center justify-center text-white">
                  <User size={40} strokeWidth={3} />
                </div>
                <h2 className="text-3xl font-black uppercase mb-2">Almost There!</h2>
                <p className="font-bold text-slate-500 text-sm uppercase">What should we call you?</p>
              </div>

              <div>
                <label className="block font-black uppercase mb-1 text-xs text-accent">Your Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Your Name"
                    className="w-full border-4 border-black p-4 pl-12 font-black text-xl focus:outline-none bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              </div>

              <button
                disabled={!name}
                onClick={handleOnboardingComplete}
                className="brutal-btn-accent w-full flex items-center justify-center gap-2 group disabled:opacity-50 text-xl py-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                Get Started <CheckCircle2 className="group-hover:scale-125 transition-transform" />
              </button>
              
              <button 
                onClick={() => setOnboardingStep(1)}
                className="w-full font-black uppercase text-[10px] text-slate-400 hover:text-black transition-colors"
              >
                Change Phone Number
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans text-[#1A1A1A] overflow-hidden p-6 border-[12px] border-primary max-w-lg mx-auto shadow-[12px_12px_0px_0px_rgba(0,0,0,0.2)]">
      <main className="flex-1 pb-24 overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <header className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-black uppercase tracking-tighter leading-none text-primary">
                    Griha-Mitra
                  </h1>
                  <span className="text-accent font-black uppercase text-xs">Companion</span>
                </div>
                <div className="flex items-center gap-2">
                  <SOS />
                  <button 
                    onClick={handleLogout}
                    className="p-2 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 text-red-600 hover:bg-red-50"
                    title="Logout"
                  >
                    <LogOut size={18} strokeWidth={3} />
                  </button>
                  <div className="w-10 h-10 bg-primary border-2 border-black flex items-center justify-center text-white font-black text-sm">
                    {name[0]?.toUpperCase() || 'GM'}
                  </div>
                </div>
              </header>

              <div className="grid grid-cols-1 gap-6">
                <div 
                  onClick={() => setCurrentView('appliances')}
                  className="brutal-card p-6 bg-white cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-black uppercase text-primary group-hover:text-accent transition-colors">AI Appliance Center</h3>
                  </div>
                  <p className="text-xs font-bold text-slate-500 uppercase">Models, Repairs & Guides</p>
                </div>

                <div 
                  onClick={() => setCurrentView('translator')}
                  className="brutal-card p-6 bg-[#FBBF24] cursor-pointer group"
                >
                  <h3 className="text-xl font-black uppercase text-black mb-1">Translator</h3>
                  <p className="text-xs font-bold text-black opacity-60 uppercase">English to Local Languages</p>
                </div>

                <div 
                  onClick={() => setCurrentView('ledger')}
                  className="brutal-card p-6 bg-primary text-white cursor-pointer group"
                >
                  <h3 className="text-xl font-black uppercase mb-1">Job Ledger</h3>
                  <p className="text-xs font-bold opacity-80 uppercase">Track Work & Earnings</p>
                </div>
              </div>

              <div className="brutal-card p-4 bg-red-600 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white text-red-600 border-2 border-black">
                     <SOS />
                  </div>
                  <div>
                    <p className="font-black uppercase text-sm leading-none">Emergency SOS</p>
                    <p className="text-[10px] font-bold opacity-80">Click for immediate help</p>
                  </div>
                </div>
              </div>

              <div className="brutal-card p-6 bg-accent text-white italic">
                <p className="font-bold opacity-90">"Work is worship. Griha-Mitra is here to help you shine."</p>
              </div>
            </motion.div>
          )}

          {currentView === 'appliances' && <ApplianceCenter key="appliances" />}
          {currentView === 'translator' && <Translator key="translator" />}
          {currentView === 'ledger' && <JobLedger key="ledger" />}
        </AnimatePresence>
      </main>

      <BottomNav currentView={currentView} setView={setCurrentView} />
    </div>
  );
}

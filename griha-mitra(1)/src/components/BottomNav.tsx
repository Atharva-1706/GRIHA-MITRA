import { motion } from "motion/react";
import { Home, Refrigerator, Languages, ClipboardList } from "lucide-react";
import { View } from "../types";

interface BottomNavProps {
  currentView: View;
  setView: (view: View) => void;
}

export default function BottomNav({ currentView, setView }: BottomNavProps) {
  const items = [
    { id: 'home' as View, label: 'Home', icon: Home },
    { id: 'appliances' as View, label: 'Appliance', icon: Refrigerator },
    { id: 'translator' as View, label: 'Translate', icon: Languages },
    { id: 'ledger' as View, label: 'Ledger', icon: ClipboardList },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] h-20 bg-white border-4 border-black flex shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50 overflow-hidden">
      {items.map((item, index) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`bottom-nav-item flex-1 ${index !== items.length - 1 ? 'border-r-4 border-black' : ''} transition-all ${
              isActive ? 'bg-accent text-white scale-100' : 'text-slate-900 bg-white hover:bg-slate-50'
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 3 : 2} />
            <span className="text-[9px] font-black">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

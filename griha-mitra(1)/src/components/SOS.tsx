import { useState } from "react";
import { ShieldAlert, X, AlertOctagon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function SOS() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 border-2 border-black bg-red-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center animate-pulse active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
        title="Emergency SOS"
      >
        <ShieldAlert size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-sm bg-white border-8 border-red-600 p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.3)]"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute -top-4 -right-4 p-2 bg-black text-white border-4 border-white"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col items-center text-center">
                <AlertOctagon size={80} className="text-red-600 mb-6" />
                <h2 className="text-4xl font-black uppercase text-red-600 mb-4 leading-none">HELP REQUESTED</h2>
                <div className="space-y-4 w-full">
                  <div className="brutal-card p-4 bg-red-50 font-black uppercase text-sm border-red-600">
                    Emergency Alert Sent
                  </div>
                  <p className="font-bold text-slate-600">
                    Your location has been shared. Help is on the way. Please stay where you are.
                  </p>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="w-full brutal-btn bg-black text-white py-4"
                  >
                    I AM SAFE NOW
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

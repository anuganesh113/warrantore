"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, MessageSquare, Send } from "lucide-react";

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-[350px] z-50 bg-white border border-gray-150 rounded-2xl overflow-hidden flex flex-col shadow-2xl text-text-dark font-sans"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 bg-brand-navy text-white flex justify-between items-center relative overflow-hidden">
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 rounded-full bg-brand-red flex items-center justify-center border border-white/10 text-white animate-pulse">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-extrabold font-display text-sm tracking-wide">Electon Support AI</h4>
                  <p className="text-[10px] text-gray-300">Your 24/7 personal smart guide</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="h-[280px] p-4 flex flex-col gap-4 overflow-y-auto no-scrollbar bg-gray-50/50">
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-red-150 flex-shrink-0 flex items-center justify-center text-brand-red border border-red-200">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-sm text-xs text-text-muted max-w-[85%] leading-relaxed font-semibold shadow-xs">
                  Hello! I'm your Electon shopping assistant. Ask me anything about our DSLR cameras, studio ANC headphones, gaming consoles, or trimmer deals!
                </div>
              </div>

              {/* Suggestion Chips */}
              <div className="flex flex-wrap gap-2 mt-2">
                {["DSLR Camera specs", "Headphone discounts", "Free shipping status"].map((suggestion) => (
                  <button 
                    key={suggestion} 
                    onClick={() => alert(`Asking about: ${suggestion}...`)}
                    className="text-[10px] font-bold px-3 py-1.5 rounded-full border border-gray-200 text-brand-navy hover:border-brand-red hover:text-brand-red hover:bg-red-50 transition-all bg-white shadow-xs cursor-pointer"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask me anything..." 
                  className="w-full bg-gray-50 border border-gray-200 rounded-sm py-3 pl-4 pr-12 text-xs text-text-dark placeholder-text-light focus:outline-none focus:border-brand-red/50 transition-colors font-semibold"
                />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-sm bg-brand-red hover:bg-brand-red-hover text-white flex items-center justify-center transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-brand-red hover:bg-brand-red-hover flex items-center justify-center z-40 shadow-xl shadow-brand-red/30 text-white"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 animate-pulse" />}
      </motion.button>
    </>
  );
}

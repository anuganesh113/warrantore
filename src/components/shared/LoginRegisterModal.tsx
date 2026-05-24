"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, ArrowRight } from "lucide-react";

interface LoginRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginRegisterModal({ isOpen, onClose }: LoginRegisterModalProps) {
  const [view, setView] = useState<"login" | "register">("login");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10"
          >
            {/* Left/Top Section: Branding & Image */}
            <div className="md:w-5/12 bg-brand-navy p-8 md:p-12 text-white relative overflow-hidden flex flex-col justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-red/20 via-brand-navy to-brand-navy opacity-80" />
              
              <div className="relative z-10">
                <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight mb-4">
                  {view === "login" ? "Welcome Back" : "Join the Future"}
                </h2>
                <p className="text-gray-300 text-sm font-medium leading-relaxed mb-8">
                  {view === "login"
                    ? "Log in to access your orders, saved items, and exclusive personalized offers tailored just for you."
                    : "Create an account to unlock premium tech deals, track your shipments, and curate your ultimate wishlist."}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-300 font-semibold">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-brand-red text-lg leading-none">✓</span>
                    </div>
                    Fast & Secure Checkout
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300 font-semibold">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-brand-red text-lg leading-none">✓</span>
                    </div>
                    Exclusive Member Discounts
                  </div>
                </div>
              </div>
            </div>

            {/* Right/Bottom Section: Forms */}
            <div className="md:w-7/12 p-8 md:p-12 bg-white relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-gray-400 hover:text-brand-red hover:bg-red-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-w-sm mx-auto">
                <div className="flex items-center gap-6 border-b border-gray-200 mb-8">
                  <button
                    onClick={() => setView("login")}
                    className={`pb-3 text-sm font-black uppercase tracking-wider transition-colors relative ${
                      view === "login" ? "text-brand-navy" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    Login
                    {view === "login" && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red" />
                    )}
                  </button>
                  <button
                    onClick={() => setView("register")}
                    className={`pb-3 text-sm font-black uppercase tracking-wider transition-colors relative ${
                      view === "register" ? "text-brand-navy" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    Register
                    {view === "register" && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red" />
                    )}
                  </button>
                </div>

                {/* Form area */}
                <motion.div
                  key={view}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    {view === "register" && (
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input 
                            type="text" 
                            placeholder="John Doe"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                          type="email" 
                          placeholder="you@example.com"
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Password</label>
                        {view === "login" && (
                          <a href="#" className="text-[10px] font-bold text-brand-red hover:underline">Forgot password?</a>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3.5 bg-brand-navy hover:bg-brand-red text-white rounded-lg font-bold text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 mt-6 shadow-md"
                    >
                      {view === "login" ? "Sign In" : "Create Account"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  <div className="mt-8">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-400 text-[10px] font-bold uppercase tracking-widest">Or continue with</span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-600">
                        Google
                      </button>
                      <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-600">
                        Github
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

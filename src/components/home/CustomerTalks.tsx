"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomerTalks() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [emailInput, setEmailInput] = useState("");

  const testimonials = [
    {
      name: "User name",
      role: "designer",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
      text: "I am absolutely in love with my new audio buds and DSLR camera from Electon! The delivery was incredibly fast, and the packaging was extremely premium. Best tech store ever!",
      rating: 5
    },
    {
      name: "Alex Rivera",
      role: "Software Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      text: "The customer service was stellar. They helped me choose the perfect high-productivity laptop and processed my order with absolute transparency. Free shipping was a major plus!",
      rating: 5
    }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim() === "") return;
    alert(`Thank you for subscribing with: ${emailInput}!`);
    setEmailInput("");
  };

  return (
    <section className="py-20 bg-white px-4 sm:px-6 text-text-dark font-sans border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: Interactive Testimonial Slider */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-2xl font-black font-display text-brand-navy mb-8 uppercase tracking-wide">
              What customers say
            </h3>
            
            <div className="bg-gray-50 border border-gray-100 p-6 sm:p-8 rounded-lg relative w-full shadow-sm max-w-lg min-h-[220px] flex flex-col justify-between">
              
              {/* Testimonial Core Body */}
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-1 text-yellow-400 mb-4">
                  {[...Array(testimonials[activeSlide].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-text-muted italic leading-relaxed font-semibold">
                  "{testimonials[activeSlide].text}"
                </p>
              </div>

              {/* Customer Info row */}
              <div className="flex items-center justify-center sm:justify-start gap-4 mt-6 border-t border-gray-100 pt-4">
                <img 
                  src={testimonials[activeSlide].avatar}
                  alt={testimonials[activeSlide].name}
                  className="w-12 h-12 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <h4 className="text-sm font-extrabold text-brand-navy">{testimonials[activeSlide].name}</h4>
                  <p className="text-xs font-bold text-brand-red uppercase tracking-wider mt-0.5">
                    {testimonials[activeSlide].role}
                  </p>
                </div>
              </div>

              {/* Slider pagination indicators */}
              <div className="flex gap-2 mt-4 self-center sm:self-end">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === activeSlide ? "bg-brand-red w-6" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Newsletter & Social Network Channels */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8 w-full">
            <div className="bg-gray-50 border border-gray-150 p-8 sm:p-10 rounded-lg shadow-sm">
              <h3 className="text-xl sm:text-2xl font-black font-display text-brand-navy mb-2 uppercase tracking-wide">
                Sign up for newsletter
              </h3>
              <p className="text-xs text-text-muted font-semibold mb-6">
                Receive special vouchers, today's deals, and limited launch updates directly in your inbox.
              </p>

              {/* Form Input fields */}
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Your email address..."
                  className="flex-1 bg-white border border-gray-200 rounded-sm py-3.5 px-5 text-xs text-text-dark focus:outline-none focus:border-brand-red/50 transition-all font-semibold"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black py-3.5 px-8 rounded-sm uppercase tracking-widest transition-colors h-11 flex items-center justify-center gap-1.5"
                >
                  Subscribe
                </button>
              </form>

              {/* Custom Social Channels Strip */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-8 pt-6 border-t border-gray-200/60">
                <span className="text-[10px] font-bold text-text-light uppercase tracking-widest mr-2">
                  Follow us:
                </span>
                <div className="flex gap-2">
                  <a 
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white hover:bg-brand-red hover:text-white border border-gray-150 text-brand-navy shadow-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                    title="Facebook"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h2V1h-3C10.5 1 9 2.5 9 5v3z" />
                    </svg>
                  </a>
                  <a 
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white hover:bg-brand-red hover:text-white border border-gray-150 text-brand-navy shadow-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                    title="Twitter"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 4.56v.03c-.88.39-1.83.65-2.82.77 1.02-.61 1.8-1.57 2.17-2.72-.95.56-2 .97-3.13 1.2a4.93 4.93 0 00-8.39 4.49A13.98 13.98 0 011.67 3.15 4.93 4.93 0 003.2 9.72c-.79-.02-1.54-.24-2.19-.6v.06a4.93 4.93 0 003.95 4.83c-.7.19-1.44.22-2.15.09a4.93 4.93 0 004.6 3.42A9.9 9.9 0 010 19.54a13.94 13.94 0 007.55 2.21c9.06 0 14-7.5 14-14 0-.21 0-.42-.01-.63A9.98 9.98 0 0024 4.56z" />
                    </svg>
                  </a>
                  <a 
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white hover:bg-brand-red hover:text-white border border-gray-150 text-brand-navy shadow-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                    title="Instagram"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a 
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white hover:bg-brand-red hover:text-white border border-gray-150 text-brand-navy shadow-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                    title="Youtube"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.002 3.002 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

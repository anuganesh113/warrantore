"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Truck, Award } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Next-Gen Performance Starts Here",
    subtitle: "Experience cutting-edge technology engineered for those who demand the best.",
    cta: "Shop Now",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2400&auto=format&fit=crop", 
    badge: "New Release",
  },
  {
    id: 2,
    title: "Power. Speed. Innovation.",
    subtitle: "Unleash the ultimate smart experience with our latest flagship mobile devices.",
    cta: "Explore Deals",
    image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=2400&auto=format&fit=crop", 
    badge: "Top Rated",
  },
  {
    id: 3,
    title: "Upgrade Your Digital Lifestyle",
    subtitle: "Immersive audio and smart wearables designed to seamlessly integrate into your life.",
    cta: "View Collection",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2400&auto=format&fit=crop", 
    badge: "Limited Offer",
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] bg-black overflow-hidden group">
      {/* Slides with crossfade and Ken Burns zoom effect */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Background Image */}
          <motion.img
            src={slides[current].image}
            alt={slides[current].title}
            className="absolute inset-0 w-full h-full object-cover object-center"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
          />
          
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent md:to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 w-full text-center md:text-left pt-12 md:pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl"
          >
            {/* Slide Badge */}
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-block py-1.5 px-4 rounded-full bg-brand-red/20 border border-brand-red/50 text-brand-red text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(255,107,0,0.3)]"
            >
              {slides[current].badge}
            </motion.span>
            
            {/* Slide Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[1.1] tracking-tight mb-4 sm:mb-6 drop-shadow-lg">
              {slides[current].title}
            </h1>
            
            {/* Slide Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-gray-300 font-medium mb-8 sm:mb-10 leading-relaxed max-w-lg mx-auto md:mx-0 drop-shadow-md">
              {slides[current].subtitle}
            </p>
            
            {/* CTA Button */}
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-3 bg-white text-brand-navy hover:bg-brand-red hover:text-white py-4 px-8 sm:px-10 rounded-full font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-brand-red/40 transform hover:-translate-y-1"
            >
              {slides[current].cta}
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Side Navigation Arrows (Desktop) */}
      <div className="absolute inset-y-0 left-0 right-0 z-30 hidden sm:flex items-center justify-between px-4 sm:px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 pointer-events-auto shadow-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 pointer-events-auto shadow-xl"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Pagination Dots */}
      <div className="absolute bottom-24 md:bottom-28 left-0 right-0 z-30 flex justify-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
               setIsAutoPlaying(false);
               setCurrent(idx);
            }}
            className={`transition-all duration-300 rounded-full ${
              current === idx 
                ? "w-8 h-2.5 bg-brand-red shadow-[0_0_10px_rgba(255,107,0,0.5)]" 
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/90"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Trust Badges Strip (Glassmorphism Bottom Overlay) */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-black/40 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-center md:justify-between gap-4 md:gap-8 text-white">
          <div className="flex items-center gap-3 group/badge cursor-default">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/badge:bg-brand-red/20 transition-colors">
              <Truck className="w-4 h-4 text-brand-red" />
            </div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-300 group-hover/badge:text-white transition-colors">Free Delivery</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 group/badge cursor-default">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/badge:bg-brand-red/20 transition-colors">
              <ShieldCheck className="w-4 h-4 text-brand-red" />
            </div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-300 group-hover/badge:text-white transition-colors">1 Year Warranty</span>
          </div>
          <div className="flex items-center gap-3 group/badge cursor-default">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/badge:bg-brand-red/20 transition-colors">
              <Award className="w-4 h-4 text-brand-red" />
            </div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-300 group-hover/badge:text-white transition-colors">Official Store</span>
          </div>
        </div>
      </div>
    </section>
  );
}

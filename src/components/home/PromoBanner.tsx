"use client";

import { products } from "@/lib/products";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PromoBanner() {
  // Find GoPro or camera product to link
  const cameraProduct = products.find((p) => p.slug === "dslr-camera");
  const linkHref = `/product/${cameraProduct ? cameraProduct.slug : "dslr-camera"}`;

  return (
    <section className="py-16 bg-[#F0F5FA] px-4 sm:px-6 text-text-dark font-sans relative overflow-hidden">
      {/* Decorative details */}
      <div className="absolute top-0 right-0 w-[45%] h-full bg-gradient-to-l from-white/30 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-white/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
        
        {/* Left side: GoPro mock image */}
        <div className="flex-1 w-full flex items-center justify-center relative min-h-[250px] sm:min-h-[320px] md:order-first">
          <div className="absolute w-[75%] aspect-square bg-[radial-gradient(circle,_rgba(255,255,255,0.7)_0%,_rgba(255,255,255,0)_70%)] rounded-full animate-pulse-slow pointer-events-none" />
          
          <Link href={linkHref} className="max-w-[70%] max-h-[260px] flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop"
              alt="GoPro Action Camera Premium Visual"
              className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.06)] hover:scale-105 transition-transform duration-500 cursor-pointer"
            />
          </Link>
        </div>

        {/* Right side: Detailed Promos */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-[10px] font-black text-brand-red uppercase tracking-widest block mb-2">
            Hot Spot Camera Showcase
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-navy font-display leading-tight mb-4 uppercase">
            Laxury AD65 <br />
            smart go pro
          </h2>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-8 max-w-md font-semibold">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin ac eros ac sem hendrerit molestie at a purus.
          </p>

          <Link 
            href={linkHref}
            className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white py-3.5 px-9 rounded-sm font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-md shadow-brand-red/20 hover:shadow-brand-red/35"
          >
            Shop Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}

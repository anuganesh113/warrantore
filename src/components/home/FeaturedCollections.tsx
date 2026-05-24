"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function FeaturedCollections() {
  const categories = [
    {
      name: "Laptops",
      itemsCount: "Explore Collection",
      bgClass: "bg-[#EBF5FF]",
      textColor: "text-[#1976D2]",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=300&auto=format&fit=crop",
      link: "/shop?category=laptops"
    },
    {
      name: "Mobiles",
      itemsCount: "Explore Collection",
      bgClass: "bg-[#F0EEFF]",
      textColor: "text-[#673AB7]",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=300&auto=format&fit=crop",
      link: "/shop?category=mobiles"
    },
    {
      name: "Tablets",
      itemsCount: "Explore Collection",
      bgClass: "bg-[#FFF8EA]",
      textColor: "text-[#F57C00]",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=300&auto=format&fit=crop",
      link: "/shop?category=tablets"
    },
    {
      name: "CCTV Installation",
      itemsCount: "Consult Now",
      bgClass: "bg-[#FFEAEA]",
      textColor: "text-[#D32F2F]",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=300&auto=format&fit=crop",
      link: "/shop?category=cctv"
    }
  ];

  return (
    <section className="py-20 bg-white px-4 sm:px-6 text-text-dark font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black font-display text-brand-navy tracking-tight">
            Top Categories
          </h2>
          <div className="w-12 h-1 bg-brand-red mx-auto mt-3.5 rounded-full" />
        </div>

        {/* Categories Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT: Custom PC Build Promo Card */}
          <Link href="/shop?category=custom-pc" className="lg:col-span-6 bg-[#1A1A1B] rounded-2xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group min-h-[380px] shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-800">
            {/* Background absolute graphic rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] aspect-square rounded-full border border-white/5 bg-brand-red/5 pointer-events-none group-hover:scale-110 transition-transform duration-700 ease-out" />
            
            <div className="relative z-10">
              <span className="text-[10px] font-bold text-brand-red uppercase tracking-widest block mb-2">
                Premium Service
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white leading-none font-display mb-3">
                Custom PC Build
              </h3>
              <p className="text-sm font-medium text-gray-400 max-w-sm leading-relaxed">
                Tailor-made high performance desktop computers built to your exact specifications for gaming, rendering, and extreme productivity.
              </p>
            </div>

            {/* Custom PC graphic */}
            <div className="relative flex-1 flex items-center justify-center p-4 mt-8">
              <img 
                src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=500&auto=format&fit=crop"
                alt="Custom PC Build"
                className="max-w-full h-[220px] object-cover rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500 border border-white/10"
              />
            </div>

            <div className="relative z-10 flex items-center justify-between mt-8">
              <span className="text-xs font-black text-white group-hover:text-brand-red flex items-center gap-2 uppercase tracking-widest transition-colors">
                Start Your Build <ArrowRight className="w-4 h-4 text-brand-red group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          {/* RIGHT: Grid of pastel tiles */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Loop small pastel category cards */}
            {categories.map((c, idx) => (
              <Link
                key={idx}
                href={c.link}
                className={`${c.bgClass} rounded-2xl p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden group shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              >
                <div className="flex flex-col justify-between h-full relative z-10">
                  <div>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-brand-navy group-hover:text-brand-red transition-colors font-display leading-tight">
                      {c.name}
                    </h4>
                    <p className="text-[10px] text-text-light font-bold uppercase mt-1.5 tracking-wider">
                      {c.itemsCount}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-brand-navy flex items-center gap-1 group-hover:gap-2 transition-all uppercase tracking-wider mt-16 group-hover:text-brand-red">
                    Shop Now <ChevronRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Floating Thumbnail */}
                <div className="absolute -bottom-6 -right-6 w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center flex-shrink-0 bg-white/40 p-3 rounded-full border border-white/60 z-10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-sm">
                  <img 
                    src={c.image}
                    alt={c.name}
                    className="max-w-full max-h-full object-cover rounded-full shadow-inner"
                  />
                </div>
              </Link>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { products } from "@/lib/products";
import ProductCard from "@/components/shared/ProductCard";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Flame } from "lucide-react";
import Link from "next/link";

export default function ProductGrid() {
  // Grab the first 8 products as featured products for our homepage grid
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Smooth Scroll Slider controls
  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth * 0.75; // Scroll 75% of viewport width
      const targetScroll = container.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
      
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
  };

  return (
    <section className="py-20 bg-gray-50/50 px-4 sm:px-6 text-text-dark font-sans border-b border-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Row with Title & Slider Arrow Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <span className="p-1 rounded bg-brand-red/10 text-brand-red">
                <Flame className="w-3.5 h-3.5 fill-current" />
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-brand-red">
                Top Rated
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-brand-navy tracking-tight">
              Featured Products
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-1.5 font-medium">
              Discover our handpicked selection of top-rated, high-performance gadgets.
            </p>
          </div>

          {/* Slider Controllers & View All Button Container */}
          <div className="flex items-center gap-4 self-start sm:self-auto">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-brand-navy hover:text-brand-red transition-colors"
            >
              View All
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>

            <div className="w-px h-6 bg-gray-200 hidden sm:block" />

            {/* Slider Next/Prev Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScroll("left")}
                className="w-9 h-9 rounded-full border border-gray-200 bg-white text-brand-navy hover:border-brand-red hover:text-brand-red flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
                title="Scroll Left"
                aria-label="Scroll featured products left"
              >
                <ChevronLeft className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={() => handleScroll("right")}
                className="w-9 h-9 rounded-full border border-gray-200 bg-white text-brand-navy hover:border-brand-red hover:text-brand-red flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
                title="Scroll Right"
                aria-label="Scroll featured products right"
              >
                <ChevronRight className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Unified Responsive Single-Row Slider */}
        <div className="relative">
          <motion.div
            ref={scrollRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 scroll-smooth w-full"
          >
            {featuredProducts.map((product) => (
              <motion.div 
                key={product.id} 
                variants={itemVariants}
                className="w-[280px] sm:w-[300px] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] flex-shrink-0 snap-start snap-always"
              >
                <div className="relative h-full group">
                  <ProductCard product={product} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

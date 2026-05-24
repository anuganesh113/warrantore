"use client";

import { useState, useEffect, useRef } from "react";
import { products, Product } from "@/lib/products";
import ProductCard from "@/components/shared/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function LatestArrivals() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filterCategories = [
    { label: "All Arrivals", value: "All" },
    { label: "Smartphones", value: "Smartphones" },
    { label: "Laptops", value: "Laptops" },
    { label: "Audio", value: "Audio" },
    { label: "Gaming", value: "Gaming" }
  ];

  // Fetch / filter product new arrivals
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate premium skeleton loader delay for UX performance feel
    const timer = setTimeout(() => {
      let items = products;
      if (activeFilter !== "All") {
        items = products.filter(
          (p) => p.category.toLowerCase() === activeFilter.toLowerCase()
        );
      }
      
      // Select first 5 items as "new" arrivals
      setFilteredProducts(items.slice(0, 5));
      setIsLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [activeFilter]);

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
    <section className="py-20 bg-gradient-to-b from-white to-gray-50/50 px-4 sm:px-6 relative overflow-hidden border-b border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Row with Title & Slider Arrow Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <span className="p-1 rounded bg-brand-red/10 text-brand-red">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-brand-red">
                Fresh Drops
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-brand-navy tracking-tight">
              Latest Arrivals
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-1.5 font-medium">
              Explore the latest innovative technology releases and gear upgrades just added.
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
                aria-label="Scroll products left"
              >
                <ChevronLeft className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={() => handleScroll("right")}
                className="w-9 h-9 rounded-full border border-gray-200 bg-white text-brand-navy hover:border-brand-red hover:text-brand-red flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
                title="Scroll Right"
                aria-label="Scroll products right"
              >
                <ChevronRight className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {filterCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`py-2 px-5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex-shrink-0 border ${
                activeFilter === cat.value
                  ? "bg-brand-navy border-brand-navy text-white shadow-md"
                  : "bg-white border-gray-200 text-brand-navy hover:border-brand-red/40 hover:text-brand-red"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Unified Responsive Single-Row Slider */}
        <div className="relative">
          {isLoading ? (
            // Skeleton Loader States in a single sliding row
            <div className="flex gap-6 overflow-x-hidden pb-4">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-[280px] sm:w-[300px] md:w-[calc(33.333%-16px)] lg:w-[calc(20%-20px)] flex-shrink-0 bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-between min-h-[340px] animate-pulse"
                >
                  <div>
                    <div className="w-full h-40 bg-gray-100 rounded-xl mb-3 mt-4" />
                    <div className="w-1/3 h-2.5 bg-gray-100 rounded mb-2.5" />
                    <div className="w-3/4 h-4 bg-gray-100 rounded mb-2" />
                    <div className="w-1/2 h-3 bg-gray-100 rounded" />
                  </div>
                  <div className="w-1/2 h-5 bg-gray-100 rounded-full mt-4" />
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredProducts.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 bg-white border border-dashed border-gray-200 rounded-2xl"
                >
                  <p className="text-sm font-semibold text-text-muted">
                    No new arrivals found in this category.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  ref={scrollRef}
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 scroll-smooth w-full"
                >
                  {filteredProducts.map((product) => (
                    <motion.div 
                      key={product.id} 
                      variants={itemVariants}
                      layoutId={product.id}
                      className="w-[280px] sm:w-[300px] md:w-[calc(33.333%-16px)] lg:w-[calc(20%-20px)] flex-shrink-0 snap-start snap-always h-full"
                    >
                      {/* Custom Card wrapper with hot tags */}
                      <div className="relative h-full group">
                        {/* "NEW" Hot Tag indicator */}
                        <div className="absolute top-4 left-4 z-10 py-0.5 px-2 bg-[#FF6B00] text-white text-[8px] font-black rounded-full tracking-wider uppercase shadow-sm">
                          New
                        </div>
                        <ProductCard product={product} />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

      </div>
    </section>
  );
}

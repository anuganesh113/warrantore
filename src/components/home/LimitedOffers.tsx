"use client";

import { useCart } from "@/lib/CartContext";
import { products, Product } from "@/lib/products";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Eye, Heart, Flame } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function LimitedOffers() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const offerProducts = products.filter((p) => p.isOffer);

  // Set up live countdown target (3 days from now for demo)
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 3, hours: 12, minutes: 45, seconds: 0 });

  useEffect(() => {
    // Generate a fixed target date (e.g. 3 days in the future)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(targetDate.getHours() + 12);

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const stockStatuses = [
    { sold: 32, available: 50 },
    { sold: 18, available: 40 }
  ];

  return (
    <section className="py-20 bg-white border-b border-gray-100 px-4 sm:px-6 text-text-dark font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black font-display text-brand-navy tracking-tight flex items-center justify-center gap-2">
            <Flame className="w-7 h-7 text-brand-red animate-pulse" /> Limited time offer
          </h2>
          <div className="w-12 h-1 bg-brand-red mx-auto mt-3.5 rounded-full" />
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {offerProducts.map((p, idx) => {
            const stock = stockStatuses[idx] || { sold: 20, available: 50 };
            const progressPercent = (stock.sold / stock.available) * 100;
            const liked = isInWishlist(p.id);

            return (
              <div 
                key={p.id}
                className="bg-white border border-gray-100 rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 relative shadow-sm hover:shadow-md hover:border-gray-200 transition-all"
              >
                {/* Sale Badge */}
                {p.discount && (
                  <span className="absolute top-4 left-4 bg-brand-red text-white text-[10px] font-black py-1 px-2.5 rounded-sm uppercase z-10">
                    -{p.discount}% OFF
                  </span>
                )}

                {/* Left side: Thumbnail image */}
                <div className="w-full sm:w-44 aspect-square flex items-center justify-center bg-gray-50 rounded-lg p-4 relative group">
                  <Link href={`/product/${p.slug || p.id}`} className="w-full h-full flex items-center justify-center">
                    <img 
                      src={p.image}
                      alt={p.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  
                  {/* Floating Action list */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-lg">
                    <Link
                      href={`/product/${p.slug || p.id}`}
                      className="w-9 h-9 rounded-full bg-white text-brand-navy border border-gray-100 flex items-center justify-center hover:bg-brand-red hover:text-white transition-all shadow-md"
                      title="View Details"
                    >
                      <Eye className="w-4.5 h-4.5" />
                    </Link>
                    <button
                      onClick={() => addToCart(p, 1)}
                      className="w-9 h-9 rounded-full bg-white text-brand-navy border border-gray-100 flex items-center justify-center hover:bg-brand-red hover:text-white transition-all shadow-md"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-4.5 h-4.5" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all shadow-md ${
                        liked ? "bg-red-50 border-brand-red text-brand-red" : "bg-white border-gray-100 text-gray-400 hover:text-brand-red"
                      }`}
                      title="Toggle Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Right side: Title, timer, progress bar, prices */}
                <div className="flex-1 w-full flex flex-col justify-between">
                  <div>
                    {/* Category */}
                    <span className="text-[10px] font-bold text-text-light uppercase tracking-widest block mb-1">
                      {p.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-base font-extrabold text-brand-navy hover:text-brand-red cursor-pointer transition-colors leading-snug line-clamp-1 mb-1 font-display">
                      <Link href={`/product/${p.slug || p.id}`}>
                        {p.name}
                      </Link>
                    </h3>

                    {/* Ratings */}
                    <div className="flex items-center gap-1 mb-3 text-yellow-400">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(p.rating) ? "fill-current" : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-text-light">
                        ({p.reviewsCount} reviews)
                      </span>
                    </div>

                    {/* Prices */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-lg font-black text-brand-red font-display">
                        Rs. {p.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </span>
                      {p.originalPrice && (
                        <span className="text-xs line-through text-text-light font-semibold">
                          Rs. {p.originalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </span>
                      )}
                    </div>

                    {/* Dynamic Countdown Timer Blocks */}
                    <div className="flex gap-1.5 mb-5 select-none">
                      <TimerBlock value={timeLeft.days} label="DAYS" />
                      <TimerBlock value={timeLeft.hours} label="HRS" />
                      <TimerBlock value={timeLeft.minutes} label="MIN" />
                      <TimerBlock value={timeLeft.seconds} label="SEC" />
                    </div>
                  </div>

                  {/* Stock sold bar progress */}
                  <div>
                    <div className="flex justify-between items-center text-[10px] font-bold text-text-muted mb-1.5 uppercase tracking-wider">
                      <span>Sold: <strong className="text-brand-navy">{stock.sold}</strong></span>
                      <span>Available: <strong className="text-brand-navy">{stock.available}</strong></span>
                    </div>
                    <div className="w-full h-1.75 bg-gray-150 rounded-full overflow-hidden mb-4">
                      <div 
                        style={{ width: `${progressPercent}%` }} 
                        className="bg-brand-red h-full rounded-full transition-all duration-1000"
                      />
                    </div>

                    {/* Quick Checkout Trigger */}
                    <button
                      onClick={() => addToCart(p, 1)}
                      className="w-full bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black py-2.5 rounded-sm flex items-center justify-center gap-1.5 transition-colors uppercase tracking-wider"
                    >
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </button>
                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

function TimerBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-brand-red text-white font-extrabold font-display text-sm w-9 h-9 rounded-sm flex items-center justify-center shadow-md">
        {value.toString().padStart(2, "0")}
      </div>
      <span className="text-[7.5px] font-bold text-text-light tracking-wider mt-1">{label}</span>
    </div>
  );
}

"use client";

import { motion, Variants } from "framer-motion";
import { Truck, ShieldCheck, Award, ThumbsUp } from "lucide-react";

type MarkerItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  glowClass: string;
};

export default function TrustMarkers() {
  const markers: MarkerItem[] = [
    {
      id: "delivery",
      title: "Fast/Free Delivery",
      subtitle: "All Over Nepal",
      description: "Enjoy complimentary, rapid, and fully insured shipping straight to your doorstep across the nation.",
      icon: Truck,
      accentColor: "from-amber-500 to-orange-600",
      glowClass: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]",
    },
    {
      id: "genuine",
      title: "Genuine Products",
      subtitle: "Top-Tier Brands",
      description: "Rest assured with 100% original, verified technology sourced directly from the world's most elite brands.",
      icon: ShieldCheck,
      accentColor: "from-blue-500 to-indigo-600",
      glowClass: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
    },
    {
      id: "warranty",
      title: "Warranty Applicable",
      subtitle: "For Every Product",
      description: "Shop with peace of mind. Every single item in our inventory comes backed by its official warranty coverage.",
      icon: Award,
      accentColor: "from-emerald-500 to-teal-600",
      glowClass: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
    },
    {
      id: "trusted",
      title: "Trusted Expertise",
      subtitle: "Over 10 Years Strong",
      description: "Partner with confidence. Serving Nepal's tech enthusiasts for over a decade with unmatched technical support.",
      icon: ThumbsUp,
      accentColor: "from-pink-500 to-rose-600",
      glowClass: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-20 relative overflow-hidden bg-brand-navy px-4 sm:px-6 font-sans">
      {/* Decorative premium radial gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-brand-red/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-brand-red/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      
      {/* Dynamic grid mesh overlay for premium high-tech look */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Animated Banner Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-xs font-black uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
            Warrantore Promise
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-none">
            Why Shop With <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-400">Us?</span>
          </h2>
          <p className="text-sm text-gray-400 mt-4 max-w-md mx-auto font-medium">
            We bridge the gap between premium global tech and Nepalese consumers with elite quality, authenticity, and unparalleled service.
          </p>
        </div>

        {/* Feature Markers Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {markers.map((marker) => {
            const IconComponent = marker.icon;
            return (
              <motion.div
                key={marker.id}
                variants={itemVariants}
                className="group relative h-full"
              >
                {/* Neon glow effect container */}
                <div className={`absolute inset-0 bg-transparent rounded-2xl transition-all duration-500 ease-out -z-10 ${marker.glowClass}`} />

                {/* Main Card Component */}
                <div className="h-full bg-brand-navy-light/40 hover:bg-brand-navy-light/60 backdrop-blur-xl border border-white/5 group-hover:border-brand-red/30 rounded-2xl p-6 lg:p-8 flex flex-col justify-between transition-all duration-300 shadow-2xl relative overflow-hidden group-hover:-translate-y-2 cursor-default">
                  
                  {/* Visual Accent Corner Border highlight */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-red/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div>
                    {/* Icon container with matching dynamic color gradient */}
                    <div className="relative mb-6 inline-flex">
                      <div className={`absolute inset-0 bg-gradient-to-br ${marker.accentColor} rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition-opacity duration-300`} />
                      <div className={`relative w-14 h-14 rounded-2xl bg-brand-navy-light border border-white/10 flex items-center justify-center text-white bg-gradient-to-br from-brand-navy-light to-brand-navy-light/80 group-hover:border-white/20 transition-colors`}>
                        <IconComponent className="w-6 h-6 transition-all duration-300 group-hover:scale-110 text-brand-red" />
                      </div>
                    </div>

                    {/* Content Texts */}
                    <span className="text-[10px] font-black uppercase tracking-wider text-brand-red block mb-1">
                      {marker.subtitle}
                    </span>
                    
                    <h3 className="text-xl font-display font-black text-white tracking-tight mb-3">
                      {marker.title}
                    </h3>
                    
                    <p className="text-xs text-gray-400 leading-relaxed font-medium">
                      {marker.description}
                    </p>
                  </div>

                  {/* Micro-interaction indicator bar at the bottom */}
                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-brand-red transition-colors">
                      Verified Standard
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-brand-red transition-colors group-hover:scale-150 duration-300" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

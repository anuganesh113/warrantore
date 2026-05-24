"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Import brand image assets
import acerLogo from "@/images/brands/acer.webp";
import asusLogo from "@/images/brands/asus.webp";
import dellLogo from "@/images/brands/dell.webp";
import lenovoLogo from "@/images/brands/lenovo.webp";
import miLogo from "@/images/brands/mi.webp";
import samsungLogo from "@/images/brands/samsung.avif";

type Brand = {
  id: string;
  name: string;
  logo: React.ReactNode;
};

export default function BrandLogos() {
  const brands: Brand[] = [
    {
      id: "samsung",
      name: "Samsung",
      logo: (
        <div className="relative w-40 h-16 flex items-center justify-center">
          <Image 
            src={samsungLogo} 
            alt="Samsung Logo" 
            className="object-contain max-h-full"
            placeholder="blur"
          />
        </div>
      ),
    },
    {
      id: "asus",
      name: "ASUS",
      logo: (
        <div className="relative w-40 h-16 flex items-center justify-center">
          <Image 
            src={asusLogo} 
            alt="ASUS Logo" 
            className="object-contain max-h-full"
            placeholder="blur"
          />
        </div>
      ),
    },
    {
      id: "dell",
      name: "Dell",
      logo: (
        <div className="relative w-28 h-12 flex items-center justify-center">
          <Image 
            src={dellLogo} 
            alt="Dell Logo" 
            className="object-contain max-h-full"
            placeholder="blur"
          />
        </div>
      ),
    },
    {
      id: "lenovo",
      name: "Lenovo",
      logo: (
        <div className="relative w-40 h-16 flex items-center justify-center">
          <Image 
            src={lenovoLogo} 
            alt="Lenovo Logo" 
            className="object-contain max-h-full"
            placeholder="blur"
          />
        </div>
      ),
    },
    {
      id: "acer",
      name: "Acer",
      logo: (
        <div className="relative w-36 h-14 flex items-center justify-center">
          <Image 
            src={acerLogo} 
            alt="Acer Logo" 
            className="object-contain max-h-full"
            placeholder="blur"
          />
        </div>
      ),
    },
    {
      id: "xiaomi",
      name: "Xiaomi",
      logo: (
        <div className="relative w-16 h-16 flex items-center justify-center">
          <Image 
            src={miLogo} 
            alt="Xiaomi Mi Logo" 
            className="object-contain max-h-full"
            placeholder="blur"
          />
        </div>
      ),
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-b border-gray-100 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-brand-navy mb-2">
            Shop by Brands
          </h2>
          <p className="text-xs sm:text-sm text-text-muted font-medium">
            Explore premium gadgets, setups, and smart solutions from top global manufacturers
          </p>
        </div>

        {/* Minimal Colorful Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-12 gap-y-10 items-center justify-items-center">
          {brands.map((brand) => (
            <motion.div
              key={brand.id}
              whileHover={{ scale: 1.1 }}
              className="relative flex items-center justify-center cursor-pointer transition-all w-full max-w-[180px]"
            >
              {/* Brand Visual Logo */}
              <div className="flex items-center justify-center opacity-90 hover:opacity-100 transition-all duration-300 h-20 w-full">
                {brand.logo}
              </div>

              {/* Click Link Overlay */}
              <Link 
                href={`/shop?brand=${brand.name}`}
                className="absolute inset-0 z-10"
                aria-label={`Explore ${brand.name} collection`}
              />
            </motion.div>
          ))}
        </div>

        {/* Premium "View all Brands" Action Button */}
        <div className="text-center mt-14">
          <Link 
            href="/shop"
            className="group inline-flex items-center gap-2 px-8 py-3.5 border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-display font-black text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-brand-red/20 cursor-pointer"
          >
            View all Brands
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth={2.5} 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

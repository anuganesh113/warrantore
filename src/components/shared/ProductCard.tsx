"use client";

import { useCart } from "@/lib/CartContext";
import { Product } from "@/lib/products";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Eye, Heart } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const liked = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white border border-gray-100 rounded-lg p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-gray-200 text-text-dark font-sans select-none min-h-[340px]"
    >
      {/* Badges & Wishlist Trigger */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
        {product.discount ? (
          <span className="py-1 px-2.5 bg-brand-red text-white text-[10px] font-black rounded-sm tracking-wider uppercase">
            -{product.discount}%
          </span>
        ) : (
          <span className="py-1 px-2.5 bg-brand-navy text-white text-[10px] font-black rounded-sm tracking-wider uppercase">
            Sale
          </span>
        )}

        <button
          onClick={handleWishlist}
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
            liked
              ? "bg-red-50 border-brand-red text-brand-red scale-105"
              : "bg-white border-gray-250 text-gray-400 hover:text-brand-red hover:border-brand-red"
          }`}
          title={liked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Product Image section with sliding hover tools overlay */}
      <div className="relative w-full h-40 mb-3 mt-4 flex items-center justify-center overflow-hidden bg-gray-50/50 rounded-lg p-1.5">
        <Link href={`/product/${product.slug || product.id}`} className="w-full h-full flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-500"
          />
        </Link>

        {/* Hover Quick Tools Sliding Overlay */}
        <div
          className={`absolute inset-x-0 bottom-3 flex justify-center gap-2 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <Link
            href={`/product/${product.slug || product.id}`}
            className="w-10 h-10 rounded-full bg-white hover:bg-brand-red hover:text-white border border-gray-100 text-brand-navy shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            title="View Details"
          >
            <Eye className="w-4.5 h-4.5" />
          </Link>
          
          <button
            onClick={handleAddToCart}
            className="w-10 h-10 rounded-full bg-white hover:bg-brand-red hover:text-white border border-gray-100 text-brand-navy shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-start">
        <div>
          {/* Category */}
          <span className="text-[10px] font-bold text-text-light uppercase tracking-widest block mb-1">
            {product.category}
          </span>

          {/* Title */}
          <h3 className="text-sm font-bold text-brand-navy leading-snug line-clamp-2 hover:text-brand-red cursor-pointer transition-colors mb-2">
            <Link href={`/product/${product.slug || product.id}`}>
              {product.name}
            </Link>
          </h3>
        </div>

        {/* Pricing Area */}
        <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-gray-50">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-black text-brand-red font-display">
              Rs. {product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
            {product.originalPrice && (
              <span className="text-xs line-through text-text-light font-semibold">
                Rs. {product.originalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

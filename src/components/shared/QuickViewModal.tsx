"use client";

import { useCart } from "@/lib/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ShoppingBag, CreditCard, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  // Reset states when product changes
  useEffect(() => {
    if (quickViewProduct) {
      setActiveImageIndex(0);
      setQuantity(1);
      if (quickViewProduct.colors && quickViewProduct.colors.length > 0) {
        setSelectedColor(quickViewProduct.colors[0].name);
      } else {
        setSelectedColor("");
      }
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor || undefined);
    setQuickViewProduct(null); // Close modal
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal content container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 250 }}
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none text-text-dark"
        >
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-brand-red hover:text-white text-gray-500 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Image Gallery */}
          <div className="flex-1 bg-gray-50 p-6 flex flex-col justify-between relative min-h-[300px] md:min-h-[450px]">
            {/* Discount Badge */}
            {product.discount && (
              <span className="absolute top-6 left-6 py-1 px-3 bg-brand-red text-white text-xs font-bold rounded-md z-10">
                {product.discount}% OFF
              </span>
            )}

            {/* Main Image */}
            <div className="relative flex-1 flex items-center justify-center p-4">
              <div className="relative w-full h-[220px] md:h-[300px] flex items-center justify-center">
                <img
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain mix-blend-multiply"
                />
              </div>

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 p-1.5 rounded-full bg-white border border-gray-200 shadow-md text-gray-700 hover:bg-brand-red hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 p-1.5 rounded-full bg-white border border-gray-200 shadow-md text-gray-700 hover:bg-brand-red hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails list */}
            {product.images.length > 1 && (
              <div className="flex gap-2 justify-center mt-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 bg-white p-1 flex items-center justify-center transition-all ${
                      idx === activeImageIndex ? "border-brand-red scale-105" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img src={img} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Specs & Actions */}
          <div className="flex-1 p-8 overflow-y-auto max-h-[50vh] md:max-h-[80vh] flex flex-col justify-between">
            <div>
              {/* Category */}
              <span className="text-xs font-bold text-brand-red tracking-wider uppercase">
                {product.category}
              </span>

              {/* Title */}
              <h2 className="text-2xl font-bold mt-1 text-brand-navy leading-tight font-display">
                {product.name}
              </h2>

              {/* Ratings */}
              <div className="flex items-center gap-4 mt-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-text-muted">
                  {product.rating} ({product.reviewsCount} reviews)
                </span>
                <span className="text-xs py-0.5 px-2 bg-green-50 text-green-700 font-semibold border border-green-200 rounded">
                  {product.inStock > 0 ? `${product.inStock} In Stock` : "Out of stock"}
                </span>
              </div>

              {/* Divider */}
              <hr className="my-4 border-gray-100" />

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-brand-red font-display">
                  Rs. {product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
                {product.originalPrice && (
                  <span className="text-sm line-through text-text-light font-medium">
                    Rs. {product.originalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-sm text-text-muted leading-relaxed mt-4">
                {product.description}
              </p>

              {/* Swatch Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-5">
                  <span className="text-xs font-bold uppercase text-brand-navy tracking-wider block mb-2">
                    Color: <span className="text-text-muted font-normal capitalize">{selectedColor}</span>
                  </span>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        style={{ backgroundColor: c.hex }}
                        className={`w-8 h-8 rounded-full border border-gray-200 relative flex items-center justify-center transition-all ${
                          selectedColor === c.name
                            ? "ring-2 ring-brand-red ring-offset-2 scale-105"
                            : "hover:scale-105"
                        }`}
                        title={c.name}
                      >
                        {selectedColor === c.name && (
                          <Check className={`w-4 h-4 ${c.hex === "#FFFFFF" ? "text-black" : "text-white"}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Specs Grid */}
              {product.specs && product.specs.length > 0 && (
                <div className="mt-5 bg-gray-50 p-4 rounded-xl">
                  <span className="text-xs font-bold uppercase text-brand-navy tracking-wider block mb-2">
                    Specifications
                  </span>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    {product.specs.map((spec) => (
                      <div key={spec.label} className="border-b border-gray-200/50 pb-1">
                        <span className="text-text-light block">{spec.label}</span>
                        <span className="text-brand-navy font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex gap-3">
                {/* Quantity input */}
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-12 bg-gray-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-full font-bold text-gray-500 hover:bg-gray-100 hover:text-black transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-brand-navy">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-full font-bold text-gray-500 hover:bg-gray-100 hover:text-black transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  disabled={product.inStock <= 0}
                  className="flex-1 bg-brand-red hover:bg-brand-red-hover text-white rounded-lg flex items-center justify-center gap-2 font-bold transition-all hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed h-12"
                >
                  <ShoppingBag className="w-5 h-5" />
                  ADD TO CART
                </button>
              </div>

              {/* Buy It Now */}
              <button
                onClick={() => {
                  addToCart(product, quantity, selectedColor || undefined);
                  setQuickViewProduct(null);
                }}
                disabled={product.inStock <= 0}
                className="w-full bg-brand-navy hover:bg-brand-navy-light text-white rounded-lg flex items-center justify-center gap-2 font-bold h-12 transition-all"
              >
                <CreditCard className="w-5 h-5" />
                BUY IT NOW
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

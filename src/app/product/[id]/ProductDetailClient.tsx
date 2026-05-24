"use client";

import { useCart } from "@/lib/CartContext";
import { Product, products } from "@/lib/products";
import ProductCard from "@/components/shared/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  ShoppingBag, 
  CreditCard, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Heart, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  MessageSquare,
  Sparkles,
  ArrowRight,
  MapPin,
  ZoomIn,
  X
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "shipping">("desc");

  // Zoom states
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Related products (same category, excluding current product. Falls back to/complements with other featured products if needed)
  const relatedProducts = (() => {
    const categoryProducts = products.filter(
      (p) => p.category === product.category && p.id !== product.id
    );
    const result = [...categoryProducts];
    if (result.length < 8) {
      const otherProducts = products
        .filter((p) => p.id !== product.id && p.category !== product.category)
        .sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      for (const other of otherProducts) {
        if (result.length >= 8) break;
        result.push(other);
      }
    }
    return result.slice(0, 8);
  })();

  const relatedCarouselRef = useRef<HTMLDivElement>(null);

  // Set default color & reset zoom states
  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
    setIsZoomed(false);
    setIsLightboxOpen(false);
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0].name);
    } else {
      setSelectedColor("");
    }
  }, [product]);

  // Lightbox keyboard navigation & escape close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, product.images.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor || undefined);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor || undefined);
    // Auto trigger cart sidebar / checkout flow
    if (typeof window !== 'undefined') {
      // Small timeout to let cart update and then open cart drawer via customized event or direct layout action
      const cartToggleBtn = document.querySelector('[title="Cart"]') || document.querySelector('button[class*="ShoppingBag"]');
      if (cartToggleBtn) {
        (cartToggleBtn as HTMLButtonElement).click();
      }
    }
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (relatedCarouselRef.current) {
      const scrollAmount = 300;
      relatedCarouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const liked = isInWishlist(product.id);

  // Hardcoded mock premium reviews
  const mockReviews = [
    {
      id: "r1",
      author: "Binod Adhikari",
      rating: 5,
      date: "May 12, 2026",
      verified: true,
      comment: "Absolutely top tier quality! Super fast delivery inside Kathmandu Valley (received in less than 12 hours). The product packaging was robust and flawless. Highly recommended Electon for original premium tech products.",
    },
    {
      id: "r2",
      author: "Pooja Shrestha",
      rating: 5,
      date: "April 28, 2026",
      verified: true,
      comment: "Genuine product with valid warranty. I was a bit skeptical about delivery in Pokhara, but it arrived safe and sound within 2 days. The specs sheet matches 100%.",
    },
    {
      id: "r3",
      author: "Rohan Tamang",
      rating: 4,
      date: "April 15, 2026",
      verified: true,
      comment: "Value for money gadget. Works brilliantly and the build quality is stellar. Customer support was helpful in guiding me on color choices.",
    }
  ];

  return (
    <div className="bg-white font-sans text-text-dark pb-20 select-none">
      
      {/* 1. BREADCRUMBS */}
      <div className="bg-[#F8F9FA] border-b border-gray-150 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-text-light">
          <Link href="/" className="hover:text-brand-red transition-colors font-semibold">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-brand-red transition-colors font-semibold">Shop</Link>
          <span>/</span>
          <span className="text-text-muted capitalize font-semibold">{product.category}</span>
          <span>/</span>
          <span className="text-brand-navy font-bold line-clamp-1">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* 2. LEFT: Image Slider Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="bg-[#F9FAFB] border border-gray-100 rounded-2xl p-6 sm:p-10 relative overflow-hidden flex items-center justify-center min-h-[380px] sm:min-h-[480px] group">
              
              {/* Discount Tag */}
              {product.discount && !isZoomed && (
                <span className="absolute top-6 left-6 py-1 px-3 bg-brand-red text-white text-xs font-black rounded uppercase tracking-wider shadow-sm z-10">
                  -{product.discount}% Off
                </span>
              )}

              {/* Main Image View with Hover Zoom & Click Lightbox */}
              <div 
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onClick={() => setIsLightboxOpen(true)}
                className="relative w-full h-[280px] sm:h-[380px] flex items-center justify-center overflow-hidden cursor-zoom-in"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ 
                      opacity: 1, 
                      scale: isZoomed ? 2.2 : 1 
                    }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ 
                      scale: { duration: 0.15, ease: "easeOut" },
                      opacity: { duration: 0.2 }
                    }}
                    style={{
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    }}
                    src={product.images[activeImageIndex]}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain mix-blend-multiply pointer-events-none select-none"
                  />
                </AnimatePresence>

                {/* Subtle visual cues for interactive features */}
                {!isZoomed && (
                  <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-xs border border-gray-200/80 p-2.5 rounded-full shadow-sm text-brand-navy pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Left/Right Navigation buttons inside main view */}
              {product.images.length > 1 && !isZoomed && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 p-2.5 rounded-full bg-white border border-gray-200 shadow-md text-brand-navy hover:bg-brand-red hover:text-white transition-colors z-10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 p-2.5 rounded-full bg-white border border-gray-200 shadow-md text-brand-navy hover:bg-brand-red hover:text-white transition-colors z-10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails Row */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-1 justify-start">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 bg-[#F9FAFB] p-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      idx === activeImageIndex 
                        ? "border-brand-red scale-105 shadow-md" 
                        : "border-gray-250 hover:border-gray-300"
                    }`}
                  >
                    <img src={img} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. RIGHT: Product description and actions */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Category and stock */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] bg-brand-red text-white py-1 px-2.5 rounded-sm uppercase tracking-widest font-black">
                {product.category}
              </span>
              <span className={`text-xs py-1 px-3 rounded-full font-bold flex items-center gap-1.5 ${
                product.inStock > 0 
                  ? "bg-green-50 text-green-700 border border-green-200" 
                  : "bg-red-50 text-red-600 border border-red-200"
              }`}>
                <Check className="w-3.5 h-3.5" />
                {product.inStock > 0 ? `In Stock (${product.inStock} items)` : "Out of Stock"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl font-black text-brand-navy font-display leading-tight uppercase">
              {product.name}
            </h1>

            {/* Ratings & reviews count */}
            <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? "fill-current" : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-text-muted">
                {product.rating} / 5.0
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-xs font-bold text-brand-red flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" /> {product.reviewsCount} verified reviews
              </span>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-4 mt-2">
              <span className="text-3xl sm:text-4xl font-black text-brand-red font-display">
                Rs. {product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-base line-through text-text-light font-bold">
                    Rs. {product.originalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] font-black bg-brand-navy text-white py-0.5 px-1.5 rounded-sm">
                    SAVE Rs. {(product.originalPrice - product.price).toLocaleString("en-US", { maximumFractionDigits: 2 })}
                  </span>
                </>
              )}
            </div>

            {/* Nepal delivery banner */}
            <div className="bg-[#FFF8EA] border border-orange-200/50 rounded-xl p-4 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-brand-navy flex items-center gap-1 uppercase tracking-wide">
                  <MapPin className="w-3.5 h-3.5 text-brand-red" /> Delivery All Over Nepal
                </p>
                <p className="text-[11px] text-text-muted font-bold mt-0.5">
                  Kathmandu Valley in 24 Hours. Cash on delivery accepted. 🚚
                </p>
              </div>
            </div>

            {/* Short description */}
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-semibold">
              {product.description}
            </p>

            {/* Colors Option Swatch */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-2">
                <span className="text-xs font-bold uppercase text-brand-navy tracking-wider block mb-2">
                  Select Color: <span className="text-brand-red font-black capitalize">{selectedColor}</span>
                </span>
                <div className="flex gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-9 h-9 rounded-full border border-gray-300 relative flex items-center justify-center transition-all ${
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

            {/* Actions: quantity, AddToCart, BuyNow, Wishlist */}
            <div className="mt-4 flex flex-col gap-4 border-t border-b border-gray-100 py-6">
              <div className="flex gap-4">
                
                {/* Quantity input */}
                <div className="flex items-center border border-gray-250 rounded-lg overflow-hidden h-12 bg-gray-50 flex-shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-11 h-full font-black text-gray-500 hover:bg-gray-150 hover:text-black transition-colors"
                  >
                    -
                  </button>
                  <span className="w-11 text-center font-black text-sm text-brand-navy">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-11 h-full font-black text-gray-500 hover:bg-gray-150 hover:text-black transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  disabled={product.inStock <= 0}
                  className="flex-1 bg-brand-red hover:bg-brand-red-hover text-white rounded-lg flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest transition-all hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed h-12"
                >
                  <ShoppingBag className="w-4.5 h-4.5" /> Add to Cart
                </button>

                {/* Wishlist button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-all flex-shrink-0 ${
                    liked
                      ? "bg-red-50 border-brand-red text-brand-red scale-105"
                      : "bg-white border-gray-250 text-gray-400 hover:text-brand-red hover:border-brand-red"
                  }`}
                  title={liked ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                </button>
              </div>

              {/* Buy It Now */}
              <button
                onClick={handleBuyNow}
                disabled={product.inStock <= 0}
                className="w-full bg-brand-navy hover:bg-brand-navy-light text-white rounded-lg flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest h-12 transition-all shadow-md"
              >
                <CreditCard className="w-4.5 h-4.5" /> Buy It Now
              </button>
            </div>

            {/* Quick trust assurances */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold text-text-muted mt-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-red" />
                <span>1 Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-brand-red" />
                <span>7 Days Easy Return</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-red" />
                <span>100% Genuine Tech</span>
              </div>
            </div>

          </div>

        </div>

        {/* 4. DETAILS ACCORDION / TABS PANEL */}
        <div className="mt-20 border border-gray-150 rounded-2xl overflow-hidden shadow-sm">
          {/* Header tabs */}
          <div className="bg-gray-50 flex border-b border-gray-150 text-xs font-black uppercase tracking-wider select-none">
            <button
              onClick={() => setActiveTab("desc")}
              className={`flex-1 py-4.5 text-center transition-all border-b-2 ${
                activeTab === "desc"
                  ? "border-brand-red bg-white text-brand-navy"
                  : "border-transparent text-text-light hover:text-brand-navy hover:bg-white/50"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`flex-1 py-4.5 text-center transition-all border-b-2 ${
                activeTab === "specs"
                  ? "border-brand-red bg-white text-brand-navy"
                  : "border-transparent text-text-light hover:text-brand-navy hover:bg-white/50"
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`flex-1 py-4.5 text-center transition-all border-b-2 ${
                activeTab === "shipping"
                  ? "border-brand-red bg-white text-brand-navy"
                  : "border-transparent text-text-light hover:text-brand-navy hover:bg-white/50"
              }`}
            >
              Shipping & Returns
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8 sm:p-10 bg-white">
            <AnimatePresence mode="wait">
              {activeTab === "desc" && (
                <motion.div
                  key="desc"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="prose max-w-none text-xs sm:text-sm text-text-muted leading-relaxed font-semibold flex flex-col gap-4"
                >
                  <p>{product.description}</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                  <p>
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Proin ac eros ac sem hendrerit molestie at a purus.
                  </p>
                </motion.div>
              )}

              {activeTab === "specs" && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="w-full flex flex-col gap-2"
                >
                  {product.specs && product.specs.length > 0 ? (
                    <div className="border border-gray-150 rounded-xl overflow-hidden">
                      <table className="w-full text-xs sm:text-sm text-left">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-150 font-black text-brand-navy uppercase tracking-wider">
                            <th className="py-4 px-6">Specification</th>
                            <th className="py-4 px-6">Details</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-150 font-semibold text-text-muted">
                          {product.specs.map((spec) => (
                            <tr key={spec.label} className="hover:bg-gray-50/50 transition-colors">
                              <td className="py-4 px-6 text-brand-navy font-bold">{spec.label}</td>
                              <td className="py-4 px-6">{spec.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-text-light font-bold">No specs available for this product.</p>
                  )}
                </motion.div>
              )}

              {activeTab === "shipping" && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs sm:text-sm text-text-muted leading-relaxed font-semibold flex flex-col gap-6"
                >
                  <div>
                    <h4 className="text-sm font-black text-brand-navy uppercase tracking-wider mb-2">🇳🇵 Shipping All Over Nepal</h4>
                    <p>We partner with top logistic agencies in Nepal to deliver products safely at your doorstep.</p>
                    <ul className="list-disc pl-5 mt-2 flex flex-col gap-1.5">
                      <li><strong>Kathmandu Valley:</strong> Next day or same day delivery inside Ring Road. Standard charge: Rs. 1.00 (FREE over Rs. 5,000.00).</li>
                      <li><strong>Outside Valley:</strong> 2-4 business days. Secure cash on delivery available at selected major cities.</li>
                    </ul>
                  </div>
                  <hr className="border-gray-150" />
                  <div>
                    <h4 className="text-sm font-black text-brand-navy uppercase tracking-wider mb-2">🔄 Easy 7-Day Returns Guarantee</h4>
                    <p>Not satisfied with your product? Return it in original undamaged packing within 7 days for a hassle-free refund or swap. Brand seal should not be broken for items with dynamic product codes.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 5. CUSTOMER REVIEWS LISTING */}
        <div className="mt-20">
          <h2 className="text-xl sm:text-2xl font-black font-display text-brand-navy tracking-tight mb-8 flex items-center gap-2 uppercase">
            Customer Reviews ({product.reviewsCount})
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            
            {/* Reviews Summary block */}
            <div className="lg:col-span-4 bg-gray-50 border border-gray-100 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-5xl font-black text-brand-navy font-display">{product.rating}</span>
              <div className="flex text-yellow-400 mt-2.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? "fill-current" : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-text-light font-bold mt-2 uppercase tracking-wide">
                Average Rating based on {product.reviewsCount} reviews
              </p>

              {/* Review bars */}
              <div className="w-full mt-6 flex flex-col gap-2">
                {[
                  { stars: 5, pct: 85 },
                  { stars: 4, pct: 10 },
                  { stars: 3, pct: 3 },
                  { stars: 2, pct: 1 },
                  { stars: 1, pct: 1 }
                ].map((row) => (
                  <div key={row.stars} className="flex items-center gap-3 text-xs font-semibold text-text-muted">
                    <span className="w-3 text-right">{row.stars}★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div style={{ width: `${row.pct}%` }} className="bg-yellow-400 h-full rounded-full" />
                    </div>
                    <span className="w-7 text-right text-text-light">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed reviews list */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {mockReviews.map((r) => (
                <div key={r.id} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-black text-brand-navy">{r.author}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < r.rating ? "fill-current" : "text-gray-250"
                              }`}
                            />
                          ))}
                        </div>
                        {r.verified && (
                          <span className="text-[9px] bg-green-50 text-green-700 font-bold border border-green-200 py-0.5 px-2 rounded-sm uppercase tracking-wider">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-text-light font-semibold">{r.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-semibold">
                    {r.comment}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* 6. RELATED PRODUCTS SLIDER */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 border-t border-gray-150 pt-20">
            <div className="flex items-center justify-between gap-4 mb-10 select-none">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black font-display text-brand-navy tracking-tight uppercase">
                  Related Products
                </h2>
                <div className="w-12 h-1 bg-brand-red mt-3.5 rounded-full" />
              </div>

              {/* Slider Controls */}
              <div className="flex gap-2">
                <button
                  onClick={() => scrollCarousel("left")}
                  className="w-10 h-10 rounded-full border border-gray-250 flex items-center justify-center text-brand-navy bg-white hover:bg-brand-red hover:text-white hover:border-brand-red transition-all cursor-pointer shadow-sm active:scale-95"
                  title="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  className="w-10 h-10 rounded-full border border-gray-250 flex items-center justify-center text-brand-navy bg-white hover:bg-brand-red hover:text-white hover:border-brand-red transition-all cursor-pointer shadow-sm active:scale-95"
                  title="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Slider Container */}
            <div 
              ref={relatedCarouselRef}
              className="flex gap-6 overflow-x-auto pb-6 no-scrollbar scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {relatedProducts.map((p) => (
                <div key={p.id} className="w-[280px] flex-shrink-0 snap-start">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Lightbox / Fullscreen Gallery Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 md:p-6"
          >
            {/* Header: Title and Close button */}
            <div className="w-full flex items-center justify-between max-w-7xl">
              <span className="text-white text-xs font-black uppercase tracking-wider">
                {product.name}
              </span>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 text-white hover:text-brand-red transition-colors duration-200 cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Main Area: Image viewer with navigation */}
            <div className="relative flex-1 w-full max-w-6xl flex items-center justify-center my-4">
              {/* Left Button */}
              {product.images.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-0 md:left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10"
                  title="Previous (Arrow Left)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Main Lightbox Image with a subtle scale up animation */}
              <motion.div 
                key={activeImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full max-h-[70vh] flex items-center justify-center"
              >
                <img
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain select-none"
                />
              </motion.div>

              {/* Right Button */}
              {product.images.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-0 md:right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10"
                  title="Next (Arrow Right)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Footer: Bottom thumbnails */}
            {product.images.length > 1 && (
              <div className="w-full flex justify-center gap-3 overflow-x-auto py-4 max-w-2xl">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 bg-white p-1.5 flex items-center justify-center flex-shrink-0 transition-all ${
                      idx === activeImageIndex 
                        ? "border-brand-red scale-105 shadow-lg" 
                        : "border-transparent opacity-60 hover:opacity-100 hover:scale-102"
                    }`}
                  >
                    <img src={img} alt="" className="max-w-full max-h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

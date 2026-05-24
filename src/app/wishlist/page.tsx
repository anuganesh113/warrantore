"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/lib/CartContext";
import { products } from "@/lib/products";
import ProductCard from "@/components/shared/ProductCard";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist } = useCart();
  
  // Filter products in wishlist
  const likedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <main className="min-h-screen bg-white text-text-dark relative overflow-x-hidden">
      <Navbar />

      {/* Main Container */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto font-sans min-h-[60vh]">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-text-light mb-8 select-none">
          <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
          <span>/</span>
          <span className="text-brand-navy font-bold">Wishlist</span>
        </div>

        {/* Title */}
        <div className="border-b border-gray-100 pb-6 mb-10 flex items-center gap-3">
          <Heart className="w-8 h-8 text-brand-red fill-current" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-display text-brand-navy leading-none">
              Your Wishlist
            </h1>
            <p className="text-xs text-text-muted mt-1.5 font-semibold">
              Manage your favorite items and quick add them to your cart.
            </p>
          </div>
        </div>

        {likedProducts.length === 0 ? (
          /* Empty wishlist display */
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-brand-red mb-6">
              <Heart className="w-10 h-10 animate-pulse" />
            </div>
            <h2 className="text-lg font-bold text-brand-navy">Your wishlist is empty</h2>
            <p className="text-xs text-text-muted mt-2 max-w-xs leading-relaxed font-semibold">
              Fill it with premium smart gadgets, DSLR cameras, or ANC studio headphones from our store.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black py-3 px-8 rounded-sm uppercase tracking-widest shadow-md transition-colors"
            >
              Start Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {likedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "@/lib/CartContext";
import { products, Product } from "@/lib/products";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Heart, 
  Phone, 
  Headphones, 
  ChevronDown, 
  Menu as Hamburger,
  ArrowRight,
  TrendingUp,
  Tag
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import LoginRegisterModal from "@/components/shared/LoginRegisterModal";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { cartTotal, cartCount, wishlist, toggleCart } = useCart();
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Trust slide marquee index
  const [trustSlideIdx, setTrustSlideIdx] = useState(0);
  const trustMessages = [
    "⚡ FREE SHIPPING ON ORDERS OVER Rs. 5,000.00",
    "🔒 100% SECURE TRANSACTIONS & DATA ENCRYPTION",
    "🎁 GET GIFT VOUCHERS ON EVERY HOLIDAY SHOP",
    "⭐ 5-STAR RATED CUSTOMER SERVICE HELPLINE"
  ];

  // Auto slide trust messages
  useEffect(() => {
    const timer = setInterval(() => {
      setTrustSlideIdx((prev) => (prev + 1) % trustMessages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Handle Search logic
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered.slice(0, 5));
  }, [searchQuery]);

  // Click outside search listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = [
    { name: "Smartphones", slug: "smartphones" },
    { name: "Laptops", slug: "laptops" },
    { name: "Tablets", slug: "tablets" },
    { name: "Audio & Speakers", slug: "audio" },
    { name: "Smart Wearables", slug: "wearables" },
    { name: "DSLR Cameras", slug: "camera" },
    { name: "Home Appliances", slug: "home-appliance" }
  ];

  return (
    <header className="w-full relative z-40 bg-white font-sans text-text-dark">
      {/* 1. TOP BAR */}
      <div className="bg-[#F5F5F5] border-b border-gray-200 text-xs py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* Hotline */}
          <div className="flex items-center gap-2 text-text-muted">
            <Phone className="w-3.5 h-3.5 text-brand-red" />
            <span>Hotline: </span>
            <span className="font-bold text-brand-navy hover:text-brand-red transition-colors">
              (+80) 011 888 789
            </span>
          </div>

          {/* Today Promo */}
          <div className="hidden md:flex items-center gap-1.5 font-semibold text-brand-navy">
            <span className="bg-brand-red text-white py-0.5 px-2 rounded-sm text-[9px] uppercase tracking-wider">
              Deals
            </span>
            <Link href="/shop" className="hover:text-brand-red transition-colors flex items-center gap-1">
              Today Deals / Discount 70% off! Shop now <ArrowRight className="w-3 h-3 text-brand-red" />
            </Link>
          </div>

          {/* Account & Wishlist */}
          <div className="flex items-center gap-4 text-text-muted font-medium">
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="hover:text-brand-red transition-colors flex items-center gap-1"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign in</span>
            </button>
            <span className="text-gray-300">|</span>
            <Link href="/wishlist" className="hover:text-brand-red transition-colors flex items-center gap-1.5 relative group">
              <Heart className="w-3.5 h-3.5 group-hover:fill-brand-red group-hover:text-brand-red" />
              <span>Wishlist</span>
              {wishlist.length > 0 && (
                <span className="bg-brand-red text-white font-black rounded-full text-[9px] w-4.5 h-4.5 flex items-center justify-center -top-2.5 -right-3 absolute shadow-sm animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="py-5 px-4 sm:px-6 border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <img 
              src="/logo.webp" 
              alt="Electon Logo" 
              className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-brand-navy">
            <Link href="/" className={`${pathname === '/' ? 'text-brand-red' : ''} hover:text-brand-red transition-colors py-2 relative group`}>
              Home
              <span className={`absolute bottom-0 left-0 h-0.5 bg-brand-red transition-all ${pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
            <Link href="/shop" className={`${pathname.startsWith('/shop') || pathname.startsWith('/product') ? 'text-brand-red' : ''} hover:text-brand-red transition-colors py-2 relative group`}>
              Shop
              <span className={`absolute bottom-0 left-0 h-0.5 bg-brand-red transition-all ${pathname.startsWith('/shop') || pathname.startsWith('/product') ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
            <Link href="/about" className={`${pathname.startsWith('/about') ? 'text-brand-red' : ''} hover:text-brand-red transition-colors py-2 relative group`}>
              About
              <span className={`absolute bottom-0 left-0 h-0.5 bg-brand-red transition-all ${pathname.startsWith('/about') ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
            <Link href="/contact" className={`${pathname.startsWith('/contact') ? 'text-brand-red' : ''} hover:text-brand-red transition-colors py-2 relative group`}>
              Contact
              <span className={`absolute bottom-0 left-0 h-0.5 bg-brand-red transition-all ${pathname.startsWith('/contact') ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
            

          </nav>

          {/* Right Support Helpline */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-50 text-brand-red flex items-center justify-center border border-red-100">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-text-light uppercase tracking-wider">Helpline Support</p>
              <p className="text-sm font-extrabold text-brand-navy leading-none hover:text-brand-red transition-colors">(+80) 011 888 789</p>
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 text-brand-navy"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* 3. SUB-HEADER NAVY BAR */}
      <div className="bg-brand-navy text-white py-3 px-4 sm:px-6 border-b border-brand-red/10 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Top Categories Menu Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setCategoriesOpen(true)}
            onMouseLeave={() => setCategoriesOpen(false)}
          >
            <button className="flex items-center justify-between gap-3 bg-brand-red hover:bg-brand-red-hover text-white px-5 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-all shadow-md select-none h-11 w-[200px] sm:w-[220px]">
              <div className="flex items-center gap-2">
                <Hamburger className="w-4 h-4" />
                <span>Top Categories</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${categoriesOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {categoriesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-[200px] sm:w-[220px] bg-white border border-gray-100 shadow-2xl rounded-b-lg py-1 mt-0 z-50 text-text-dark font-semibold text-xs"
                >
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/shop?category=${c.slug}`}
                      className="block py-3 px-5 border-b border-gray-50 last:border-0 hover:bg-red-50 hover:text-brand-red transition-all"
                    >
                      {c.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Middle: Live Trust Slider */}
          <div className="hidden lg:flex items-center justify-center flex-1 h-11 overflow-hidden relative max-w-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={trustSlideIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="text-center font-display font-extrabold text-[10px] tracking-wider text-brand-red bg-white/5 py-1 px-4 rounded-full border border-white/5"
              >
                {trustMessages[trustSlideIdx]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Search + Cart */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1 lg:flex-none justify-end min-w-0">
            
            {/* Search Input Container */}
            <div ref={searchRef} className="relative shrink-0 w-[200px] sm:w-[250px] md:w-[320px]">
              <div className="flex bg-white rounded-md overflow-hidden h-11">
                <input
                  type="text"
                  placeholder="Find our product..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchFocused(true);
                  }}
                  onFocus={() => setSearchFocused(true)}
                  className="flex-1 bg-transparent border-0 text-text-dark placeholder-text-light text-xs pl-4 pr-2 focus:outline-none focus:ring-0"
                />
                <button 
                  onClick={() => setSearchFocused(true)}
                  className="bg-brand-red hover:bg-brand-red-hover text-white px-4 flex items-center justify-center transition-all"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>

              {/* Instant Search Results Panel */}
              <AnimatePresence>
                {searchFocused && (searchResults.length > 0 || searchQuery.trim() !== "") && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 bg-white border border-gray-100 shadow-2xl rounded-b-lg py-2 mt-1 z-50 text-text-dark font-medium"
                  >
                    {searchResults.length === 0 ? (
                      <div className="py-6 text-center text-xs text-text-light">
                        No results found for "{searchQuery}"
                      </div>
                    ) : (
                      <>
                        <div className="px-4 py-1.5 text-[10px] font-bold text-brand-navy bg-gray-50 flex items-center gap-1 uppercase tracking-wider">
                          <TrendingUp className="w-3.5 h-3.5 text-brand-red animate-pulse" /> Matching Products
                        </div>
                        {searchResults.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => {
                              router.push(`/product/${p.slug || p.id}`);
                              setSearchFocused(false);
                              setSearchQuery("");
                            }}
                            className="flex items-center gap-3 p-3 hover:bg-red-50 border-b border-gray-50 last:border-0 cursor-pointer transition-all"
                          >
                            <img src={p.image} className="w-8 h-8 object-contain bg-gray-50 rounded" />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-brand-navy truncate leading-snug">{p.name}</h4>
                              <p className="text-[10px] text-brand-red font-black mt-0.5">Rs. {p.price}</p>
                            </div>
                            <span className="text-[9px] bg-gray-100 text-text-muted py-0.5 px-2 rounded-sm uppercase font-bold">
                              {p.category}
                            </span>
                          </div>
                        ))}
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shopping Cart Button */}
            <button 
              onClick={toggleCart}
              className="flex flex-1 min-w-0 w-full items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white rounded-md px-4 h-11 font-bold text-xs uppercase tracking-wider transition-all shadow-md relative"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart /</span>
              <span className="font-extrabold font-display">
                Rs. {cartTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
              <span className="bg-white text-brand-red font-black rounded-full text-[9px] w-4.5 h-4.5 flex items-center justify-center absolute -top-1.5 -right-1.5 shadow-md">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAV MENU SLIDER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/50"
            />
            
            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="absolute inset-y-0 right-0 max-w-full flex"
            >
              <div className="w-screen max-w-xs bg-white shadow-2xl flex flex-col justify-between p-6">
                <div>
                  <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                    <span className="font-display font-black text-xl text-brand-navy">ELECTON MENU</span>
                    <button 
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <nav className="flex flex-col gap-5 text-sm font-bold text-brand-navy">
                    <Link href="/" className={`${pathname === '/' ? 'text-brand-red' : ''} hover:text-brand-red transition-all`} onClick={() => setMobileMenuOpen(false)}>
                      Home
                    </Link>
                    <Link href="/shop" className={`${pathname.startsWith('/shop') || pathname.startsWith('/product') ? 'text-brand-red' : ''} hover:text-brand-red transition-all`} onClick={() => setMobileMenuOpen(false)}>
                      Shop
                    </Link>
                    <Link href="/about" className={`${pathname.startsWith('/about') ? 'text-brand-red' : ''} hover:text-brand-red transition-all`} onClick={() => setMobileMenuOpen(false)}>
                      About
                    </Link>
                    <Link href="/contact" className={`${pathname.startsWith('/contact') ? 'text-brand-red' : ''} hover:text-brand-red transition-all`} onClick={() => setMobileMenuOpen(false)}>
                      Contact
                    </Link>
                  </nav>
                </div>
                
                <div className="border-t border-gray-100 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-50 text-brand-red flex items-center justify-center">
                      <Headphones className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-text-light uppercase tracking-wider">Helpline Support</p>
                      <p className="text-xs font-black text-brand-navy leading-none">(+80) 011 888 789</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <LoginRegisterModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
}

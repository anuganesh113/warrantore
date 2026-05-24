"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products, Product } from "@/lib/products";
import ProductCard from "@/components/shared/ProductCard";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, ArrowUpDown, Tag, Grid, RefreshCw } from "lucide-react";
import Link from "next/link";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialBrand = searchParams.get("brand") || "";

  // Helper to determine product brand
  const getProductBrand = (p: Product): string => {
    if (p.brand) return p.brand;
    const name = p.name.toLowerCase();
    if (name.includes("samsung") || name.includes("galaxy")) return "Samsung";
    if (name.includes("asus") || name.includes("zenbook")) return "ASUS";
    if (name.includes("dell") || name.includes("inspiron")) return "Dell";
    if (name.includes("lenovo") || name.includes("ideapad")) return "Lenovo";
    if (name.includes("acer") || name.includes("aspire")) return "Acer";
    if (name.includes("xiaomi") || name.includes("mi ")) return "Xiaomi";
    if (name.includes("apple") || name.includes("iphone") || name.includes("pro max") || name.includes("air buds")) return "Apple";
    if (name.includes("sony") || name.includes("playstation") || name.includes("play station") || name.includes("bassblast") || name.includes("studio pro")) return "Sony";
    if (name.includes("trimpro") || name.includes("mixer grinder")) return "Philips";
    return "Other";
  };

  // Real-time states
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [selectedSearch, setSelectedSearch] = useState<string>("");
  const [sortingOption, setSortingOption] = useState<string>("default");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Sync state if category or brand changes in URL
  useEffect(() => {
    setSelectedCategory(initialCategory);
    setSelectedBrand(initialBrand);
  }, [initialCategory, initialBrand]);

  // Handle Filtering & Sorting
  useEffect(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategory !== "") {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by Brand
    if (selectedBrand !== "") {
      result = result.filter(
        (p) => getProductBrand(p).toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    // Filter by Price Brackets
    if (selectedPriceRange !== "") {
      if (selectedPriceRange === "11990to30000") {
        result = result.filter((p) => p.price >= 11990 && p.price <= 30000);
      } else if (selectedPriceRange === "30000to50000") {
        result = result.filter((p) => p.price > 30000 && p.price <= 50000);
      } else if (selectedPriceRange === "50000to70000") {
        result = result.filter((p) => p.price > 50000 && p.price <= 70000);
      } else if (selectedPriceRange === "above70000") {
        result = result.filter((p) => p.price > 70000);
      }
    }

    // Filter by Most Searched
    if (selectedSearch !== "") {
      result = result.filter(
        (p) => 
          p.name.toLowerCase().includes(selectedSearch.toLowerCase()) || 
          (p.brand && p.brand.toLowerCase().includes(selectedSearch.toLowerCase())) ||
          p.category.toLowerCase().includes(selectedSearch.toLowerCase())
      );
    }

    // Sort by Options
    if (sortingOption === "priceLow") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortingOption === "priceHigh") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortingOption === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [selectedCategory, selectedBrand, selectedPriceRange, selectedSearch, sortingOption]);

  const categoriesList = [
    { label: "All Items", value: "" },
    { label: "All in 1 PC", value: "All in 1 PC" },
    { label: "Laptops", value: "Laptops" },
    { label: "Mobiles", value: "Smartphones" },
    { label: "Tablets", value: "Tablets" }
  ];

  const priceBrackets = [
    { label: "All Prices", value: "" },
    { label: "₨ 11,990 - ₨ 30,000", value: "11990to30000" },
    { label: "₨ 30,000 - ₨ 50,000", value: "30000to50000" },
    { label: "₨ 50,000 - ₨ 70,000", value: "50000to70000" },
    { label: "Above ₨ 70,000", value: "above70000" }
  ];

  const mostSearchedList = [
    { label: "All in One PC", value: "All in One PC" },
    { label: "Aspire", value: "Aspire" },
    { label: "Galaxy", value: "Galaxy" },
    { label: "Ideapad", value: "Ideapad" },
    { label: "Inspiron", value: "Inspiron" },
    { label: "Iphone", value: "Iphone" }
  ];

  const brandsList = [
    { label: "All Brands", value: "" },
    { label: "Samsung", value: "Samsung" },
    { label: "ASUS", value: "ASUS" },
    { label: "Dell", value: "Dell" },
    { label: "Lenovo", value: "Lenovo" },
    { label: "Acer", value: "Acer" },
    { label: "Xiaomi", value: "Xiaomi" },
    { label: "Apple", value: "Apple" },
    { label: "Sony", value: "Sony" },
    { label: "Philips", value: "Philips" }
  ];

  const clearAllFilters = () => {
    setSelectedCategory("");
    setSelectedBrand("");
    setSelectedPriceRange("");
    setSelectedSearch("");
    setSortingOption("default");
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto font-sans">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-text-light mb-8 select-none">
        <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
        <span>/</span>
        <span className="text-brand-navy font-bold">Catalog</span>
      </div>

      {/* 1. Shop Top Banner */}
      <div className="w-full bg-gradient-to-r from-brand-navy to-brand-navy-light text-white rounded-lg p-8 sm:p-10 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-red/10 via-transparent to-transparent opacity-60" />
        <div className="relative z-10">
          <span className="text-[10px] font-black text-brand-red uppercase tracking-widest block mb-2">
            Trending Audio Collection
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-display uppercase tracking-tight mb-2">
            Headphone collection
          </h2>
          <p className="text-xs text-gray-300 font-medium">
            Immerse yourself in spectacular spatial audio. Starting at just <strong className="text-brand-red font-black text-sm">Rs. 249.99</strong>.
          </p>
        </div>
        <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center bg-white/5 rounded-full p-2 border border-white/10 shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop" 
            className="max-w-[80%] max-h-[80%] object-contain"
          />
        </div>
      </div>

      {/* 2. Main Sidebar & Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Sidebar Filters */}
        <aside className="lg:col-span-3 flex flex-col gap-6 lg:sticky lg:top-4 bg-gray-50 border border-gray-100 p-6 rounded-lg shadow-sm">
          
          <div className="flex justify-between items-center border-b border-gray-200 pb-3.5">
            <h3 className="text-xs font-black text-brand-navy uppercase tracking-widest flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-brand-red" /> Filter Products
            </h3>
            {(selectedCategory || selectedBrand || selectedPriceRange || selectedSearch || sortingOption !== "default") && (
              <button 
                onClick={clearAllFilters}
                className="text-[10px] font-bold text-brand-red hover:text-brand-red-hover flex items-center gap-1 uppercase tracking-wider transition-colors"
              >
                <RefreshCw className="w-3 h-3 animate-spin" /> Clear
              </button>
            )}
          </div>

          {/* Categories Filter Links */}
          <div>
            <h4 className="text-[10px] font-black text-brand-navy uppercase tracking-widest block mb-3">
              Categories
            </h4>
            <div className="flex flex-col gap-2">
              {categoriesList.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setSelectedCategory(c.value)}
                  className={`text-left text-xs font-semibold py-2 px-3 rounded-sm transition-all flex items-center justify-between ${
                    selectedCategory === c.value
                      ? "bg-brand-red text-white font-bold"
                      : "text-text-muted hover:bg-red-50 hover:text-brand-red"
                  }`}
                >
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter Links */}
          <div className="border-t border-gray-200/60 pt-5">
            <h4 className="text-[10px] font-black text-brand-navy uppercase tracking-widest block mb-3">
              Price Range
            </h4>
            <div className="flex flex-col gap-2">
              {priceBrackets.map((pb) => (
                <button
                  key={pb.value}
                  onClick={() => setSelectedPriceRange(pb.value)}
                  className={`text-left text-xs font-semibold py-2 px-3 rounded-sm transition-all flex items-center justify-between ${
                    selectedPriceRange === pb.value
                      ? "bg-brand-red text-white font-bold"
                      : "text-text-muted hover:bg-red-50 hover:text-brand-red"
                  }`}
                >
                  <span>{pb.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Most Searched Filter Links */}
          <div className="border-t border-gray-200/60 pt-5">
            <h4 className="text-[10px] font-black text-brand-navy uppercase tracking-widest block mb-3">
              Most Searched
            </h4>
            <div className="flex flex-wrap gap-2">
              {mostSearchedList.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setSelectedSearch(selectedSearch === item.value ? "" : item.value)}
                  className={`whitespace-nowrap text-xs font-semibold py-1.5 px-3 rounded-full transition-all border ${
                    selectedSearch === item.value
                      ? "bg-brand-red border-brand-red text-white font-bold"
                      : "bg-white border-gray-200 text-text-muted hover:bg-red-50 hover:text-brand-red hover:border-brand-red"
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands Filter Links */}
          <div className="border-t border-gray-200/60 pt-5">
            <h4 className="text-[10px] font-black text-brand-navy uppercase tracking-widest block mb-3">
              Brands
            </h4>
            <div className="flex flex-wrap gap-2">
              {brandsList.filter(b => b.value !== "").map((b) => (
                <button
                  key={b.value}
                  onClick={() => setSelectedBrand(selectedBrand === b.value ? "" : b.value)}
                  className={`whitespace-nowrap text-xs font-semibold py-1.5 px-3 rounded-full transition-all border ${
                    selectedBrand === b.value
                      ? "bg-brand-red border-brand-red text-white font-bold"
                      : "bg-white border-gray-200 text-text-muted hover:bg-red-50 hover:text-brand-red hover:border-brand-red"
                  }`}
                >
                  <span>{b.label}</span>
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* RIGHT: Catalog Results List */}
        <div className="lg:col-span-9 flex flex-col gap-8 w-full">
          
          {/* Controls bar */}
          <div className="bg-gray-50 border border-gray-100 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm text-xs font-semibold">
            <div className="text-text-muted">
              Showing <span className="text-brand-navy font-bold">{filteredProducts.length}</span> matching products
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Sorting option */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-brand-red" />
                <span className="text-text-muted">Sort By:</span>
                <select
                  value={sortingOption}
                  onChange={(e) => setSortingOption(e.target.value)}
                  className="bg-white border border-gray-200 text-brand-navy text-xs rounded-sm py-1.5 px-3 focus:outline-none focus:border-brand-red/50 cursor-pointer font-bold"
                >
                  <option value="default">Featured / Default</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="rating">Rating: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Dynamic Grid list */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 bg-gray-50 border border-gray-100 rounded-lg text-center flex flex-col items-center justify-center p-8">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-brand-red mb-4">
                <Tag className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="text-base font-bold text-brand-navy">No products match your criteria</h3>
              <p className="text-xs text-text-muted mt-1 max-w-xs leading-relaxed font-semibold">
                Try selecting other categories or expanding your price ranges parameters.
              </p>
              <button 
                onClick={clearAllFilters}
                className="mt-6 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black py-2.5 px-6 rounded-sm uppercase tracking-widest shadow-md transition-colors"
              >
                Reset Catalog Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white text-text-dark relative overflow-x-hidden">
      <Navbar />
      <Suspense fallback={
        <div className="py-32 text-center text-xs font-bold text-brand-navy flex items-center justify-center gap-2">
          <div className="w-5 h-5 border-2 border-brand-red border-t-transparent rounded-full animate-spin" /> Loading Shop Catalog...
        </div>
      }>
        <ShopContent />
      </Suspense>
      <Footer />
    </main>
  );
}

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import LatestArrivals from "@/components/home/LatestArrivals";
import TrustMarkers from "@/components/home/TrustMarkers";
import ProductGrid from "@/components/home/ProductGrid";
import BrandLogos from "@/components/home/BrandLogos";
import LimitedOffers from "@/components/home/LimitedOffers";
import PromoBanner from "@/components/home/PromoBanner";
import CustomerTalks from "@/components/home/CustomerTalks";
import Footer from "@/components/layout/Footer";
import FloatingAssistant from "@/components/shared/FloatingAssistant";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-text-dark relative overflow-x-hidden">
      {/* 1. Header & Navigation Menu systems */}
      <Navbar />
      
      {/* 2. Hero Portable Device slide */}
      <Hero />
      
      {/* 3. Top pastel category directories */}
      <FeaturedCollections />

      {/* New Arrivals Showroom */}
      <LatestArrivals />

      {/* Premium Trust Markers & Value Promise Banner */}
      <TrustMarkers />
      
      {/* 4. Featured e-commerce items grid */}
      <ProductGrid />

      {/* 5. Sporting.com brand partners marquee */}
      <BrandLogos />

      {/* 6. Limited offers count-down boxes */}
      <LimitedOffers />

      {/* 7. Action camera smart GoPro showcase panel */}
      <PromoBanner />

      {/* 8. Testimonials slide and sign up newsletter grids */}
      <CustomerTalks />
      
      {/* 9. Navy Blue corporate footer directory */}
      <Footer />
      
      {/* 10. AI helper interactive button */}
      <FloatingAssistant />
    </main>
  );
}

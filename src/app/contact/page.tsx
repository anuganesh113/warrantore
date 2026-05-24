"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    alert(`Thank you for reaching out, ${formData.name}! Our customer support team will contact you shortly.`);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-white text-text-dark relative overflow-x-hidden">
      <Navbar />

      {/* Main Container */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto font-sans">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-text-light mb-8 select-none">
          <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
          <span>/</span>
          <span className="text-brand-navy font-bold">Contact Us</span>
        </div>

        {/* 1. Large Top Map Container */}
        <div className="w-full h-[350px] sm:h-[450px] rounded-lg overflow-hidden border border-gray-150 shadow-sm mb-16 relative bg-gray-50">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
            className="absolute inset-0 w-full h-full border-0 grayscale filter contrast-108"
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* 2. Form & Contacts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Query Form Sheet */}
          <div className="lg:col-span-7 bg-gray-50 border border-gray-100 p-8 sm:p-10 rounded-lg shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black font-display text-brand-navy mb-2 uppercase tracking-wide">
              Contact us
            </h2>
            <p className="text-xs text-text-muted font-semibold mb-8">
              Fill out the query form below, and we will get back to you within 24 business hours.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-brand-navy uppercase tracking-widest">
                    Your Name *
                  </label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name..."
                    className="bg-white border border-gray-200 rounded-sm py-3.5 px-5 text-xs focus:outline-none focus:border-brand-red/50 font-semibold"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-brand-navy uppercase tracking-widest">
                    Your Email *
                  </label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email..."
                    className="bg-white border border-gray-200 rounded-sm py-3.5 px-5 text-xs focus:outline-none focus:border-brand-red/50 font-semibold"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-brand-navy uppercase tracking-widest">
                  Phone Number
                </label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone number (optional)..."
                  className="bg-white border border-gray-200 rounded-sm py-3.5 px-5 text-xs focus:outline-none focus:border-brand-red/50 font-semibold"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-brand-navy uppercase tracking-widest">
                  Your Message *
                </label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your queries, requests, or claims details..."
                  className="bg-white border border-gray-200 rounded-sm py-3.5 px-5 text-xs focus:outline-none focus:border-brand-red/50 font-semibold min-h-[140px] resize-y"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black py-4 px-8 rounded-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-brand-red/20 mt-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>

          {/* RIGHT: Corporate Info Desk */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-gray-50 border border-gray-100 p-8 sm:p-10 rounded-lg shadow-sm">
              <h3 className="text-lg font-black font-display text-brand-navy mb-6 uppercase tracking-wide">
                Get In Touch
              </h3>
              
              <ul className="flex flex-col gap-6 text-xs text-text-muted font-semibold">
                <li className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-red-50 text-brand-red flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-navy uppercase tracking-wider mb-1">Office Location</h4>
                    <p className="leading-relaxed">100 Silver Lights Ave, Block B, Tech Hub State, USA</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-red-50 text-brand-red flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-navy uppercase tracking-wider mb-1">Telephones</h4>
                    <p className="leading-none hover:text-brand-red cursor-pointer transition-colors">(+80) 011 888 789</p>
                    <p className="leading-none text-text-light text-[10px] mt-1 font-bold">24H Automated Support</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-red-50 text-brand-red flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-navy uppercase tracking-wider mb-1">Corporate Emails</h4>
                    <p className="leading-none hover:text-brand-red cursor-pointer transition-colors">electon@smartstore.com</p>
                    <p className="leading-none hover:text-brand-red cursor-pointer transition-colors mt-2">support@electonshop.com</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-red-50 text-brand-red flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-navy uppercase tracking-wider mb-1">Opening Hours</h4>
                    <p className="leading-relaxed">Monday - Friday: 09:00 AM - 06:00 PM</p>
                    <p className="leading-relaxed text-text-light font-bold">Saturday & Sunday: Closed</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Social channels card */}
            <div className="bg-brand-navy text-white p-8 sm:p-10 rounded-lg shadow-md relative overflow-hidden flex flex-col justify-between h-[180px]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-red/15 via-transparent to-transparent opacity-50" />
              <div className="relative z-10">
                <h4 className="text-sm font-extrabold uppercase tracking-wider mb-2">Connect With Electon</h4>
                <p className="text-[10px] text-gray-300">Join our social networks and stay in tune with modern gadgets.</p>
              </div>
              <div className="flex gap-2.5 relative z-10">
                <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-red flex items-center justify-center text-white transition-all shadow-md" title="Facebook">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h2V1h-3C10.5 1 9 2.5 9 5v3z" />
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-red flex items-center justify-center text-white transition-all shadow-md" title="Twitter">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 4.56v.03c-.88.39-1.83.65-2.82.77 1.02-.61 1.8-1.57 2.17-2.72-.95.56-2 .97-3.13 1.2a4.93 4.93 0 00-8.39 4.49A13.98 13.98 0 011.67 3.15 4.93 4.93 0 003.2 9.72c-.79-.02-1.54-.24-2.19-.6v.06a4.93 4.93 0 003.95 4.83c-.7.19-1.44.22-2.15.09a4.93 4.93 0 004.6 3.42A9.9 9.9 0 010 19.54a13.94 13.94 0 007.55 2.21c9.06 0 14-7.5 14-14 0-.21 0-.42-.01-.63A9.98 9.98 0 0024 4.56z" />
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-red flex items-center justify-center text-white transition-all shadow-md" title="Instagram">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-red flex items-center justify-center text-white transition-all shadow-md" title="Youtube">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.002 3.002 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

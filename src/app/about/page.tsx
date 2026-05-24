"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Truck, Headphones, Award, Users } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingAssistant from "@/components/shared/FloatingAssistant";

export default function AboutPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const values = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Next-Gen Tech",
      desc: "We curate only the most advanced and innovative electronics on the market."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Authentic Quality",
      desc: "100% genuine products sourced directly from premium global manufacturers."
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Hyper-Fast Delivery",
      desc: "Streamlined logistics ensuring your new gadgets reach you in record time."
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "24/7 Expert Support",
      desc: "Our tech-savvy team is always ready to assist you with any inquiries."
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers", icon: <Users className="w-5 h-5" /> },
    { number: "10+", label: "Years Experience", icon: <Award className="w-5 h-5" /> },
    { number: "5,000+", label: "Premium Products", icon: <Zap className="w-5 h-5" /> }
  ];

  return (
    <main className="min-h-screen bg-[#F5F5F5] text-text-dark relative overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-brand-navy text-white overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-brand-red/20 via-brand-navy to-brand-navy opacity-80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.h1 
              variants={fadeIn}
              className="font-display font-black text-4xl md:text-6xl uppercase tracking-tight mb-6"
            >
              Engineering <span className="text-brand-red">The Future</span>
            </motion.h1>
            <motion.p 
              variants={fadeIn}
              className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed mb-8"
            >
              We are Warrantore. Born from a passion for bleeding-edge technology, our mission is to empower you with the most advanced smart devices, bridging the gap between imagination and reality.
            </motion.p>
          </motion.div>
        </div>

        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      </section>

      {/* Our Story Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <h2 className="font-display font-black text-3xl md:text-4xl text-brand-navy uppercase tracking-tight mb-6 relative inline-block">
                Our Story
                <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-brand-red" />
              </h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  What started in a small workshop as a relentless pursuit of the perfect smart home setup has evolved into a premier destination for top-tier electronics. We realized that finding truly innovative, high-quality tech without the jargon was harder than it should be.
                </p>
                <p>
                  Today, Warrantore stands as a beacon for tech enthusiasts and casual consumers alike. We don't just sell products; we curate experiences. Every item in our catalog is rigorously tested and hand-selected to ensure it meets our uncompromising standards for design, performance, and reliability.
                </p>
                <p className="font-bold text-brand-navy">
                  Welcome to the bleeding edge. Welcome to Warrantore.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group"
            >
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80" 
                alt="Technology Workspace" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-brand-navy py-16 border-y border-brand-red/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex flex-col items-center justify-center p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-red mb-4">
                  {stat.icon}
                </div>
                <h3 className="font-display font-black text-4xl text-white mb-2">{stat.number}</h3>
                <p className="text-gray-400 font-bold uppercase tracking-wider text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-black text-3xl md:text-4xl text-brand-navy uppercase tracking-tight mb-4">
              The Warrantore Advantage
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              We go beyond the transaction to provide a holistic, premium shopping experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 group"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-navy text-white flex items-center justify-center mb-6 group-hover:bg-brand-red transition-colors shadow-lg">
                  {val.icon}
                </div>
                <h3 className="font-bold text-brand-navy mb-3 uppercase tracking-wide text-sm">{val.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-brand-navy text-white p-12 rounded-3xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-red/30 via-transparent to-transparent opacity-80" />
          
          <div className="relative z-10">
            <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight mb-6">
              Ready to Upgrade?
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Discover our latest collection of premium smart devices and elevate your daily experience.
            </p>
            <Link 
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-brand-red/30"
            >
              Explore Collection
            </Link>
          </div>
        </motion.div>
      </section>
      
      <Footer />
      <FloatingAssistant />
    </main>
  );
}

"use client";

import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUpRight 
} from "lucide-react";

export default function Footer() {
  const directoryColumns = [
    {
      title: "Information",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Delivery Information", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms & Conditions", href: "#" },
        { label: "Return Policy", href: "#" }
      ]
    },
    {
      title: "My Account",
      links: [
        { label: "Support Center", href: "#" },
        { label: "Order Details", href: "#" },
        { label: "Wishlist Area", href: "/wishlist" },
        { label: "Comparison list", href: "#" },
        { label: "Shopping Cart", href: "#" }
      ]
    },
    {
      title: "Customer Care",
      links: [
        { label: "Contact Us", href: "/pages/contact-us" },
        { label: "Payment Policy", href: "#" },
        { label: "Refund Policy", href: "#" },
        { label: "Gift Cards System", href: "#" },
        { label: "Affiliate System", href: "#" }
      ]
    },
    {
      title: "Dealer Loyal",
      links: [
        { label: "Subscription", href: "#" },
        { label: "Product Guide", href: "#" },
        { label: "Partners", href: "#" },
        { label: "Contact Store", href: "/pages/contact-us" },
        { label: "Tech Support", href: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8 border-t border-white/5 relative overflow-hidden font-sans">
      {/* Curved background pattern decorative lines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-red via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 border-b border-white/10 pb-16">
          
          {/* Column 1: Exclusive Contact info */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white border-b border-brand-red pb-2 w-fit">
              Exclusive
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Experience next generation retail with Electon. Hand-picked tech products tailored for maximum comfort and style.
            </p>
            <ul className="flex flex-col gap-3.5 text-xs text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                <span>100 Silver Lights Ave, Block B, Tech Hub State, USA</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span className="font-bold hover:text-brand-red transition-colors cursor-pointer">
                  (+80) 011 888 789
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span className="hover:text-brand-red transition-colors cursor-pointer">
                  electon@smartstore.com
                </span>
              </li>
            </ul>
          </div>

          {/* Columns 2-5: Directory structures */}
          {directoryColumns.map((col, idx) => (
            <div key={idx} className="flex flex-col gap-6">
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-white border-b border-brand-red pb-2 w-fit">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3 text-xs text-gray-300">
                {col.links.map((link, lidx) => (
                  <li key={lidx}>
                    <Link 
                      href={link.href}
                      className="hover:text-brand-red transition-colors flex items-center gap-1 group w-fit"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all text-brand-red" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-400">
          {/* Copyright info */}
          <p>© {new Date().getFullYear()} Electon, Inc. All rights reserved.</p>

          {/* Logo Center */}
          <Link href="/" className="flex items-center gap-2 group">
            <img 
              src="/logo.webp" 
              alt="Electon Logo" 
              className="h-7 w-auto object-contain group-hover:scale-105 transition-transform duration-300 brightness-0 invert"
            />
          </Link>

          {/* Payment authorized badges in pure SVG */}
          <div className="flex items-center gap-2">
            <div className="bg-white px-2 py-1.5 rounded flex items-center justify-center border border-gray-100" title="Visa">
              <svg className="h-4 w-7 text-[#1A1F71] fill-current" viewBox="0 0 24 15">
                <path d="M9.13 13.92l1.63-9.75H13.4l-1.63 9.75H9.13zm8.99-9.52c-.39-.17-.99-.34-1.74-.34-1.92 0-3.27.99-3.28 2.4-.01 1.05.97 1.63 1.71 1.98.76.36 1.01.59 1.01.91 0 .49-.61.72-1.17.72-.78 0-1.21-.12-1.85-.39l-.26-.11-.27 1.64c.46.2.1.34 1.93.34 2.04 0 3.37-.98 3.39-2.5.02-1.25-.79-1.82-2.18-2.47-.69-.32-.94-.53-.94-.82 0-.49.56-.71 1.08-.71.63 0 1.09.12 1.44.26l.17.08.26-1.59zM22.56 4.17h-1.58c-.49 0-.86.14-1.07.63l-3.04 7.02h2.72l.54-1.46h3.32l.31 1.46h2.4L22.56 4.17zm-1.91 4.26l.96-2.58.55 2.58h-1.51zM6.43 4.17L3.89 10.9 3.61 9.53c-.48-1.57-1.96-3.27-3.61-4.11v.17l2.5 4.88-1.01 4.54-.04.16h2.64l4.28-9.92H6.43z" />
              </svg>
            </div>
            <div className="bg-white px-2 py-1.5 rounded flex items-center justify-center border border-gray-100" title="MasterCard">
              <svg className="h-4 w-7" viewBox="0 0 24 15">
                <circle cx="9" cy="7.5" r="6" fill="#EB001B" opacity="0.9" />
                <circle cx="15" cy="7.5" r="6" fill="#F79E1B" opacity="0.9" />
                <path d="M12 2.9a5.95 5.95 0 0 0 2.2 4.6 5.95 5.95 0 0 0-2.2 4.6 5.95 5.95 0 0 0-2.2-4.6 5.95 5.95 0 0 0 2.2-4.6z" fill="#FF5F00" />
              </svg>
            </div>
            <div className="bg-white px-2 py-1.5 rounded flex items-center justify-center border border-gray-100" title="PayPal">
              <svg className="h-4 w-7 text-[#003087] fill-current" viewBox="0 0 24 15">
                <path d="M5.52 13.9l1.83-11.1H11.5c2.47 0 3.73 1.09 3.51 2.45-.26 1.62-1.78 2.54-3.5 2.54H8.48l-.98 5.94H5.52zm8.79-7.98c.28-.18.53-.4.74-.66.69-.88.85-2.02.48-3.04C15.13 1.03 13.4 0 11.23 0H5.52c-.52 0-.96.38-1.04.89L2.03 14.1c-.04.28.16.53.45.53h3.58l.78-4.7c.07-.46.47-.79.94-.79h1.7c2.9 0 4.88-1.22 5.27-3.52.26-1.52-.16-2.51-1.07-3.15z" />
              </svg>
            </div>
            <div className="bg-white px-2 py-1.5 rounded flex items-center justify-center border border-gray-100" title="American Express">
              <svg className="h-4 w-7 text-[#006FCF] fill-current" viewBox="0 0 24 15">
                <rect width="24" height="15" rx="2" />
                <text x="12" y="10.5" fill="white" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">AMEX</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

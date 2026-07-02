import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { CartProvider } from "@/lib/CartContext";
import CartDrawer from "@/components/shared/CartDrawer";
import QuickViewModal from "@/components/shared/QuickViewModal";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap" 
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Warrantore - Premium Smart Electronics and Gadgets Store",
  description: "Clone of Electon7 Shop. Experience the next generation of smart tech, gadgets, cameras, and audio devices at best deals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-white text-text-dark font-sans antialiased selection:bg-brand-red/10 selection:text-brand-red",
          inter.variable,
          spaceGrotesk.variable
        )}
      >
        <CartProvider>
          {children}
          <CartDrawer />
          <QuickViewModal />
        </CartProvider>
      </body>
    </html>
  );
}

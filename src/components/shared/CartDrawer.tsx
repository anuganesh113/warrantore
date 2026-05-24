"use client";

import { useCart } from "@/lib/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
  } = useCart();

  const [notesOpen, setNotesOpen] = useState(false);
  const [orderNotes, setOrderNotes] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [showTermsWarning, setShowTermsWarning] = useState(false);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_LIMIT = 5000;
  const progressPercent = Math.min((cartTotal / FREE_SHIPPING_LIMIT) * 100, 100);
  const remainingForFreeShipping = Math.max(FREE_SHIPPING_LIMIT - cartTotal, 0);

  const handleCheckout = () => {
    if (!termsChecked) {
      setShowTermsWarning(true);
      return;
    }
    setShowTermsWarning(false);
    alert("Initiating secure checkout... (Demo System)");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden text-text-dark">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleCart}
          className="absolute inset-0 bg-black/55 backdrop-blur-xs"
        />

        {/* Slide-out drawer panel */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-red" />
                <h2 className="text-lg font-bold font-display text-brand-navy">
                  Shopping Cart ({cartCount})
                </h2>
              </div>
              <button
                onClick={toggleCart}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Tracker */}
            {cart.length > 0 && (
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                <p className="text-xs font-semibold text-text-muted mb-2">
                  {remainingForFreeShipping > 0 ? (
                    <>
                      Spend{" "}
                      <span className="text-brand-red font-bold">
                        Rs. {remainingForFreeShipping.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </span>{" "}
                      more for <span className="font-bold">FREE Shipping!</span>
                    </>
                  ) : (
                    <span className="text-green-600 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 inline" /> Congratulations! You've unlocked FREE shipping!
                    </span>
                  )}
                </p>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${progressPercent}%` }}
                    className="bg-brand-red h-full rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            )}

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
                  <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6 text-brand-red">
                    <ShoppingBag className="w-10 h-10 animate-bounce" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy">Your cart is empty</h3>
                  <p className="text-sm text-text-muted mt-2 max-w-xs">
                    You haven't added any products to your cart yet. Start exploring our premium collection!
                  </p>
                  <button
                    onClick={toggleCart}
                    className="mt-6 py-3 px-8 bg-brand-red hover:bg-brand-red-hover text-white text-sm font-bold rounded-lg transition-colors shadow-md hover:shadow-lg"
                  >
                    Return to Shop
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor || idx}`}
                    className="flex gap-4 border-b border-gray-100 pb-5 last:border-0 last:pb-0"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 bg-gray-50 rounded-lg p-2 border border-gray-100 flex items-center justify-center flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="max-w-full max-h-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-brand-navy leading-snug line-clamp-1">
                          {item.product.name}
                        </h4>
                        {item.selectedColor && (
                          <p className="text-xs text-text-light mt-0.5">
                            Color: <span className="font-semibold text-text-muted capitalize">{item.selectedColor}</span>
                          </p>
                        )}
                        <p className="text-sm font-bold text-brand-red mt-1">
                          Rs. {item.product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </p>
                      </div>

                      {/* Quantity selector & Delete */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-gray-50 h-8">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)
                            }
                            className="px-2.5 h-full text-gray-500 hover:bg-gray-100 hover:text-black font-bold"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-bold text-xs text-brand-navy">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)
                            }
                            className="px-2.5 h-full text-gray-500 hover:bg-gray-100 hover:text-black font-bold"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                          className="p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-brand-red transition-all"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                {/* Special Instructions Toggle */}
                <div className="border-b border-gray-200/60 pb-3 mb-3">
                  <button
                    onClick={() => setNotesOpen(!notesOpen)}
                    className="flex justify-between items-center w-full text-xs font-bold text-brand-navy uppercase tracking-wider hover:text-brand-red transition-colors"
                  >
                    <span>Special order instructions</span>
                    {notesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {notesOpen && (
                    <textarea
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="Add special requests, delivery notes, or styling requirements..."
                      className="w-full bg-white border border-gray-200 rounded-lg p-3 text-xs text-text-dark mt-2 focus:outline-none focus:border-brand-red/50 min-h-[60px]"
                    />
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start gap-2 mb-4">
                  <input
                    type="checkbox"
                    id="terms-checkbox"
                    checked={termsChecked}
                    onChange={(e) => {
                      setTermsChecked(e.target.checked);
                      if (e.target.checked) setShowTermsWarning(false);
                    }}
                    className="mt-1 h-3.5 w-3.5 rounded border-gray-300 text-brand-red focus:ring-brand-red"
                  />
                  <label
                    htmlFor="terms-checkbox"
                    className="text-xs text-text-muted select-none leading-relaxed cursor-pointer"
                  >
                    I agree with the terms and conditions.
                  </label>
                </div>
                {showTermsWarning && (
                  <p className="text-[10px] font-bold text-brand-red mb-3">
                    Please agree to our terms and conditions to proceed.
                  </p>
                )}

                {/* Subtotal */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-brand-navy">Subtotal:</span>
                  <span className="text-xl font-black text-brand-red font-display">
                    Rs. {cartTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <p className="text-[10px] text-text-light text-center mb-4 leading-normal">
                  Taxes and shipping calculated at checkout. Free shipping on orders over Rs. 5,000.
                </p>

                {/* Checkout & View Cart */}
                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-brand-red hover:bg-brand-red-hover text-white py-3.5 rounded-lg flex items-center justify-center gap-2 font-bold text-sm transition-all hover:shadow-lg"
                  >
                    CHECK OUT <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={toggleCart}
                    className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-brand-navy py-3 rounded-lg text-center font-bold text-sm transition-all"
                  >
                    VIEW CART
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}

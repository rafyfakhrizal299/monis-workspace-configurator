"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CartSummary } from "@/models/types";
import { X, ShoppingBag, Calendar, ShieldCheck, Sparkles } from "lucide-react";

interface CheckoutPanelProps {
  summary: CartSummary;
  isOpen: boolean;
  onClose: () => void;
  onRent: () => void;
}

export default function CheckoutPanel({
  summary,
  isOpen,
  onClose,
  onRent,
}: CheckoutPanelProps) {
  const itemCount = summary.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-[#2d3748]/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-[#eaddcf] px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff7ed] text-[#c86b4a]">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-[#2d3748]">Your Setup</h2>
                    <p className="text-xs text-[#718096]">{itemCount} items selected</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-[#a0aec0] transition-colors hover:bg-[#f5e6d3] hover:text-[#2d3748]"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 px-6 py-5">
                {summary.items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f5e6d3] text-[#a0aec0]">
                      <Sparkles size={28} />
                    </div>
                    <p className="text-[#718096]">Your workspace is empty.</p>
                    <p className="text-sm text-[#a0aec0]">Pick a desk and chair to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {summary.items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center justify-between rounded-xl bg-[#fffaf0] p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="h-10 w-10 rounded-lg"
                            style={{ backgroundColor: item.product.color }}
                          />
                          <div>
                            <p className="text-sm font-bold text-[#2d3748]">{item.product.name}</p>
                            {item.quantity > 1 && (
                              <p className="text-xs text-[#a0aec0]">Qty {item.quantity}</p>
                            )}
                          </div>
                        </div>
                        <span className="text-sm font-bold text-[#2d3748]">
                          ${item.product.pricePerMonth * item.quantity}/mo
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 rounded-2xl bg-[#f5e6d3] p-5">
                  <div className="flex items-center gap-2 text-sm font-medium text-[#744210]">
                    <Calendar size={16} />
                    <span>Flexible monthly rental</span>
                  </div>
                  <p className="mt-2 text-xs text-[#8b6f4e]">
                    Rent for as long as you need. Pause, extend, or return anytime. We deliver
                    and assemble in Bali within 48 hours.
                  </p>
                </div>

                <div className="mt-4 rounded-2xl border border-[#eaddcf] p-5">
                  <div className="flex items-start gap-2 text-sm font-medium text-[#2f855a]">
                    <ShieldCheck size={16} className="mt-0.5" />
                    <span>Deposit-free for nomads</span>
                  </div>
                  <p className="mt-2 text-xs text-[#718096]">
                    Verified digital nomads can skip the ${summary.depositEstimate} deposit. We
                    trust the community.
                  </p>
                </div>
              </div>

              <div className="border-t border-[#eaddcf] bg-[#fffaf0] px-6 py-6">
                <div className="mb-4 flex items-end justify-between">
                  <span className="text-sm font-medium text-[#718096]">Total per month</span>
                  <span className="text-3xl font-black text-[#2d3748]">
                    ${summary.totalPerMonth}
                  </span>
                </div>
                <button
                  onClick={onRent}
                  disabled={summary.items.length === 0}
                  className="group relative w-full overflow-hidden rounded-xl bg-[#c86b4a] px-6 py-4 text-center font-black text-white shadow-lg transition-transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Rent Your Setup
                    <Sparkles size={16} />
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>
                <p className="mt-3 text-center text-xs text-[#a0aec0]">
                  No commitment. Cancel anytime.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

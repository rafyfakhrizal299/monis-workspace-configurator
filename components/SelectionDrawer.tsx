"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Product, AccessorySlot } from "@/models/types";
import { X, Check } from "lucide-react";

interface SelectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  products: Product[];
  selectedId: string | null;
  onSelect: (productId: string) => void;
  onRemove?: () => void;
}

export default function SelectionDrawer({
  isOpen,
  onClose,
  title,
  subtitle,
  products,
  selectedId,
  onSelect,
  onRemove,
}: SelectionDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] overflow-hidden rounded-t-3xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#eaddcf] px-6 py-4">
              <div>
                <h2 className="text-lg font-black text-[#2d3748]">{title}</h2>
                {subtitle && <p className="text-xs text-[#718096]">{subtitle}</p>}
              </div>
              <button
                onClick={onClose}
                className="rounded-full bg-[#f5e6d3] p-2 text-[#718096] transition-colors hover:bg-[#eaddcf] hover:text-[#2d3748]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[calc(80vh-80px)] overflow-y-auto p-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => {
                  const isSelected = selectedId === product.id;
                  return (
                    <motion.button
                      key={product.id}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onSelect(product.id)}
                      className={`
                        relative flex flex-col items-start rounded-2xl border-2 p-4 text-left transition-colors
                        ${
                          isSelected
                            ? "border-[#c86b4a] bg-[#fff7ed]"
                            : "border-[#eaddcf] bg-[#fffaf0] hover:border-[#f6ad55]"
                        }
                      `}
                    >
                      {isSelected && (
                        <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#c86b4a] text-white">
                          <Check size={14} strokeWidth={3} />
                        </span>
                      )}
                      <div
                        className="mb-3 h-24 w-full rounded-xl"
                        style={{
                          background: `linear-gradient(135deg, ${product.color}22 0%, ${product.color}66 100%)`,
                        }}
                      />
                      <h3 className="text-sm font-bold text-[#2d3748]">{product.name}</h3>
                      <p className="mt-1 text-xs text-[#718096] line-clamp-2">
                        {product.description}
                      </p>
                      <div className="mt-3 flex w-full items-center justify-between">
                        <span className="text-sm font-black text-[#c86b4a]">
                          ${product.pricePerMonth}
                        </span>
                        <span className="text-[10px] font-medium uppercase tracking-wide text-[#a0aec0]">
                          /mo
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {selectedId && onRemove && (
                <button
                  onClick={onRemove}
                  className="mt-6 w-full rounded-2xl border border-[#eaddcf] py-3 text-sm font-bold text-[#c86b4a] transition-colors hover:bg-[#fff7ed]"
                >
                  Remove selection
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

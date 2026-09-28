"use client";

import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { Product } from "@/models/types";

interface HotspotProps {
  x: string;
  y: string;
  label: string;
  product?: Product | null;
  disabled?: boolean;
  onClick: () => void;
}

export default function Hotspot({ x, y, label, product, disabled, onClick }: HotspotProps) {
  const isEmpty = !product;

  if (disabled) return null;

  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 outline-none group"
      style={{ left: x, top: y }}
    >
      {isEmpty ? (
        <>
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-white bg-white/30 text-white shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95">
            <Plus size={26} strokeWidth={2.5} />
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-white"
              animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="whitespace-nowrap rounded-full bg-[#2d3748]/70 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-md backdrop-blur-md">
            {label}
          </span>
        </>
      ) : (
        <>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#2f855a] shadow-lg transition-all hover:scale-110 active:scale-95">
            <Check size={16} strokeWidth={3} />
          </div>
          <span className="max-w-[120px] truncate rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#2d3748] opacity-0 shadow-sm backdrop-blur-md transition-opacity group-hover:opacity-100">
            {product.name}
          </span>
        </>
      )}
    </motion.button>
  );
}
